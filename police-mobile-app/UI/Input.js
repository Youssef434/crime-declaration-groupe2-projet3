import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
const Input = ({
  label,
  style,
  inValid,
  textInputConfig,
  nameIcon,
  colorIcon,
  sizeIcon,
}) => {
  const inputStyles = [styles.input];
  const labelStyles = [styles.label];
  if (textInputConfig?.multiline) {
    inputStyles.push(styles.multiline);
  }

  if (inValid) {
    inputStyles.push(styles.invalid);
    labelStyles.push(styles.invalidLabel);
  }
  return (
    <View style={styles.inputContainer}>
      <Text style={labelStyles}>{label}</Text>
      <View style={styles.iconContainer}>
        <Ionicons
          name={nameIcon}
          color={colorIcon}
          size={sizeIcon}
          style={styles.icon}
        />
        <TextInput
          style={[inputStyles, { paddingHorizontal: nameIcon ? 38 : 8 }]}
          {...textInputConfig}
          placeholderTextColor={
            inValid ? COLORS.primaryColor : COLORS.primaryBlue
          }
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 16,
    marginVertical: 9,
  },
  label: {
    fontSize: 14,
    color: COLORS,
    // fontFamily: "lato-bold",
    marginBottom: 4,
    textAlign: "center",
    letterSpacing: 1,
  },
  iconContainer: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  input: {
    paddingVertical: 8,
    borderColor: COLORS.primaryBlue,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    fontSize: 16,
    color: "#115DA9",
    background: "transparent",
    // fontFamily: "lato",
  },
  multiline: {
    minHeight: 140,
    textAlignVertical: "top",
  },
  invalid: {
    borderColor: COLORS.primaryColor,
  },
  invalidLabel: {
    color: COLORS.primaryColor,
  },
});
export default Input;
