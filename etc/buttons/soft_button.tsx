import { ActivityIndicator, ButtonProps, StyleSheet } from "react-native";
import { Text } from "react-native";
import { TextStyle } from "react-native";
import { StyleProp, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface SoftButtonT {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const SoftButton: React.FC<SoftButtonT> = ({ 
  title, 
  onPress,
  isLoading = false,
  disabled = false,
  buttonStyle, 
  textStyle
}) => {
  const handlePress = () => {
    if (!isLoading && !disabled) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, isLoading || disabled ? styles.disabledButton : null]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading || disabled}
    >
      {isLoading ? (<ActivityIndicator />) : (<Text style={[styles.buttonText, textStyle]}>{title}</Text>)}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabledButton: {
    opacity: 0.5
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold', 
    color: 'white'
  }
})

export default SoftButton