import { Alert, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/styles";
import { FontAwesome5 } from "@expo/vector-icons";
import Button from "../components/UI/Button";
import * as LocalAuthentification from "expo-local-authentication";
import { useGlobalContext } from "../store/authContext";
import { useState } from "react";
const BiometricScreen = ({ navigation }) => {
  const authContext = useGlobalContext();
  const pressHandler = () => {
    console.log("maybe pressed");
    navigation.navigate("welcome");
  };
  async function authentificate() {
    const result = await LocalAuthentification.authenticateAsync({});
    return result;
  }
  const loginHandler = async () => {
    try {
      const response = await authentificate();
      if (response.success) {
        authContext.authentificate("swamer");
      } else {
        Alert.alert(
          "Authentification Failed!",
          "Could Not Authentificate Using FingerPrint ... "
        );
        navigation.navigate("welcome");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.insideContainer}>
        <Text style={styles.heading}>Biometric</Text>
        <View style={styles.imageContainer}>
          <FontAwesome5
            name="fingerprint"
            size={65}
            color="white"
            style={styles.icon}
          />
        </View>
        <Text style={styles.text1}>
          Using biometric on your authentification ?
        </Text>
        <Button bgColor={COLORS.secondaryBlue} onPress={loginHandler}>
          Login
        </Button>
        <Text onPress={pressHandler} style={styles.text2}>
          Maybe next time
        </Text>
      </View>
    </View>
  );
};

export default BiometricScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  insideContainer: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontFamily: "Inner-Black",
    color: COLORS.white,
    fontWeight: "700",
    letterSpacing: 2,
    fontSize: 33,
  },
  imageContainer: {
    marginVertical: 30,
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    textAlign: "center",
  },
  text1: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 15,
    fontFamily: "Inner-Black",
    width: 200,
    color: "#CCE5FF",
    marginVertical: 30,
  },
  text2: {
    textAlign: "center",
    color: COLORS.blueLight,
    fontSize: 16,
    fontFamily: "Inner-Black",
    fontWeight: "600",
    width: 200,
    color: "#CCE5FF",
    marginVertical: 30,
    letterSpacing: 1.6,
  },
});
