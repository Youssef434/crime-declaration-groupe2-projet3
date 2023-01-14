import { View, Pressable, StyleSheet, Text } from "react-native";
import { COLORS } from "../../constants/styles";

const Button = ({ children, onPress, style, bgColor }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            styles.button,
            { backgroundColor: bgColor ? bgColor : COLORS.primaryBlue },
          ]}
        >
          <Text style={styles.text}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // borderRadius: 6,
    flex: 1,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingVertical: 12,
    backgroundColor: COLORS.primaryBlue,
  },
  text: {
    // fontFamily: "lato",
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Inner-Black",
  },
  pressed: {
    opacity: 0.85,
    borderRadius: 6,
  },
});
export default Button;
