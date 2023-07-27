import { useState } from "react";
import { PaymentMethod, User } from "../../src/models";
import RNPickerSelect from "react-native-picker-select";

import { Stack, useRouter } from "expo-router";
import { KeyboardAvoidingWrapper } from "../../etc/views/keyboard_avoiding_wrapper";
import { Text, View } from "moti";
import tw from 'twrnc'
import FlyInput from "../../etc/forms/fly_input";
import { Dimensions, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Button } from "../../etc/buttons/button";
import { useDataStore } from "../../src/hooks/useDataStoreUpdate";
import { Auth, DataStore } from "aws-amplify";

const { width } = Dimensions.get("window");

const data = [
  { label: "Visa", value: "Visa" },
  { label: "MasterCard", value: "MasterCard" },
];

export default function AddPayment() {
  const [paymentFields, setPaymentFields] = useState({
    name: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    type: "Visa",
    isSelected: false,
  });

  const router = useRouter();

  const {create} = useDataStore(PaymentMethod);

  const handleFieldChange = (name, value) => {
    setPaymentFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  const addCard = async () => {
    const userInfo = await Auth.currentAuthenticatedUser(); 
    const userId = userInfo.attributes.sub;
    const user = (await DataStore.query(User)).find((u) => u.sub === userId);

    const { name, cardNumber, expirationDate, cvv, type, isSelected } = paymentFields;
    const newPayment = {
      name,
      cardNumber,
      expirationDate,
      cvv,
      type,
      isSelected,
      userID: user?.id,
    };
  
    create(newPayment);
    router.push("order/payment_methods");
  }

   const showIconPlatform =
     Platform.OS === "android" ? (
       <></>
     ) : (
       <Feather
        //  style={styles.icon}
         name="arrow-down"
         size={25}
         color="black"
       />
     );

  return (
    <View style={tw`flex-1`}>
      <Stack.Screen
        options={{
          title: "Add Payment",
          headerBackVisible: true,
        }}
      />
      <KeyboardAvoidingWrapper>
        <>
          <FlyInput
            value={paymentFields.name}
            label="Full Name"
            placeholder="full Name"
            onChangeText={(v) => handleFieldChange("name", v)}
            //error={errors.name}
          />
          <FlyInput
            value={paymentFields.cardNumber}
            label="Card number"
            placeholder="1234 5678 9012 3456"
            keyboardType="number-pad"
            onChangeText={(v) => handleFieldChange("cardNumber", v)}
            //error={errors.cardNumber}
          />
          <FlyInput
            value={paymentFields.expirationDate}
            label="Expiry Date"
            placeholder="MM/YY"
            keyboardType="number-pad"
            onChangeText={(v) => handleFieldChange("expirationDate", v)}
            //error={errors.expirationDate}
            maxLength={5}
          />
          <FlyInput
            value={paymentFields.cvv}
            label="CVV"
            placeholder="CVV"
            keyboardType="number-pad"
            onChangeText={(v) => handleFieldChange("cvv", v)}
            //error={errors.cvv}
            maxLength={3}
          />
          <View
            style={tw` flex-row mt-4 border-[1.5px] rounded-md h-13 justify-between mb-4 px-2 border-gray-300 items-center relative`}
          >
            <RNPickerSelect
              onValueChange={(value) => handleFieldChange("type", value)}
              placeholder={{ label: "Select Payment Type", value: "" }}
              items={data}
              value={paymentFields.type}
              style={pickerSelectStyles}
            />
            {showIconPlatform}
          </View>
          <TouchableOpacity
            style={tw`w-full mt-3 mb-2 flex-row ml-2`}
            onPress={() =>
              handleFieldChange("isSelected", !paymentFields.isSelected)
            }
          >
            {paymentFields.isSelected ? (
              <View style={tw`items-center justify-center`}>
                <Feather name="check-square" size={24} color="blue" />
              </View>
            ) : (
              <View style={tw`items-center justify-center`}>
                <Feather name="check-square" size={24} color="black" />
              </View>
            )}
            <Text style={tw`ml-2`}>Use as default payment method</Text>
          </TouchableOpacity>
          <Button
            onPress={() => addCard()}
            buttonStyle={tw`w-full bg-yellow-900 mt-8`}
            textStyle={tw`text-base`}
          >
            ADD CARD
          </Button>
        </>
      </KeyboardAvoidingWrapper>
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    color: "black",
    paddingVertical: 10,
    width: width,
  },
  inputAndroid: {
    fontSize: 15,
    color: "black",
    paddingVertical: 10,
    paddingRight: width - 30,
  },
});