import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

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

        <View>
          <Text>
            {JSON.stringify(
              WizardStore.useState((s) => s),
              null,
              2
            )}
          </Text>
        </View>
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
function RHFTextInput({ control, errors, inputProps }) {
  return (
    <View style={styles.formEntry}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label={inputProps.label}
            placeholder={inputProps.placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={inputProps.name}
      />
      {errors[`${inputProps.name}`] && (
        <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
          This is a required field.
        </Text>
      )}
    </View>
  );
}
