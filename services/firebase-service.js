// firebase imports
import {
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_APP_ID,
  FIREBASE_STORAGE_BUCKET,
} from "@env";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  connectFirestoreEmulator,
  DocumentData,
  getFirestore,
  QueryDocumentSnapshot,
  setLogLevel,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  ref,
  connectStorageEmulator,
} from "firebase/storage";
import {
  connectAuthEmulator,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged,
  signOut,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
// Import it from your preferred package.
import AsyncStorage from "@react-native-async-storage/async-storage";

import Constants from "expo-constants";

let firebaseApp = initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
});

const origin =
  Constants.manifest.debuggerHost?.split(":").shift() || "localhost";

// Provide it to initializeAuth.
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

connectAuthEmulator(auth, `http://${origin}:9099`, {
  disableWarnings: true,
});

export const db = getFirestore(firebaseApp);
connectFirestoreEmulator(db, `${origin}`, 8080);

connectStorageEmulator(getStorage(),`${origin}`, 9199)

/**
 *
 * @returns
 */
export const firebaseSignOut = async () => {
  return await signOut(getAuth());
};

export const firebaseUploadImage = async (userId, uri) => {
  try {
    const storageRef = ref(getStorage(), `files/${Date.now()}`);
    const fileBlob = await uriToBlob(uri);
    const uploadTask = uploadBytesResumable(storageRef, fileBlob);

    const uploadResp = await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ downloadURL, snapshot: uploadTask.snapshot.metadata });
        }
      );
    });
    return uploadResp;
  } catch (error) {
    return { error };
  }
};

/**
 *
 */
const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      // something went wrong
      reject(new Error("uriToBlob failed"));
    };
    // this helps us get a blob
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);

    xhr.send(null);
  });
};

/**
 *
 * @param {*} userId
 * @param {*} userInformation
 * @returns
 */
export const firebaseSetUserInformation = async (userId, userInformation) => {
  try {
    const { password, progress, ...infoRest } = userInformation;

    const uploadResp = await firebaseUploadImage(userId, userInformation);
    console.log(uploadResp);

    const docRef = doc(db, "user_profile", userId);
    await setDoc(docRef, infoRest);
    const docData = await getDoc(docRef);
    console.log("firebaseSetUserInformation", {
      ...docData.data(),
      id: docData.id,
    });
    return { data: { ...docData.data(), id: docData.id } };
  } catch (error) {
    console.log("error firebaseSetUserInformation ", error);
    return { error };
  }
};

/**
 * creates user in database and adds display name
 */
export const firebaseSignUp = async (
  email,
  password,
  displayName,
  information
) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );

    await updateProfile(resp.user, {
      displayName: displayName,
    });

    // add information to user_profile collection
    const setUserInfoResp = await firebaseSetUserInformation(
      resp.user.uid,
      information
    );
    console.log("setUserInfoResp", setUserInfoResp);
    if (setUserInfoResp?.error) throw Error(setUserInfoResp?.error);

    return { data: setUserInfoResp?.data };
  } catch (error) {
    console.log(error);
    return { error };
  }

  return null;
};
/**
 *
 * signs in the user
 *
 * @param email
 * @param password
 * @returns
 */
export const firebaseSignIn = async (email, password) => {
  try {
    const resp = await signInWithEmailAndPassword(getAuth(), email, password);

    return { data: resp.user };
  } catch (error) {
    return { error };
  }
};

/**
 *
 */
export const firebaseGetCurrentUserProfile = async () => {
  const docRef = doc(db, "user_profile", getAuth().currentUser.uid);
  const docData = await getDoc(docRef);
  return { ...docData?.data(), id: docData.id };
};
