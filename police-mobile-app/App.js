import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accueil from "./screens/Accueil";
import WelcomeBack from "./screens/WelcomeBack";
import BiometricScreen from "./screens/biometricScreen";
import { useFonts } from "expo-font";
import CrimeDescription from "./screens/CrimeDescription";
import Crimes from "./screens/Crimes";
import Map from "./screens/Map";
import AuthContextProvider, { useGlobalContext } from "./store/authContext";
import IconButton from "./components/UI/IconButton";
import { COLORS } from "./constants/styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as LocalAuthentification from "expo-local-authentication";
import { useEffect } from "react";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inner-Black": require("./assets/fonts/Inter-Regular.ttf"),
  });
  async function authentificate() {
    const result = await LocalAuthentification.authenticateAsync({});
    console.log(result);
  }
  useEffect(() => {
    // authentificate();
  }, []);

  const Home = () => {
    const authContext = useGlobalContext();
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.primaryYellow,
          tabBarInactiveTintColor: COLORS.white,
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.primaryYellow,
          },
          tabBarStyle: {
            backgroundColor: COLORS.primaryBlue,
          },
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authContext.logout}
            />
          ),
        }}
      >
        <Tab.Screen
          name="crimes"
          component={Crimes}
          options={{
            tabBarLabel: "Declarations",
            title: "Declarations",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="alert-octagram"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="myPosition"
          component={Map}
          options={{
            title: "Your Position",
            tabBarLabel: "Position",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="welcome"
      >
        <Stack.Screen name="accueil" component={Accueil} />
        <Stack.Screen name="welcome" component={WelcomeBack} />
        <Stack.Screen name="biometric" component={BiometricScreen} />
      </Stack.Navigator>
    );
  };
  const AuthentificatedStack = () => {
    const authContext = useGlobalContext();
    return (
      <Stack.Navigator
        screenOptions={{
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.primaryYellow,
          },
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authContext.logout}
            />
          ),
        }}
        initialRouteName="crimes"
      >
        <Stack.Screen
          name="crime"
          component={CrimeDescription}
          options={{
            title: "Decalaration Details",
          }}
        />
        <Stack.Screen
          name="crimes"
          component={Home}
          options={{
            headerShown: false,
            title: "Declarations",
          }}
        />
        <Stack.Screen
          name="map"
          component={Map}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };
  const Navigation = () => {
    const context = useGlobalContext();
    return (
      <NavigationContainer>
        {context.isAuthentificated ? <AuthentificatedStack /> : <AuthStack />}
      </NavigationContainer>
    );
  };
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
