import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import TransButton from "../components/UI/TransButton";
import { COLORS } from "../constants/styles";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import ActionSheet from "react-native-actions-sheet";
import { SheetManager } from "react-native-actions-sheet/dist/src/sheetmanager";
import { Colors } from "react-native/Libraries/NewAppScreen";
const initialState = {
  firstname: {
    value: "",
    isValid: true,
  },
  lastname: {
    value: "",
    isValid: true,
  },
  cin: {
    value: "",
    isValid: true,
  },
  phone: {
    value: "",
    isValid: true,
  },
  uriImage: {
    value: "",
    isValid: true,
  },
};

const IdentifyScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState(initialState);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState("");
  const inputChangeHandler = (identity, enteredValue) => {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [identity]: {
          value: enteredValue,
          isValid: true,
        },
      };
    });
  };

  const nextHandler = () => {
    const personData = {
      firstname: inputs.firstname.value,
      lastname: inputs.lastname.value,
      cin: inputs.cin.value,
      phone: inputs.phone.value,
      uriImage: inputs.uriImage.value,
    };

    const firstnameIsValid = personData.firstname.trim().length > 0;
    const lastnameIsValid = personData.lastname.trim().length > 0;
    const cinIsValid = personData.cin.trim().length > 0;
    const phoneIsValid = personData.phone.trim().length > 0;
    const uriImageisValid = true
    if (
      !firstnameIsValid ||
      !lastnameIsValid ||
      !cinIsValid ||
      !phoneIsValid ||
      !uriImageisValid
    ) {
      setInputs((curInputs) => {
        return {
          firstname: {
            value: curInputs.firstname.value,
            isValid: firstnameIsValid,
          },
          lastname: {
            value: curInputs.lastname.value,
            isValid: lastnameIsValid,
          },
          cin: {
            value: curInputs.cin.value,
            isValid: cinIsValid,
          },
          phone: {
            value: curInputs.phone.value,
            isValid: phoneIsValid,
          },
          uriImage: {
            value: curInputs.uriImage.value,
            isValid: uriImageisValid,
          },
        };
      });
      return;
    }
    console.log(personData);
    setInputs(initialState);
    navigation.navigate("declarationscreen", {
      personData: personData,
    });
  };

  const onClickAddImage = () => {
    SheetManager.show("mysheet");
  };

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

  const launchGalleryHandler = async () => {
    SheetManager.hide("mysheet");
    let result = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
      setInputs((curInputs) => {
        return {
          ...curInputs,
          uriImage: {
            value: result.assets[0].uri,
            isValid: true,
          },
        };
      });
    }
  };

  const launchCameraHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    SheetManager.hide("mysheet");
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    console.log(image.uri);
    setPickedImage(image.uri);
    setInputs((curInputs) => {
      return {
        ...curInputs,
        uriImage: {
          value: image.uri,
          isValid: true,
        },
      };
    });
  };

  return (
    <ImageBackground
      source={require("../assets/images/BG1.jpg")}
      resizeMode="cover"
      style={styles.root}
    >
      <View style={styles.headingContainer}>
        <Ionicons name="person" color={COLORS.primaryColor} size={40} />
        <Text style={styles.heading}>Identity Mode</Text>
      </View>
      <Input
        label="First Name *"
        inValid={!inputs.firstname.isValid}
        textInputConfig={{
          placeholder: "First Name",
          placeholderTextColor: COLORS.primarygray,
          value: inputs.firstname.value,
          onChangeText: inputChangeHandler.bind(this, "firstname"),
        }}
      />
      <Input
        label="Last Name *"
        inValid={!inputs.lastname.isValid}
        textInputConfig={{
          placeholder: "Last Name",
          placeholderTextColor: COLORS.primarygray,
          value: inputs.lastname.value,
          onChangeText: inputChangeHandler.bind(this, "lastname"),
        }}
      />
      <Input
        label="C.I.N *"
        inValid={!inputs.cin.isValid}
        textInputConfig={{
          placeholder: "CIN",
          placeholderTextColor: COLORS.primarygray,
          value: inputs.cin.value,
          onChangeText: inputChangeHandler.bind(this, "cin"),
        }}
      />
      <Input
        label="Phone Number *"
        inValid={!inputs.phone.isValid}
        textInputConfig={{
          placeholder: "Phone Number",
          placeholderTextColor: COLORS.primarygray,
          value: inputs.phone.value,
          onChangeText: inputChangeHandler.bind(this, "phone"),
        }}
      />
      {pickedImage ? (
        <>
          <Text style={styles.label}>Picture *</Text>
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={onClickAddImage}
          >
            <Image source={{ uri: pickedImage }} style={styles.image} />
          </Pressable>
        </>
      ) : (
        <TransButton
          label="Picture *"
          name="image"
          color={COLORS.primarygray}
          size={30}
          placeholder="Import/Take"
          inValid={!inputs.uriImage.isValid}
          // style={styles.button}
          onPress={onClickAddImage}
          buttonStyle={styles.buttonStyle}
        />
      )}
      <ActionSheet id="mysheet">
        <Text style={styles.title}>Select Photo</Text>
        <View style={styles.buttonSheetContainer}>
          <Button style={styles.buttonSheetStyle} onPress={launchCameraHandler}>
            Take Picture
          </Button>
          <Button
            style={styles.buttonSheetStyle}
            onPress={launchGalleryHandler}
          >
            Choose from Gallery
          </Button>
        </View>
      </ActionSheet>
      <Button onPress={nextHandler} style={styles.button}>
        Next
      </Button>
    </ImageBackground>
  );
};
export default IdentifyScreen;
const styles = StyleSheet.create({
  title: {
    fontFamily: "lato-bold",
    fontSize: 22,
    textAlign: "center",
    marginVertical: 12,
    // color: COLORS.primaryColor,
  },
  buttonSheetStyle: {
    marginVertical: 8,
    marginHorizontal: 20,
    width: 200,
  },
  buttonSheetContainer: {
    // textAlign: "center",
    alignItems: "center",
  },
  root: {
    flex: 1,
  },
  headingContainer: {
    marginTop: 50,
    marginBottom: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "lato-bold",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  heading: {
    textAlign: "center",
    fontFamily: "lato-bold",
    fontSize: 29,
    color: "#fff",
    letterSpacing: 1.5,
    marginLeft: 10,
  },
  button: {
    marginHorizontal: 16,
    marginVertical: 9,
  },
  buttonStyle: {
    height: 200,
  },
  image: {
    height: 200,
    marginHorizontal: 16,
    marginVertical: 9,
    borderRadius: 6,
  },
  pressed: {
    opacity: 0.95,
  },
});
