import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { Button, Checkbox, MD3Colors, ProgressBar, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

export default function Step3Screen({ navigation }) {
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 66;
      });

    console.log("updated state...", WizardStore.getRawState().progress);
  }, [isFocused]);

  const {
    handleSubmit,
    getValues,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: WizardStore.useState((s) => s),
  });

  const onSubmit = (data) => {
    WizardStore.update((s) => {
      s.progress = 100;
      s.termsAccepted = data.termsAccepted;
      s.privacyAccepted = data.privacyAccepted;
    });
    navigation.navigate("Confirmation");
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.useState().progress / 100}
        color={MD3Colors.primary60}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.formEntry}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onBlur, value } }) => (
              <Checkbox.Item
                mode="android"
                label="Accept Terms and Conditions"
                status={
                  getValues("termsAccepted") === "true"
                    ? "checked"
                    : "unchecked"
                }
                onBlur={onBlur}
                onPress={() => {
                  setValue(
                    "termsAccepted",
                    getValues("termsAccepted") === "true" ? "" : "true"
                  );
                  trigger("termsAccepted");
                }}
                value={value}
              />
            )}
            name="termsAccepted"
          />
          {errors.termsAccepted && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              This is a required field.
            </Text>
          )}
        </View>
        <Divider />
        <View style={styles.formEntry}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onBlur, value } }) => (
              <Checkbox.Item
                mode="android"
                label="Accept Privacy Policy"
                status={
                  getValues("privacyAccepted") === "true"
                    ? "checked"
                    : "unchecked"
                }
                onBlur={onBlur}
                onPress={() => {
                  setValue(
                    "privacyAccepted",
                    getValues("privacyAccepted") === "true" ? "" : "true"
                  );
                  trigger("privacyAccepted");
                }}
                value={value}
              />
            )}
            name="privacyAccepted"
          />
          {errors.privacyAccepted && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              This is a required field.
            </Text>
          )}
        </View>
        <Divider />
        <Button
          mode="outlined"
          style={[styles.button, { marginTop: 40 }]}
          onPress={() => navigation.goBack()}
        >
          GO BACK
        </Button>
        <Button
          onPress={handleSubmit(onSubmit)}
          mode="outlined"
          style={styles.button}
        >
          NEXT
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
    // margin: 8,
  },
  container: {
    flex: 1,
  },
  progressBar: {
    marginBottom: 16,
  },
});