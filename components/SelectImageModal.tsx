import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SelectImageModalProps = {
  closeModal: VoidFunction;
  setImage: (image: string) => void;
};

export default function SelectImageModal({
  closeModal,
  setImage,
}: SelectImageModalProps) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Vi trenger tillatelse til å bruke kameraet</Text>
        <Button onPress={requestPermission} title="Gi tillatelse" />
      </View>
    );
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); //Hent ut uri til bildet og send det videre ut til PostFormModal
      closeModal();
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => closeModal()}>
          <Text style={styles.text}>Avbryt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => pickImage()}>
          <Text style={styles.text}>Velg...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 64,
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    //color: "white",
  },
});
