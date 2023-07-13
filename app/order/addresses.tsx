import { useEffect, useReducer } from "react";
import { fetchSuccess, fetchRequest, initialState, reducer, fetchFail } from "../../pages/pre_order/reducer";
import { DataStore } from "aws-amplify";
import { ShippingAddress } from "../../src/models";

import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import { Text, View } from "moti";
import { Stack, useRouter } from "expo-router";
import tw from 'twrnc'
import AddressCard from "../../etc/cards/address_card";
import { ScrollView } from "react-native-gesture-handler";
import { Image, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

const PlaceholderImageSource = "https://picsum.photos/200/300";


export default function AddressList() {
  const translationY = useSharedValue(0);

  useEffect(() => {
    const getAddresses = async () => {
      dispatch(fetchRequest());
      try {
        const addresses = await DataStore.query(ShippingAddress);
        dispatch(fetchSuccess(addresses))
      } catch (error: any) {
        dispatch(fetchFail(error.message))
      }
    };

    getAddresses();
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { addresses, loading, error } = state;

  const scrollHandler = useAnimatedScrollHandler((event) => {
    console.log(event.contentOffset.y);
     translationY.value = event.contentOffset.y;
  });

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translationY.value,
            [-143, 0],
            [0, -49]
          ),
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
      opacity: interpolate(
        translationY.value,
        [-143, -49],
        [1, 0]
      )
    }
  })
  
  return (
    <View style={tw`flex-1 `}>
      <Stack.Screen options={{ title: "Address" }} />
      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 20 }}
        contentInsetAdjustmentBehavior="automatic"
        onScroll={
          (e) => {
            console.log(e.nativeEvent.contentOffset.y);
            translationY.value = e.nativeEvent.contentOffset.y
          }
        }
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
              <Animated.Text style={[styles.text, opacity]}>Nnamdi Agu</Animated.Text>
            </View>
            {addresses.map((address) => (
              <View key={address.id}>
                <AddressCard address={address} />
              </View>
            ))}
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
    fontSize: 24
  }
});