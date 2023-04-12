import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert, Image } from "react-native";
import Constants from "expo-constants";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { RHFTextInput } from "./RHFTextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CameraComponent } from "./Camera";

export default function Step1Screen({ navigation }) {
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // headerLeft: () => null,
    });
  }, [navigation]);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    getValues,
    register,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 0;
      });
  }, [isFocused]);

  console.log(getValues());

  const onSubmit = (data) => {
    WizardStore.update((s) => {
      s.progress = 33;
      s.fullName = data.fullName;
      s.birthdate = data.birthdate;
      s.email = data.email;
      s.password = data.password;
    });
    navigation.navigate("Step2");
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.getRawState().progress}
        color={MD3Colors.primary60}
      />
      {!showCamera ? (
        <View style={{ paddingHorizontal: 16 }}>
          <View style={styles.formEntry}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  label="Full Name"
                  placeholder="Enter Full Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="fullName"
            />
            {errors.fullName && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}
          </View>

          {/* <!-- email --> */}
          <RHFTextInput
            control={control}
            errors={errors}
            rules={{
              required: true,
              validate: (value) =>
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                  value
                ) || "Invalid Email Address",
            }}
            inputProps={{
              type: "email",
              label: "Email",
              placeholder: "Email Address",
              name: "email",
              autoCapitalize: false,
            }}
          />

          {/* <!-- password --> */}
          <RHFTextInput
            control={control}
            errors={errors}
            rules={{ required: true }}
            inputProps={{
              textContentType: "password",
              secureTextEntry: true,
              label: "Password",
              placeholder: "Password",
              name: "password",
            }}
          />

          <View style={[styles.formEntry]}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  label="Birthdate"
                  placeholder="Enter Birth Date"
                  onBlur={onBlur}
                  // onChangeText={onChange}
                  value={value}
                  right={
                    <TextInput.Icon
                      icon="calendar"
                      onPress={() => setOpen(true)}
                    />
                  }
                />
              )}
              name="birthdate"
            />
            {errors.birthdate && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}
          </View>

          <DateTimePickerModal
            isVisible={open}
            mode="date"
            onConfirm={(date) => {
              setValue("birthdate", date.toLocaleDateString()),
                { shouldTouch: true };
              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
          />
          {WizardStore.getRawState().photoInfo?.uri && <View style={{ alignItems: "center" }}>
            <Image
              source={{
                width: 200,
                height: 200,
                uri: WizardStore.getRawState().photoInfo?.uri,
              }}
              resizeMethod="scale"
              resizeMode="contain"
            ></Image>
          </View>}
          <Button
            onPress={() => setShowCamera(true)}
            mode="outlined"
            style={styles.button}
          >
          { WizardStore.getRawState().photoInfo?.uri ? "RETAKE PROFILE PHOTO" :  "TAKE PROFILE PHOTO"}
          </Button>

          <Button
            onPress={handleSubmit(onSubmit)}
            mode="outlined"
            style={styles.button}
          >
            GOTO STEP TWO
          </Button>
        </View>
      ) : (
        <>
          {/* CAMERA COMPONENT */}
          <CameraComponent
            show={true}
            hideDialog={() => setShowCamera(false)}
            onComplete={(result) => {
              WizardStore.update((s) => {
                s.photoInfo = result;
              });
              setShowCamera(false);
            }}
          />
        </>
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
    paddingHorizontal: 0,
  },
});
