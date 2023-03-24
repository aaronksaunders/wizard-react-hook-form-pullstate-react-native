import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { firebaseSignOut } from "../services/firebase-service";

export default function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 16, paddingTop: 42 }}>
        <Text>ABOUT SCREEN</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  formEntry: {
    margin: 8,
    paddingBottom: 16,
  },
  container: {
    flex: 1,
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
});
