import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import FirstScreen from "./screens/FirstScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChoiceScreen from "./screens/ChoiceScreen";
import IdentifyScreen from "./screens/IdentifyScreen";
import DeclarationScreen from "./screens/DeclarationScreen";
export default function App() {
  const [fontsLoaded] = useFonts({
    "lato-bold": require("./assets/fonts/Lato-Bold.ttf"),
    lato: require("./assets/fonts/Lato-Regular.ttf"),
  });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }
  const Stack = createNativeStackNavigator();
  return (
    // <ImageBackground
    //   source={require("./assets/images/BG2.jpg")}
    //   style={styles.container}
    //   resizeMode="cover"
    // >
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="firstscreen"
        >
          <Stack.Screen name="firstscreen" component={FirstScreen} />
          <Stack.Screen name="choicescreen" component={ChoiceScreen} />
          <Stack.Screen
            name="declarationscreen"
            component={DeclarationScreen}
          />
          <Stack.Screen name="identifyscreen" component={IdentifyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>

    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
