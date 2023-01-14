import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import {
  PermissionStatus,
  useForegroundPermissions,
  getCurrentPositionAsync,
  LocationAccuracy,
} from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "../utils/location";
import { COLORS } from "../constants/styles";
const Map = ({ route }) => {
  const latitude = route.params ? route.params.latitude : "";
  const longitude = route.params ? route.params.longitude : "";
  const [locationPermission, requestLocationPermission] =
    useForegroundPermissions();
  const [mylocation, setMyLocation] = useState({ lat: "", lng: "" });
  const region = {
    latitude: mylocation?.lat ? mylocation.lat : 33.9982097,
    longitude: mylocation?.lng ? mylocation.lng : -6.8556612,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const verifyPermissions = async () => {
    if (locationPermission?.status !== PermissionStatus.GRANTED) {
      const response = await requestLocationPermission();
      return response.granted;
    }
    // if (locationPermission.status !== PermissionStatus.GRANTED) {
    //   Alert.alert(
    //     "Insufficient Permissions !",
    //     "You need to grant location permissions to use this app !"
    //   );
    //   return false;
    // }
    return true;
  };
  const getLocation = useCallback(async () => {
    console.log("Hello");
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setMyLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });

    // console.log(location);
  }, []);

  useLayoutEffect(() => {
    // verifyPermissions();
    getLocation();
  }, [getLocation]);

  return (
    <MapView initialRegion={region} style={styles.map}>
      {latitude && longitude && (
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          icon={require("../assets/images/criminal.png")}
          title="Crime Position"
        ></Marker>
      )}
      {mylocation?.lat && mylocation?.lng && (
        <Marker
          coordinate={{
            latitude: mylocation?.lat,
            longitude: mylocation?.lng,
          }}
          icon={require("../assets/images/policeman.png")}
          title="Your Position"
        />
      )}
      {latitude && longitude && mylocation?.lat && mylocation?.lng && (
        <MapViewDirections
          origin={{
            latitude: mylocation.lat,
            longitude: mylocation.lng,
          }}
          destination={{
            latitude: latitude,
            longitude: longitude,
          }}
          strokenWidth={14}
          strokeColor={COLORS.primaryColor}
          apikey={GOOGLE_API_KEY}
        />
      )}
      {latitude && longitude && mylocation?.lat && mylocation?.lng && (
        <Polyline
          coordinates={[
            {
              latitude: mylocation.lat,
              longitude: mylocation.lng,
            },
            {
              latitude: latitude,
              longitude: longitude,
            },
          ]}
          strokeColors={[COLORS.primaryColor]}
          strokeWidth={3}
        />
      )}
    </MapView>
  );
};
export default Map;
const styles = StyleSheet.create({
  map: {
    flex: 1,
    // marginTop: 30,
  },
});
