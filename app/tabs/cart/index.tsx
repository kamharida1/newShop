import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Button, Pressable } from "react-native";
import GlassmorphicCard from "../../../etc/cards/glassmorphic";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Screen } from "../../../etc/views/screen";
import tw from 'twrnc'
import { Text } from "moti";
import BagProductItem from "../../../etc/cards/bag_product_item";
import { BagProduct, Product } from "../../../src/models";
import { Auth, DataStore } from "aws-amplify";
import { FlatList } from "react-native-gesture-handler";
import { formatCurrency } from "../../../src/utils";
import NumberFormatted from "../../../src/utils/number_formatted";

export default function Cart() {
  const [bagProducts, setBagProducts] = useState<BagProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const router = useRouter();

  const fetchBagProducts = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      DataStore.query(BagProduct, (bp) =>
        bp.userSub.eq(userData.attributes.sub)
      ).then(setBagProducts);
      // const products = await Promise.all(
      //   bagProducts.map((bp) => DataStore.query(Product, bp.productID))
      // );
      // const bagItems = bagProducts.map((bp, index) => ({
      //   ...bp,
      //   product: products[index],
      // }));
      // setBagProducts(bagItems);
     } catch(error) {
        console.warn('Error fetching bag products:', error)
    }
  };

  useEffect(() => {
    fetchBagProducts();
  }, []);

  //console.warn(bagProducts)

  // useEffect(() => {
  //   if (bagProducts.filter((bp) => !bp.product).length === 0) {
  //     return;
  //   }
  //   const fetchProducts = async () => {
  //     // query all products that are used in cart
  //     const products = await Promise.all(
  //       bagProducts.map((bagProduct) =>
  //         DataStore.query(Product, bagProduct.productID)
  //       )
  //     );
  //     //console.warn(products || undefined)

  //     // assign the products to the cart items
  //     setBagProducts((currentBagProducts) =>
  //       currentBagProducts.map((bagProduct) => ({
  //         ...bagProduct,
  //         product: products.filter((p) => p?.id === bagProduct.productID),
  //       }))
  //     );
  //     // console.warn(bagProducts)
  //   };

  //   fetchProducts();
  // }, [bagProducts]);

  useEffect(() => {
    const subscription = DataStore.observe(BagProduct).subscribe(msg => fetchBagProducts(),);
    return subscription.unsubscribe;
  }, []);

  useEffect(() => {
    const subscriptions = bagProducts.map(bp =>
      DataStore.observe(BagProduct, bp.id).subscribe(msg => {
        if (msg.opType === 'UPDATE') {
          setBagProducts(curBagProducts =>
            curBagProducts.map(bp => {
              if (bp.id !== msg.element.id) {
                console.log('different id');
                return bp;
              }
              return {
                ...bp,
                ...msg.element,
              }
            })
          )
        }
      })
    );

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    }
  }, []);

  useEffect(() => {
    const calculateTotalPrice = async () => {
      let totalPrice = 0;

      for (const bp of bagProducts) {
        try {
          const product = await DataStore.query(Product, bp.productID);
          totalPrice += product?.price * bp.quantity;
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }

      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [bagProducts]);

  const onCheckout = () => {
    router.push({ pathname: 'order/add_address', params: { totalPrice } });
  };

  if (bagProducts.filter((bp) => !bp.product).length !== 0) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={tw`flex-1 px-2`}>
      <Stack.Screen options={{ title: "Cart" }} />
      <Screen
        style={tw` bg-white  border-gray-300 overflow-hidden   shadow-opacity-6 shadow-offset-0 shadow-radius-2 shadow-black `}
      >
        <FlatList
          data={bagProducts}
          keyExtractor={(item) => item.id}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={tw`pb-8`}
          renderItem={({ item }) => <BagProductItem bagItem={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={tw`p-3 rounded-t-xl overflow-hidden`}>
              <Text style={{ fontSize: 18 }}>
                Subtotal ({bagProducts.length} items):{" "}
                <Text style={{ color: "#e47911", fontWeight: "bold" }}>
                  {/* {`${"\u20A6"}`} */}
                  {/* {formatCurrency(totalPrice)} */}
                  <NumberFormatted value={totalPrice} />
                </Text>
              </Text>
              {/* <Button title="Proceed to checkout" onPress={onCheckout} /> */}
              <Pressable
                style={tw`my-4 items-center justify-center h-13 border-2 rounded-md border-yellow-600`}
                onPress={onCheckout}
              >
                <Text style={tw`text-lg font-bold`}>Proceed to checkout</Text>
              </Pressable>
            </View>
          )}
        />
      </Screen>
    </SafeAreaView>
  );
}
