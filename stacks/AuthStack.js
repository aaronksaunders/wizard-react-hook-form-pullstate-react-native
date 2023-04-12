import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import Step1Screen from "../screens/Step1Screen";
import Step2Screen from "../screens/Step2Screen";
import Step3Screen from "../screens/Step3Screen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import { useTheme } from "react-native-paper";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleStyle: {
          color: useTheme().colors.primary,
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="CreateAccount"
        component={Step1Screen}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen name="Step2" component={Step2Screen} />
      <Stack.Screen name="Step3" component={Step3Screen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
