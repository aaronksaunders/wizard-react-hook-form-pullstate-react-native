import * as React from "react";
import { Appearance, StyleSheet } from "react-native";
import Constants from "expo-constants";

// You can import from local files

// or any pure javascript modules available in npm
import {
  ProgressBar,
  MD3Colors,
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Step1Screen from "./screens/Step1Screen";
import Step2Screen from "./screens/Step2Screen";
import Step3Screen from "./screens/Step3Screen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth/react-native";
import PrivateStack from "./stacks/PrivateStack";
import AboutScreen from "./screens/AboutScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import AuthStack from "./stacks/AuthStack";
import { AuthStore } from "./store";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = React.useState(null);

  const colorScheme = Appearance.getColorScheme();
  console.log(colorScheme);
  if (colorScheme === "dark") {
    // Use dark color scheme
  }

  React.useEffect(() => {
    onAuthStateChanged(getAuth(), (currentUser) => {
      setUser(currentUser);

      AuthStore.update((s) => {
        s.user = getAuth().currentUser;
      });
    });
  }, []);

  AuthStore.update((s) => {
    s.appTheme =
      colorScheme === "dark"
        ? {
            ...MD3DarkTheme,
            dark: true,
          }
        : DefaultTheme;
  });

  return (
    <PaperProvider theme={AuthStore.getRawState().appTheme}>
      <NavigationContainer theme={AuthStore.getRawState().appTheme}>
        <Stack.Navigator>
          {!user ? (
            <Stack.Screen
              name="Auth"
              component={AuthStack}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="About" component={AboutScreen} />
              <Stack.Screen name="Step1" component={Step1Screen} />
              <Stack.Screen name="Step2" component={Step2Screen} />
              <Stack.Screen name="Step3" component={Step3Screen} />
              <Stack.Screen
                name="Confirmation"
                component={ConfirmationScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    // backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
