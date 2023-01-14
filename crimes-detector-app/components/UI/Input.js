import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../../constants/styles";

const Input = ({ label, style, inValid, textInputConfig }) => {
  const inputStyles = [styles.input];
  const labelStyles = [styles.label];
  if (textInputConfig.multiline) {
    inputStyles.push(styles.multiline);
  }

  if (inValid) {
    inputStyles.push(styles.invalid);
    labelStyles.push(styles.invalidLabel);
  }
  return (
    <View style={styles.inputContainer}>
      <Text style={labelStyles}>{label}</Text>
      <TextInput
        style={inputStyles}
        {...textInputConfig}
        placeholderTextColor={inValid ? COLORS.primaryColor : COLORS.white}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 16,
    marginVertical: 9,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "lato-bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.whitebg,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderColor: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 6,
    fontSize: 16,
    color: COLORS.white,
    fontFamily: "lato",
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
