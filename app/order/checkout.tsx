import { Stack, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'
import { Screen } from "../../etc/views/screen";
import useModel from "../../src/hooks/useModel";
import { ShippingAddress, User } from "../../src/models";
import { fetchUser } from "../../src/hooks/user_context";
import { useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { View } from "moti";

export default function CheckOut() {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const router = useRouter()
  const fetchUser = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      if (!userInfo) {
        return null;
      }
      const userId = userInfo.attributes.sub;
      const user = (await DataStore.query(User)).find((u) => u.sub === userId);
      return user || null;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const user = await fetchUser();
        setUser(user);
        if (user) {
          const addresses = await DataStore.query(ShippingAddress, (addr) =>
            addr.userID.eq(user.id)
          );
          // const address = addresses.filter((addr) => addr.selected )
          setAddresses(addresses);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();

    const subscription = DataStore.observe(ShippingAddress).subscribe(() => {
      fetchAddresses();
    });

    return () => subscription.unsubscribe();
  }, []);

  const address = addresses.find(addr => addr.selected === true);

  //console.log(address);
  return (
    <Screen style={tw`flex-1 bg-transparent`} scroll>
      <Stack.Screen
        options={{
          title: "Checkout",
        }}
      />
      <View style={tw`flex-1 p-3`}>
        <Text style={tw`my-2 text-base font-bold`}>
          Deliver to this address
        </Text>
        <View
          style={tw` flex-row justify-between items-center bg-zinc-200 p-3 border-[0.5px] border-gray-300 rounded-md`}
        >
          <View>
            <Text>{address?.firstName}</Text>
            <Text>{address?.email}</Text>
            <Text>{address?.phone}</Text>
            <Text>{address?.address}</Text>
          </View>
          <Pressable onPress={() => router.push('order/add_address')}>
            <Text style={tw`text-blue-600`}>change</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}