import { Text, View } from "moti";
import { Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from 'twrnc'

export default function QuantitySelector({quantity, setQuantity}) {
  const onMinus = () => {
    setQuantity(Math.max(0, quantity - 1));
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View
      style={tw`flex-row items-center justify-between w-48 border-2 rounded-lg  bg-transparent border-[#f8f6f6]`}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onMinus}
        style={tw`w-12 h-12 items-center justify-center rounded-lg bg-[#d1d1d1]`}
      >
        <Text style={tw`text-xl`}>-</Text>
      </TouchableOpacity>
      <Text style={tw`text-xl`}>{quantity}</Text>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPlus}
        style={tw`w-12 h-12 items-center justify-center rounded-lg bg-[#d1d1d1]`}
      >
        <Text style={tw`text-xl`}>+</Text>
      </TouchableOpacity>
    </View>
  );
}