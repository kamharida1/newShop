import { Text, View } from "moti";
import { ShippingAddress } from "../../src/models";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface Props {
  address: ShippingAddress;
  onPress: () => void;
  changePressHandler?: () => void;
  isInCheckout?: boolean;
  editPressHandler?: () => void;
  isSelected?: boolean;
}

export default function AddressCard2 ({
  address,
  onPress,
  editPressHandler,
  changePressHandler,
  isInCheckout,
  isSelected = false,
}: Props) {
  return (
    <View
      style={tw.style(
        isSelected
          ? " justify-between border-2 rounded-xl m-2 mt-8 p-4 shadow-black shadow-opacity-6 bg-white shadow-offset-0 shadow-radius-2 border-[#FFCC00]"
          : "justify-between border-2 border-[#F1EFF5] mt-8 rounded-xl m-2 p-4 shadow-black shadow-opacity-6 bg-white shadow-offset-0 shadow-radius-2"
      )}
    >
      <View style={tw`flex-row items-center justify-between`}>
        <Text style={tw`text-xl font-bold`}>
          {address.firstName} {address.lastName}
        </Text>
        {isInCheckout ? (
          <TouchableOpacity onPress={changePressHandler}>
            <Text style={tw`text-base text-blue-600`}>Change </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={editPressHandler}>
            <Text style={tw`text-base text-blue-600`}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
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
      {isInCheckout ? null : (
        <TouchableOpacity
          style={tw.style(
            isSelected
              ? "flex-row w-70 self-center border-yellow-400 justify-center rounded-md items-center mt-8 border-2 p-2"
              : "flex-row w-70 self-center justify-center border-[#888888] rounded-md items-center mt-8 border-2 p-2"
          )}
          onPress={onPress}
        >
          {isSelected ? (
            <Ionicons
              name="checkmark-circle-sharp"
              size={24}
              color="rgb(255, 204, 0)"
            />
          ) : (
            <Ionicons name="checkmark-circle-sharp" size={24} color="#888888" />
          )}
          <Text style={tw`text-base font-medium ml-1`}>
            Use as the shipping address
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
