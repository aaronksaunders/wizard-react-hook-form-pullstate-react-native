import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";
import { firebaseSignIn } from "../services/firebase-service";



export default function LoginScreen({ navigation }) {
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = async (data) => {
    // do login here...
    const response  = await firebaseSignIn(data.email, data.password);
    if (response.error) throw response.error;
    console.log(response);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 16, paddingTop : 42 }}>
        <View style={styles.formEntry}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="Username / Email Address"
                placeholder="Enter Username or Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize={false}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              This is a required field.
            </Text>
          )}
        </View>

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
          mode="outlined"
          style={styles.button}
        >
          LOGIN
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
    paddingBottom: 16
  },
  container: {
    flex: 1,
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
});
