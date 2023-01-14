import { StyleSheet, Text, Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { FontAwesome5 } from "@expo/vector-icons";
import { useGlobalContext } from "../store/authContext";
import { useState } from "react";

const WelcomeBack = ({ navigation }) => {
  const authContext = useGlobalContext();
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const changeTextHandler = (text) => {
    setPassword(text);
  };
  const loginHandler = () => {
    if (!password) {
      setInvalid(true);
      return;
    }
    authContext.authentificate("swamer");
  };
  const fingerAuthHandler = () => {
    // if (!password) {
    //   setInvalid(true);
    //   return;
    // }

    // authContext.authentificate("swamer");
    navigation.navigate("biometric");
  };
  return (
    <View style={StyleSheet.container}>
      <LinearGradient
        colors={["rgba(0,124,255,0.4)", "rgba(0,124,255,0.3)"]}
        // colors={[COLORS.primaryColor, COLORS.error100]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[styles.linear1]}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/policeman.png")}
          />
        </View>
      </LinearGradient>
      <Text style={styles.header}>Welcome Back</Text>
      <Input
        label="Access Code"
        textInputConfig={{
          secureTextEntry: true,
          value: password,
          onChangeText: changeTextHandler,
        }}
        inValid={invalid}
      />
      <View style={styles.btnsContainer}>
        <Button onPress={loginHandler}>LOGIN</Button>
        <Button onPress={fingerAuthHandler}>
          <FontAwesome5 name="fingerprint" size={24} color="white" />
        </Button>
      </View>
    </View>
  );
};
export default WelcomeBack;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // margin: "auto",
  },
  cont: {
    position: "absolute", //Here is the trick
    bottom: 0, //Here is the trick
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: 50,
    position: "absolute",
    bottom: -400,
  },

  header: {
    // fontFamily: "Inner-Black",
    fontWeight: "bold",
    fontSize: 24,
    color: "#115DA9",
    textAlign: "center",
    marginTop: 55,
  },
  linear1: {
    // flex: 0.5,
    position: "relative",
    width: "110%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 150,
  },
  imageContainer: {
    position: "absolute",
    bottom: -75,
    width: 150,
    height: 150,
    // borderRadius: "50%",
    // alignContent: "center",
  },
  image: {
    borderRadius: 75,
    width: "80%",
    height: "80%",
  },
  //   imageIntern: {
  //     borderRadius: 75,
  //   },
});
//<FontAwesome5 name="fingerprint" size={24} color="black" />;
