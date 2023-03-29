import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import { useForm } from "react-hook-form";
import { WizardStore } from "../store";
import { Button, MD3Colors, ProgressBar } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { RHFTextInput } from "./RHFTextInput";

export default function Step2Screen({ navigation }) {
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const isFocused = useIsFocused();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 33;
      });

    console.log("updated state...", WizardStore.getRawState().progress);
  }, [isFocused]);

  const onSubmit = (data) => {
    WizardStore.update((s) => {
      s.progress = 66;
      s.birthPlace = data.birthPlace;
      s.maidenName = data.maidenName;
    });
    navigation.navigate("Step3");
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.useState().progress / 100}
        color={MD3Colors.primary60}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <RHFTextInput
          control={control}
          errors={errors}
          inputProps={{
            label: "Birth Place",
            placeholder: "City and State Where You Were Born",
            name: "birthPlace",
          }}
        />
        <RHFTextInput
          control={control}
          errors={errors}
          inputProps={{
            label: "Maiden Name",
            placeholder: "Enter You Mother's Maiden Name",
            name: "maidenName",
          }}
        />

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

export const styles = StyleSheet.create({
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

