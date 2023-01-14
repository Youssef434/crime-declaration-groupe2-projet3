import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/styles";
import {
  PermissionStatus,
  useForegroundPermissions,
  getCurrentPositionAsync,
  LocationAccuracy,
} from "expo-location";
import { getAddress, getMapPreview, GOOGLE_API_KEY } from "../util/location";
const LocationPicker = ({ setLocation, inValid }) => {
  const [locationPicked, setLocationPicked] = useState({
    lat: "",
    lng: "",
  });
  const [address, setAddress] = useState("");
  const [locationPermission, requestLocationPermission] =
    useForegroundPermissions();
  const verifyPermissions = async () => {
    if (locationPermission.status !== PermissionStatus.GRANTED) {
      const response = await requestLocationPermission();
      return response.granted;
    }
    if (locationPermission.status !== PermissionStatus.GRANTED) {
      Alert.alert(
        "Insufficient Permissions !",
        "You need to grant location permissions to use this app !"
      );
      return false;
    }
    return true;
  };
  const getAddressFrom = async (lat, lng) => {
    console.log("getAddressFrom");
    const AddressUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(AddressUrl);
    const data = await response.json();
    const addressy = data?.results[0]?.formatted_address;
    console.log(addressy);
    setAddress(addressy);
  };
  const getLocation = async () => {
    console.log("Hello");
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    // console.log(location);
    setLocationPicked({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    getAddressFrom(location.coords.latitude, location.coords.longitude);
    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  let locationPreview = (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={getLocation}
    >
      <View
        style={[
          styles.contentContainer,
          { borderColor: inValid ? COLORS.primaryColor : COLORS.white },
        ]}
      >
        <Text
          style={[
            styles.placeholder,
            { color: inValid ? COLORS.primaryColor : COLORS.white },
          ]}
        >
          Location
        </Text>
        <Ionicons
          name="location"
          color={inValid ? COLORS.primaryColor : COLORS.primarygray}
          size={30}
        />
      </View>
    </Pressable>
  );
  if (locationPicked.lat && locationPicked.lng) {
    locationPreview = (
      <>
        <Image
          source={{
            uri: getMapPreview(locationPicked.lat, locationPicked.lng),
          }}
          style={styles.mapPreview}
        />
        {address && <Text style={styles.address}>{address}</Text>}
      </>
    );
  }
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          { color: inValid ? COLORS.primaryColor : COLORS.white },
        ]}
      >
        Location *
      </Text>
      {locationPreview}
    </View>
  );
};
export default LocationPicker;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 9,
  },
  label: {
    fontSize: 16,
    fontFamily: "lato-bold",
    marginBottom: 8,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.whitebg,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 8,
    // height: 200,
  },
  pressed: {
    opacity: 0.85,
  },
  placeholder: {
    fontSize: 16,
  },
  mapPreview: {
    height: 200,
    width: "100%",
    borderRadius: 6,
  },
  address: {
    color: COLORS.white,
    fontFamily: "lato-bold",
    fontSize: 17,
    textAlign: "center",
  },
  invalidLabel: {
    color: COLORS.primaryColor,
  },
});
