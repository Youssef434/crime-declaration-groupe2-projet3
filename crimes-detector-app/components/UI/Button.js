import { View, Pressable, StyleSheet, Text } from "react-native";
import { COLORS } from "../../constants/styles";

const Button = ({ children, onPress, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.button}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // borderRadius: 6,
  },
  button: {
    borderRadius: 6,
    paddingHorizontal: 28,
    paddingVertical: 10,
    backgroundColor: COLORS.primaryColor,
  },
  text: {
    fontFamily: "lato",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.85,
    borderRadius: 6,
  },
});
export default Button;
