import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Accueil = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="police-station"
          size={30}
          color="#115DA9"
        />
        <Text style={styles.heading}>
          CRIMES <Text style={styles.title1}>mobile</Text>
        </Text>
      </View>

      <LinearGradient
        colors={["rgba(0,124,255,0.2)", "rgba(0,124,255,0.2)"]}
        // colors={[COLORS.primaryColor, COLORS.error100]}
        start={{ x: 0, y: 0 }}
        end={{ x: 2.9, y: 1.8 }}
        style={[styles.linear1]}
      ></LinearGradient>
      <LinearGradient
        colors={["rgba(0,124,255,0.2)", "rgba(0,124,255,0.2)"]}
        // colors={[COLORS.primaryColor, COLORS.error100]}
        start={{ x: 0, y: 0 }}
        end={{ x: 2.9, y: 1.8 }}
        style={styles.linear2}
      ></LinearGradient>
    </View>
  );
};
export default Accueil;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  heading: {
    fontSize: 24,
    // flex: 0.2,
    color: "#115DA9",
    fontWeight: "700",
    fontFamily: "Inner-Black",
  },
  linear1: {
    flex: 0.5,
    width: "110%",
    height: 200,
    borderRadius: 150,
    // transform: matrix(-1, 0, 0, 1, 0, 0),
    // transformMatrix: matrix(-1, 0, 0, 1, 0, 0),
  },
  linear2: {
    flex: 0.3,
    width: "110%",
    height: 200,
    borderRadius: 150,
  },
});
