# Sample MultiStep Wizard App

### What Libraies and Frameworks I Used
- Expo - https://docs.expo.dev/
- React Native Paper, UI - https://callstack.github.io/react-native-paper/
- React Hook Form, Form Validation - https://react-hook-form.com/get-started/#ReactNative
- PullState, State Management - https://lostpebble.github.io/pullstate/
- Date Picker - https://github.com/mmazzarolo/react-native-modal-datetime-picker
- Firebase - https://firebase.google.com/


### See the same app written in Ionic Framework
- https://github.com/aaronksaunders/wizard-react-hook-form-pullstate-ionic


### Getting .env files to work
https://github.com/tusbar/babel-plugin-dotenv-import

### Firebase Auth Persistence
npm install @react-native-async-storage/async-storage

```
// add import
import AsyncStorage from "@react-native-async-storage/async-storage";

...

// in code
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
```

### Firebase Emulator Working with Expo On Device

specify host properly in firebase.json
```
{
  "emulators": {
    "auth": {
      "port": 9099,
      "host": "0.0.0.0"
    },
    "firestore": {
      "port": 8080,
      "host": "0.0.0.0"
    },

    "ui": {
      "enabled": true
    },
    "singleProjectMode": true
  },
  "firestore" : {
    "rules" : "firestore.rules"
  }
}
```

get the host from the Expo configuration
```
const origin =
  Constants.manifest.debuggerHost?.split(":").shift() || "localhost";

connectAuthEmulator(auth, `http://${origin}:9099`, {
  disableWarnings: true,
});

export const db = getFirestore(firebaseApp);
connectFirestoreEmulator(db, `${origin}`, 8080);  
```