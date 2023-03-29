import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { Button, TextInput, Portal, Dialog, Divider } from "react-native-paper";
import { firebaseSignIn } from "../services/firebase-service";
import { RHFTextInput } from "../screens/RHFTextInput";

export default function LoginScreen({ navigation }) {
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const [alertInfo, setAlertInfo] = React.useState({ visible: false });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = async (data) => {
    // do login here...
    try {
      const response = await firebaseSignIn(data.email, data.password);
      if (response.error) throw response.error;
      console.log(response);
      navigation.navigate("Home");
    } catch (error) {
      // console.error(error);
      setAlertInfo({
        visible: true,
        title: "Error Signing In",
        message: error?.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* <!-- alert dialog --> */}
      <Portal>
        <Dialog visible={alertInfo.visible}>
          <Dialog.Title style={{ marginBottom: 8 }}>
            {alertInfo?.title}
          </Dialog.Title>
          <Divider />
          <Dialog.Content style={{ marginTop: 16 }}>
            <Text variant="bodyMedium">{alertInfo?.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            {/* <Button onPress={hideDialog}>Cancel</Button> */}
            <Button
              mode="contained"
              size="small"
              style={{width:70}}
              onPress={() => setAlertInfo({ visible: false })}
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* // main contents  */}
      <View style={{ paddingHorizontal: 16, paddingTop: 42 }}>
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

        <View style={[styles.formEntry]}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="Password"
                placeholder="Enter Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                textContentType="password"
                secureTextEntry={true}
                autoCapitalize={false}
                autoCorrect={false}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              This is a required field.
            </Text>
          )}
        </View>

        <Button
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          style={styles.button}
        >
          LOGIN
        </Button>
        <Button
          onPress={() => navigation.navigate("CreateAccount")}
          mode="outlined"
          style={styles.button}
        >
          CREATE ACCOUNT
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
