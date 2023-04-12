import { registerInDevtools, Store } from "pullstate";
import { firebaseGetCurrentUserProfile } from "./services/firebase-service";

export const WizardStore = new Store({
  fullName: "",
  birthdate: "",
  birthPlace: "",
  maidenName: "",
  termsAccepted: "",
  privacyAccepted: "",
  email: "",
  password: "",
  progress: 0,
});

export const AuthStore = new Store({
  user: null,
  userProfile: null,
  isLoggedIn : false,
  photoInfo : {}
});

/**
 * list for a user and if there is a user then make a database
 * call to get the user profile information and add it to
 * the store
 */
AuthStore.subscribe(
  (state) => state.user,
  async (watchedUser) => {
    let userProfile = null;
    if (watchedUser) {
      userProfile = await firebaseGetCurrentUserProfile();
    }
    AuthStore.update((s) => {
      s.userProfile = userProfile;
      s.isLoggedIn = userProfile ? true : false
    });
  }
);

registerInDevtools({
  WizardStore,
  AuthStore,
});
