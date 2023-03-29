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
import {
  firebaseSetUserInformation,
  firebaseSignUp,
} from "../services/firebase-service";

export default function ConfirmationScreen({ navigation }) {
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const information = WizardStore.useState();

  const [alertInfo, setAlertInfo] = React.useState({ visible: false });

  const hideDialog = () => setAlertInfo({ visible: false });

  const clearAndReset = () => {
    WizardStore.replace({
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
    // setAlertInfo({ visible: false });
    // navigation.replace("Step1");
  };

  const doCreateAccount = async () => {
    try {
      const signUpResp = await firebaseSignUp(
        information.email,
        information.password,
        information.fullName,
        information
      );
      if (signUpResp.error) throw Error(signUpResp.error);
      clearAndReset();

      setAlertInfo({
        visible: true,
        header: "Success",
        message: "Account Created",
      });
    } catch (error) {
      console.error("doCreateAccount", error);
      setAlertInfo({ visible: true, header: "Error", message: error?.message });
    }
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
          <Dialog visible={alertInfo.visible}>
            <Dialog.Title>{alertInfo?.title}</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{alertInfo?.message}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              {/* <Button onPress={hideDialog}>Cancel</Button> */}
              <Button onPress={() => clearAndReset()}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <SummaryEntry name={information.fullName} label={"Full Name"} />

        <SummaryEntry name={information.email} label={"Email"} />

        <SummaryEntry name={information.birthdate} label={"Birthdate"} />

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
          onPress={() => doCreateAccount()}
        >
          CREATE ACCOUNT
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
