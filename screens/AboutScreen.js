import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { firebaseSignOut } from "../services/firebase-service";
import { AuthStore } from "../store";
import { SummaryEntry } from "./SummaryEntry";

export default function AboutScreen({ navigation }) {
  const { user, userProfile } = AuthStore.useState((s) => s);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>

          <SummaryEntry name={userProfile.fullName} label={"Full Name"} />
          <SummaryEntry name={user.displayName} label={"Display Name"} />

          <SummaryEntry name={userProfile.email} label={"Email"} />

          <SummaryEntry name={userProfile.birthdate} label={"Birthdate"} />

          <SummaryEntry name={userProfile.birthPlace} label={"Birth Place"} />

          <SummaryEntry
            name={userProfile.maidenName}
            label={"Mother's Maiden Name"}
          />

          <SummaryEntry
            name={userProfile.termsAccepted}
            label={"Accepted User Terms"}
          />

          <SummaryEntry
            name={userProfile.privacyAccepted}
            label={"Accepted User Privacy Policy"}
          />

          {/* <Text>{JSON.stringify(user, null, 2)}</Text> */}
          {/* <Text>{JSON.stringify(userProfile, null, 2)}</Text> */}
        </View>
      </ScrollView>
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
