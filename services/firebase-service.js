// firebase imports
import {
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_APP_ID,
} from "@env";
import { getApp, initializeApp } from "firebase/app";
import {
  connectFirestoreEmulator,
  DocumentData,
  getFirestore,
  QueryDocumentSnapshot,
  setLogLevel,
} from "firebase/firestore";
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

const firebaseApp = initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  //   storageBucket: FIREBASE_STORAGE_BUCKET,
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

/**
 *
 * @returns
 */
export const firebaseSignOut = async () => {
  return await signOut(getAuth());
};

/**
 * creates user in database and adds display name
 */
export const firebaseSignUp = async (email, password, displayName) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );

    await updateProfile(resp.user, {
      displayName: displayName,
    });

    return { data: resp.user };
  } catch (error) {
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
