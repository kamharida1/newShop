import { Text, View } from "moti";
import { PaymentMethod } from "../../src/models";
import tw from 'twrnc'
import { Stack, useRouter } from "expo-router";
import { Screen } from "../../etc/views/screen";
import { Pressable } from "react-native";
import {FontAwesome} from  '@expo/vector-icons'
import { useDataStore } from "../../src/hooks/useDataStoreUpdate";
import { DataStore } from "aws-amplify";
import PaymentCard from "../../etc/cards/payment_card";
import { TouchableOpacity } from "react-native";
import SoftButton from "../../etc/buttons/soft_button";
import useModel from "../../src/hooks/useModel";

function AddPaymentButton() {
  const router = useRouter();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingRight: 8,
      }}
      onPress={() => router.push("order/add_payment")}
    >
      <Text style={{ fontSize: 14, paddingRight: 4 }}>Add Payment</Text>
      <FontAwesome name="angle-double-right" size={24} color="black" />
    </Pressable>
  );
}

export default function PaymentMethods() {
  const { navigateToUpdate } = useDataStore(PaymentMethod);

  const router = useRouter();

  const { items: payments, updateItem } = useModel(PaymentMethod);
  
  const selectPayment = (itemId, isSelected) => {
    const updatedAddress = {
      isSelected: !isSelected
    };
    updateItem(itemId, updatedAddress)
  }
  return (
    <Screen scroll style={tw`flex-1 p-3 bg-gray-200 `}>
      <Stack.Screen
        options={{
          title: "Payment",
          headerRight: () => AddPaymentButton(),
          headerBackVisible: true,
        }}
      />
      {!!payments &&
        payments.map((payment: PaymentMethod, index: number) => (
          <View key={payment.id}>
            <PaymentCard
              payment={payment}
              onPress={() => selectPayment(payment.id, payment.isSelected)}
              isSelected={payment.isSelected}
              editPressHandler={() =>
                navigateToUpdate(payment, "/order/add_payment", "update")
              }
            />
          </View>
        ))}
      <SoftButton
        onPress={() => router.push("order/checkout")}
        title="Checkout"
        buttonStyle={tw`my-2 mx-2 self-center items-center justify-center py-3 bg-yellow-900 rounded-md w-70`}
        textStyle={tw`text-base text-zinc-200 font-semibold`}
      />
    </Screen>
  );
}