import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button";

const ChoiceScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/images/BG1.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.contentContainer}>
        <Image
          source={require("../assets/images/criminals.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.heading}>Mode</Text>
        <Text style={styles.question}>Wich mode you want to declare?</Text>
        <View style={styles.btnContainer}>
          <Button
            style={styles.button}
            onPress={() => {
              console.log("hello");
              navigation.navigate("identifyscreen");
              console.log("hi");
            }}
          >
            Identity
          </Button>
          <Button onPress={() => navigation.navigate("declarationscreen")}>
            Anonymous
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contentContainer: {
    marginTop: 40,
  },
  heading: {
    textAlign: "center",
    fontFamily: "lato-bold",
    fontSize: 36,
    color: "#fff",
    marginTop: -150,
  },
  question: {
    fontFamily: "lato-bold",
    fontSize: 22,
    textAlign: "center",
    color: "#fff",
    marginTop: 70,
  },
  btnContainer: {
    display: "flex",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 42,
  },
});
export default ChoiceScreen;
