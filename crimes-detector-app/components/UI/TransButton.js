import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/styles";
const TransButton = ({
  label,
  name,
  color,
  size,
  placeholder,
  // style,
  otherbg,
  onPress,
  buttonStyle,
  inValid,
}) => {
  const container = [styles.container, buttonStyle];

  let imagePreview = (
    <>
      <Text style={[styles.placeholder, inValid && styles.inValidLabel]}>
        {placeholder}
      </Text>
      <Ionicons
        name={name}
        color={inValid ? COLORS.primaryColor : color}
        size={size}
      />
    </>
  );

  if (otherbg) {
    container.push({
      backgroundColor: COLORS.whitebg1,
    });
  }
  return (
    <View style={styles.root}>
      <Text style={[styles.label, inValid && styles.inValidLabel]}>
        {label}
      </Text>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          ...container,
          pressed && styles.pressed,
          inValid && styles.invalidContainer,
        ]}
      >
        {imagePreview}
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    marginHorizontal: 16,
    marginVertical: 9,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "lato-bold",
    marginBottom: 8,
  },
  placeholder: {
    color: COLORS.primarygray,
    fontFamily: "lato",
    fontSize: 16,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.whitebg,
    borderColor: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  pressed: {
    opacity: 0.65,
  },
  image: {
    height: 200,
  },
  inValidLabel: {
    color: COLORS.primaryColor,
  },
  invalidContainer: {
    borderColor: COLORS.primaryColor,
  },
});
export default TransButton;
