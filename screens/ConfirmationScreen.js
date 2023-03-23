import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WizardStore } from "../store";
import {
  Button,
  MD3Colors,
  ProgressBar,
  Divider,
  Portal,
  Dialog,
} from "react-native-paper";

export default function ConfirmationScreen({ navigation }) {
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const information = WizardStore.useState();

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const clearAndReset = () => {
    WizardStore.replace({
      fullName: "",
      age: "",
      birthPlace: "",
      maidenName: "",
      termsAccepted: "",
      privacyAccepted: "",
      progress: 0,
    });
    setVisible(false);
    navigation.replace("Step1");
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.useState().progress / 100}
        color={MD3Colors.primary60}
      />
      <View style={{ paddingHorizontal: 16 }}>
        {/* <!-- dialog --> */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">This is simple dialog</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={clearAndReset}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <SummaryEntry name={information.fullName} label={"Full Name"} />

        <SummaryEntry name={information.age} label={"Age"} />

        <SummaryEntry name={information.birthPlace} label={"Birth Place"} />

        <SummaryEntry
          name={information.maidenName}
          label={"Mother's Maiden Name"}
        />

        <SummaryEntry
          name={information.termsAccepted}
          label={"Accepted User Terms"}
        />

        <SummaryEntry
          name={information.privacyAccepted}
          label={"Accepted User Privacy Policy"}
        />

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
          onPress={() => setVisible(true)}
        >
          SAVE DATA
        </Button>
      </View>
    </View>
  );
}

export const SummaryEntry = ({ name, label }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 8, fontWeight: "700" }}>{label}</Text>
      <Text style={{ marginBottom: 8 }}>{name}</Text>
      <Divider />
    </View>
  );
};

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
