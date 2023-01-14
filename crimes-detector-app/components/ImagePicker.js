import { useState } from "react";
import { COLORS } from "../constants/styles";
import TransButton from "./UI/TransButton";

const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState("");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const verifyPermissions = async () => {
    if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
      const response = await requestCameraPermission();

      return response.granted;
    }
    if (cameraPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions !",
        "You need to grant camera permissions to use this app !"
      );
      return false;
    }
    return true;
  };
  const launchCameraHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image.uri);
    setPickedImage(image.uri);
  };
  return (
    <TransButton
      label="Picture *"
      name="image"
      color={COLORS.primarygray}
      size={30}
      placeholder="Import/Take"
      // style={styles.button}
      onPress={launchCameraHandler}
      buttonStyle={styles.buttonStyle}
    />
  );
};
export default ImagePicker;
const styles = StyleSheet.create({});
