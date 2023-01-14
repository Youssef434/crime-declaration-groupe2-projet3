import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Input from '../components/UI/Input'
import { COLORS } from '../constants/styles'
import { useState } from 'react'
import Button from '../components/UI/Button'
import TransButton from '../components/UI/TransButton'
import LocationPicker from '../components/LocationPicker'
import exampleImage from '../assets/images/criminals.jpg'
import { Image, Pressable } from 'react-native'
import ActionSheet from "react-native-actions-sheet"
import { SheetManager } from "react-native-actions-sheet/dist/src/sheetmanager";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { ScrollView } from 'react-native'

const DeclarationScreen = ({ route }) => {
  const personData = route?.params?.personData
  const initialState = {
    title: {
      value: '',
      isValid: true,
    },
    description: {
      value: '',
      isValid: true,
    },
    phone: {
      value: personData ? personData.phone : '',
      isValid: true,
    },
    location: {
      value: location,
      isValid: true,
    },
    uriImage: {
      value: "",
      isValid: true,
    },
  }
  const [inputs, setInputs] = useState(initialState)
  const [location, setLocation] = useState({ lat: '', lng: '' })
  const [pickedImage, setPickedImage] = useState("");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const onClickAddImage = () => {
    SheetManager.show("mysheet");
  };

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      }
    })
  }
  const changeLocation = (location) => {
    setLocation(location)
    setInputs((curInputs) => {
      return {
        ...curInputs,
        location: {
          value: curInputs.location.value,
          isValid: true,
        },
      }
    })
  }
  const submitHandler = () => {
    const crimeData = {
      title: inputs.title.value,
      description: inputs.description.value,
      phone: inputs.phone.value,
      location: location,
    }

    const titleIsValid = crimeData.title.trim().length > 0
    const descriptionIsValid = crimeData.description.trim().length > 0
    const locationIsValid = location.lat && location.lng
    const uriImageisValid = true

    if (!titleIsValid || !descriptionIsValid || !locationIsValid || !uriImageisValid) {
      setInputs((curInputs) => {
        return {
          title: {
            value: curInputs.title.value,
            isValid: titleIsValid,
          },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          phone: {
            value: curInputs.phone.value,
            isValid: true,
          },
          location: {
            value: location,
            isValid: locationIsValid,
          },
          uriImage: {
            value: curInputs.uriImage.value,
            isValid: uriImageisValid,
          },
        }
      })
      return
    }
    const all_data = { ...crimeData, ...personData }

    sendData(all_data)

    setInputs(initialState)
  }

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

  const sendData = async (data) => {
    const formData = new FormData()

    formData.append(
      'declarationStr',
      JSON.stringify({
        titre: data.title,
        description: data.description,
        localisation: {
          altitude: 0,
          longitude: data.location.lng,
          latitude: data.location.lat,
        },
        declarant:
          personData === undefined
            ? null
            : {
                cin: data.cin,
                nom: data.firstname,
                prenom: data.lastname,
                dateNaissance: null,
                email: "abcd1234@gmail.com",
                telephone: +data.phone,
                adresse: null,
              },
      })
    )

    formData.append(
      'modeDeclaration',
      personData === undefined ? 'ANONYME' : 'IDENTITE'
    )

    const splitImg = pickedImage.split('/')

    formData.append('files', {
      uri: pickedImage,
      name: splitImg[splitImg.length - 1],
      type: 'image/jpeg',
    })

    console.log(formData);

    const res = await fetch('http://localhost:8080/submit-declaration', {
      method: 'POST',
      headers: {
        'Content-Type': 'mutipart/form-data',
      },
      body: formData,
    })

    console.log(res.status)
  }

  const launchGalleryHandler = async () => {
    // console.log("Test")

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

    SheetManager.hide("mysheet");
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
      source={require('../assets/images/BG1.jpg')}
      resizeMode="cover"
      style={styles.root}>
          <ScrollView>
      <View style={styles.headingContainer}>
        <Ionicons
          name="eye-off-outline"
          color={COLORS.primaryColor}
          size={40}
        />
        <Text style={styles.heading}>
          {personData ? 'Identity' : 'Anonymous'} Mode
        </Text>
      </View>
      <Input
        label="Title *"
        inValid={!inputs.title.isValid}
        textInputConfig={{
          placeholder: 'Title',

          value: inputs.title.value,
          onChangeText: inputChangeHandler.bind(this, 'title'),
        }}
      />
      <Input
        label="Crime Description *"
        inValid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          placeholder: 'Description ...',
          value: inputs.description.value,
          onChangeText: inputChangeHandler.bind(this, 'description'),
        }}
      />
      <Input
        label="Phone Number"
        inValid={!inputs.phone.isValid}
        textInputConfig={{
          placeholder: 'Phone Number',
          value: inputs.phone.value,
          onChangeText: inputChangeHandler.bind(this, 'phone'),
        }}
      />
      <LocationPicker
        inValid={!inputs.location.isValid}
        setLocation={changeLocation}
      />
      {/* <TransButton
        style={styles.button}
        label="Attachements"
        placeholder="Import"
        name="download-outline"
        color={COLORS.primarygray}
        size={30}
      /> */}
      {/* <TransButton
        style={styles.button}
        label="Location *"
        placeholder="Location"
        name="location"
        color={COLORS.primarygray}
        size={30}
        // otherbg={true}
      /> */}
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
      <Button style={styles.button} onPress={submitHandler}>
        Submit
      </Button>
      </ScrollView>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headingContainer: {
    marginTop: 80,
    marginBottom: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    textAlign: 'center',
    fontFamily: 'lato-bold',
    fontSize: 29,
    color: '#fff',
    letterSpacing: 1.5,
    marginLeft: 10,
  },
  button: {
    marginHorizontal: 16,
    marginVertical: 9,
  },
  


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
})
export default DeclarationScreen
