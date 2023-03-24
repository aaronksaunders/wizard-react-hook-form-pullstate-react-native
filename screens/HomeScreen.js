import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { firebaseSignOut } from "../services/firebase-service";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 16, paddingTop: 42 }}>
        <Text>HOME SCREEN</Text>
        <Button
          onPress={async () => await firebaseSignOut()}
          mode="outlined"
          style={styles.button}
        >
          SIGN OUT
        </Button>
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
