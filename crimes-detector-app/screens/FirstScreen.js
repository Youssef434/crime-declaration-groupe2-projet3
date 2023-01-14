import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button";

const FirstScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/images/BG1.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <Image
        source={require("../assets/images/criminals.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <Button
        onPress={() => {
          navigation.navigate("choicescreen");
        }}
      >
        Get Started
      </Button>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // width: 350,
    paddingHorizontal: 30,
  },
});
export default FirstScreen;
