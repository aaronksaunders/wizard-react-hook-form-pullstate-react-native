import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";

export function RHFTextInput({ control, errors, inputProps, rules }) {
  return (
    <View style={styles.formEntry}>
      <Controller
        control={control}
        rules={ {...rules} }
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            {...inputProps}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={inputProps.name}
      />
      {errors[`${inputProps.name}`] && (
        <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
          {errors[`${inputProps.name}`].message || "This is a required field."} 
        </Text>
      )}
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
