import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import { useTheme } from "react-native-paper";

const Stack = createStackNavigator();

const PrivateStack = () => {
  return (
    <Stack.Navigator 
    screenOptions={{
      headerTitleStyle: {
        color: useTheme().colors.primary,
      },
    }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default PrivateStack;
