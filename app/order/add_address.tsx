import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import UserForm from "../../pages/pre_order/user_form";
import { KeyboardAvoidingWrapper } from "../../etc/views/keyboard_avoiding_wrapper";
import { User } from "../../src/models";
import { Auth, DataStore } from "aws-amplify";
import { FontAwesome } from '@expo/vector-icons'

export default function AddAddress() {
  const unmounted = useRef(false);
  // const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      const userId = userInfo.attributes.sub;
      const currentUser = await DataStore.query(User, u => u.sub.eq(userId));

      setUser(currentUser[0])
    }

    // const subscribeToShippingAddresses = async () => {
    //   const subscription = DataStore.observe(ShippingAddress).subscribe(() => {
    //     fetchShippingAddresses();
    //   });
    //   return () => subscription.unsubscribe();
    // };

    // const fetchShippingAddresses = async () => {
    //   if (user) {
    //     const addresses = await DataStore.query(ShippingAddress, (addr) =>
    //       addr.userID("eq", user.id)
    //     );
    //     setShippingAddresses(addresses);
    //   }
    // };

    fetchUser();
    // subscribeToShippingAddresses();
  }, []);

 // console.warn(user)

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  // useFocusEffect(() => {
  //   setLoading(true);
  //   const interval = setInterval(() => {
  //     setLoading(false)
  //   }, 400);
  //   return () => clearInterval(interval)
  // });


  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Add Address",
          headerRight: (() => AddressButton()),
          headerBackVisible: true,
        }}
      />
      <KeyboardAvoidingWrapper>
        <>
          <UserForm user={user} />
        </>
      </KeyboardAvoidingWrapper>
    </View>
  );
};


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
      <Text style={{ fontSize: 14, paddingRight:4 }}>Addresses</Text>
      <FontAwesome name="angle-double-right" size={24} color="black" />
    </Pressable>
  );
}

