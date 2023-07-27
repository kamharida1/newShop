import { useEffect, useReducer, useState } from "react";
import {
  fetchSuccess,
  fetchRequest,
  initialState,
  reducer,
  fetchFail,
} from "../../pages/pre_order/reducer";
import { Auth, DataStore } from "aws-amplify";
import { ShippingAddress, User } from "../../src/models";

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Text, View } from "moti";
import { Stack, useRouter } from "expo-router";
import tw from "twrnc";
import AddressCard from "../../etc/cards/address_card";
import { StyleSheet, TouchableOpacity } from "react-native";
import AddressCard2 from "../../etc/cards/address_card_2";
import { useDataStore } from "../../src/hooks/useDataStoreUpdate";
import SoftButton from "../../etc/buttons/soft_button";

const PlaceholderImageSource = "https://picsum.photos/200/300";

export default function AddressList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState<ShippingAddress[] | null>([]);
  const translationY = useSharedValue(0);

  const router = useRouter();

  const { navigateToUpdate } = useDataStore(ShippingAddress);

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

  const scrollHandler = useAnimatedScrollHandler((event) => {
    console.log(event.contentOffset.y);
    translationY.value = event.contentOffset.y;
  });

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(translationY.value, [-143, 0], [0, -49]),
        },
        {
          scale: interpolate(
            translationY.value,
            [-143, -49],
            [1, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const opacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translationY.value, [-143, -49], [1, 0]),
    };
  });

  const selectAddress = async (address: ShippingAddress) => {
    const original = await DataStore.query(ShippingAddress, address.id);
    const updated = ShippingAddress.copyOf(original, (updated) => {
      updated.selected = true;
    });
    await DataStore.save(updated);
  };

  return (
    <View style={tw`flex-1 `}>
      <Stack.Screen options={{ title: "Address" }} />
      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 20 }}
        contentInsetAdjustmentBehavior="automatic"
        onScroll={(e) => {
          console.log(e.nativeEvent.contentOffset.y);
          translationY.value = e.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={tw`items-center`}>
              <Animated.Image
                source={{ uri: PlaceholderImageSource }}
                style={[styles.profile, stylez]}
                resizeMode="cover"
              />
              <Animated.Text style={[styles.text, opacity]}>
                Nnamdi Agu
              </Animated.Text>
            </View>
            {addresses?.length !== 0 ? (
              addresses?.map((address, index) => (
                <View key={address.id}>
                  <AddressCard2
                    address={address}
                    onPress={() => selectAddress(address)}
                    isSelected={address.selected}
                    editPressHandler={() =>
                      navigateToUpdate(address, "/order/add_address", "update")
                    }
                  />
                  <SoftButton
                    onPress={() => router.push("order/payment_methods")}
                    title="Go to payment"
                    buttonStyle={tw`my-2 mx-2 self-center items-center justify-center py-3 bg-yellow-900 rounded-md w-70`}
                    textStyle={tw`text-base text-zinc-200 font-semibold`}
                  />
                </View>
              ))
            ) : (
              <View>
                <Text style={tw`self-center mt-20 mb-10 text-lg`}>
                  You have not added any shipping address yet.
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "order/add_address",
                    })
                  }
                  style={tw`mx-14 items-center justify-center rounded-md py-4 bg-yellow-600`}
                >
                  <Text style={tw`text-lg font-semibold text-white`}>
                    Add Address
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
  },
});
