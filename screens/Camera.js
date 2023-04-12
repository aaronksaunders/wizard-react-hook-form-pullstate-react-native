import { Camera, CameraType, takePictureAsync } from "expo-camera";
import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dialog, Divider, Portal, Button } from "react-native-paper";

export const CameraComponent = ({ show, hideDialog, onComplete }) => {
  if (!show) return null;

  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (!permission) {
    // Camera permissions are still loading
    console.log("no permission");
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        {/* <!-- alert dialog --> */}
        <Portal>
          <Dialog visible={!permission.granted && show}>
            <Dialog.Title style={{ marginBottom: 8 }}>
              Permission Request
            </Dialog.Title>
            <Divider />
            <Dialog.Content style={{ marginTop: 16 }}>
              <Text variant="bodyMedium">
                We Need Your Permission To Access Camera
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                mode="contained"
                size="small"
                style={{ width: 70 }}
                onPress={hideDialog}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                size="small"
                style={{ width: 70 }}
                onPress={requestPermission}
              >
                Ok
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  } else {
    console.log("permission granted ", permission);
  }

  /**
   *
   */
  async function doTakePicture() {
    try {
      const result = await cameraRef.current.takePictureAsync();
      console.log(result);
      onComplete(result)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}></Camera>
      <View style={styles.buttonContainer}>
        <Button onPress={() => doTakePicture()} mode="outlined">
          Take Picture
        </Button>

        <Button onPress={toggleCameraType} mode="outlined">
          Flip Camera
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    margin: 0,
    paddingBottom: 16,
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "green",
    height: "100%",
    width: "100%",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    margin: 16,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
