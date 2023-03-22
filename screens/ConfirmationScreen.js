import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WizardStore } from "../store";
import { Button, MD3Colors, ProgressBar } from "react-native-paper";

export default function ConfirmationScreen({ navigation }) {
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.useState().progress / 100}
        color={MD3Colors.primary60}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <View>
          <Text>
            {JSON.stringify(
              WizardStore.useState((s) => s),
              null,
              2
            )}
          </Text>
        </View>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => navigation.navigate("Step3")}
        >
          GO BACK
        </Button>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => navigation.navigate("")}
        >
          SAVE DATA
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
  },
  container: {
    flex: 1,
  },
  progressBar: {
    marginBottom: 16,
  },
});
