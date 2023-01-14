import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS } from "../constants/styles";
import { getAddress, getMapPreview } from "../utils/location";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";

const CrimeDescription = ({ navigation }) => {
  const route = useRoute()
  const [item, setItem] = useState(route.params['item'])

  const pressLocationHandler = () => {
    navigation.navigate("map", {
      latitude: item.latitude,
      longitude: item.longitude,
    });
  };
  return (
    <>
      <StatusBar style="dark" />
      <ScrollView style={styles.Scrollcontainer} horizontal={false}>
        <View styles={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.address}>{item.address}</Text>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.heading}>Location</Text>
            <Pressable
              style={styles.locationImage}
              onPress={pressLocationHandler}
            >
              <Image
                style={styles.locationImage1}
                source={{ uri: getMapPreview(item.latitude, item.longitude) }}
              />
            </Pressable>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.heading}>Description</Text>
            <Text style={styles.description}>{item.decription}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default CrimeDescription;
const styles = StyleSheet.create({
  Scrollcontainer: {
    flex: 1,
    marginVertical: 20,
  },
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: 400,
    borderRadius: 20,
  },

  infoContainer: {
    position: "absolute",
    bottom: 28,
    left: 28,
  },
  title: {
    fontFamily: "Inner-Black",
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
    letterSpacing: 1.1,

    // backgroundColor: "red",
    // marginVertical: 20,
  },
  address: {
    fontFamily: "Inner-Black",
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
    letterSpacing: 1.05,
  },
  locationContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  heading: {
    fontFamily: "Inner-Black",
    fontSize: 17,
    // marginHorizontal: 14,
    fontWeight: "bold",
    color: COLORS.primaryBlue,
  },
  locationImage: {
    marginVertical: 8,
    width: "90%",
    // borderWidth: 1,
    // borderColor: COLORS.primaryBlue,
    height: 200,
    borderRadius: 30,
  },
  locationImage1: {
    width: "100%",
    height: 200,
    borderRadius: 30,
  },
  description: {
    fontFamily: "Inner-Black",
    fontSize: 15,
    marginHorizontal: 14,
    marginVertical: 8,
    textAlign: "center",
    fontWeight: "600",
    width: "90%",
  },
});
