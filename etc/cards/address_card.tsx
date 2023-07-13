import { Text, View } from "moti";
import { ShippingAddress } from "../../src/models";
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'


interface Props {
  address: ShippingAddress
}

export default function AddressCard({ address }: Props) {
  return (
    <View
      style={tw.style(
        {
          "bg-yellow-400": !!address.selected,
        },
        "flex-row justify-between border-2 border-[#F1EFF5] rounded-xl m-3 p-4 shadow-black shadow-opacity-6 bg-white shadow-offset-0 shadow-radius-2"
      )}
    >
      <View style={tw`flex-1`}>
        <Text style={tw`text-xl font-bold`}>
          {address.address}, {address.subAddress}
        </Text>
        {address.phone && <Text style={tw`text-base font-medium text-neutral-600`}>Phone: {address.phone}</Text>}
        <Text style={tw`text-base text-gray-700 `}>
          {address.city} - {address.state}
        </Text>
      </View>
      {address.selected ? (
        <Ionicons name="checkmark-circle-sharp" size={24} color="rgb(255, 204, 0)" />
      ) : (
        <Ionicons name="checkmark-circle-sharp" size={24} color="#888888" />
      )}
    </View>
  );
}