import { Stack, useFocusEffect, useRouter, useSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import UserForm from "../../etc/forms/user_form";
import { KeyboardAvoidingWrapper } from "../../etc/views/keyboard_avoiding_wrapper";
import { ShippingAddress, User } from "../../src/models";
import { Auth, DataStore } from "aws-amplify";
import { FontAwesome } from "@expo/vector-icons";
import { useDataStore } from "../../src/hooks/useDataStoreUpdate";

function AddressButton() {
  const router = useRouter();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingRight: 8,
      }}
      onPress={() => router.push("order/addresses")}
    >
      <Text style={{ fontSize: 14, paddingRight: 4 }}>Addresses</Text>
      <FontAwesome name="angle-double-right" size={24} color="black" />
    </Pressable>
  );
}

export default function AddAddress() {
  const [user, setUser] = useState<User | null>(null);
  const [myAddress, setAddress] = useState<ShippingAddress | undefined>(
    undefined
  );

  const { id, mode } = useSearchParams();

  const { data } = useDataStore(ShippingAddress);

  useEffect(() => {
    const myAddress = data.find((addr) => addr.id === id);
    setAddress(myAddress);
  }, [data, id]);

  useFocusEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      const userId = userInfo.attributes.sub;
      const currentUser = await DataStore.query(User, (u) => u.sub.eq(userId));

      setUser(currentUser[0]);
    };
    fetchUser();
  });


  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Add Address",
          headerRight: () => AddressButton(),
          headerBackVisible: true,
        }}
      />
      <KeyboardAvoidingWrapper>
        <>
          <UserForm mode={mode} myAddress={myAddress} user={user} />
        </>
      </KeyboardAvoidingWrapper>
    </View>
  );
}
