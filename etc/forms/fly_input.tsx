import { Text, View } from "moti";
import { TextInput, TextInputProps } from "react-native";
import tw from 'twrnc'

interface FlyInputProps extends TextInputProps {
  placeholder?: string
  label?: string
  onChangeText?: (name?: string, value?: string) => void
  value: string
  error?: string
}

export default function FlyInput({placeholder, error, label, value, onChangeText}: FlyInputProps) {
  return (
    <View style={tw`flex-row h-12 items-center bg-white rounded px-1 mb-4`}>
      <Text style={tw`flex-1 text-base pl-4`}>{label}</Text>
      <TextInput
        style={tw`flex-2  pl-2 pr-2 text-black`}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
      <Text style={tw`my-2 text-rose-700 text-sm`}>{error}</Text>
    </View>
  );
}