import { Text, View } from "moti";
import { ShippingAddress } from "../../src/models";
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";


interface Props {
  address: ShippingAddress;
  onPress: () => void;
  changePressHandler?: () => void;
  isInCheckout?: boolean;
  editPressHandler?: () => void;
  isSelected?: boolean
}

export default function AddressCard({
  address,
  onPress,
  editPressHandler,
  changePressHandler,
  isInCheckout,
  isSelected,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(
        isSelected
          ? "flex-row justify-between border-2 rounded-xl m-2 mt-8 p-4 shadow-black shadow-opacity-6 bg-white shadow-offset-0 shadow-radius-2 border-[#FFCC00]"
          : "flex-row justify-between border-2 border-[#F1EFF5] mt-8 rounded-xl m-2 p-4 shadow-black shadow-opacity-6 bg-white shadow-offset-0 shadow-radius-2"
      )}
    >
      <View style={tw`flex-1`}>
        <Text style={tw`text-xl font-bold`}>
          {address.firstName} {address.lastName}
        </Text>
        <Text style={tw`text-base font-bold`}>
          {address.address},{"\n"}
          {address.subAddress}
        </Text>
        {address.phone && (
          <Text style={tw`text-base font-medium text-neutral-600`}>
            Phone: {address.phone}
          </Text>
        )}
        <Text style={tw`text-base text-gray-700 `}>
          {address.city} - {address.state}
        </Text>
      </View>
      {isSelected ? (
        <Ionicons
          name="checkmark-circle-sharp"
          size={24}
          color="rgb(255, 204, 0)"
        />
      ) : (
        <Ionicons name="checkmark-circle-sharp" size={24} color="#888888" />
      )}
    </TouchableOpacity>
  );
}