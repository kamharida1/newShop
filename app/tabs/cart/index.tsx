import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Button } from "react-native";
import GlassmorphicCard from "../../../etc/cards/glassmorphic";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Screen } from "../../../etc/views/screen";
import tw from 'twrnc'
import { Text } from "moti";
import BagProductItem from "../../../etc/cards/bag_item";
import { BagProduct, Product } from "../../../src/models";
import { Auth, DataStore } from "aws-amplify";
import { FlatList } from "react-native-gesture-handler";
import { formatCurrency } from "../../../src/utils";

export default function Cart() {
  const [bagProducts, setBagProducts] = useState<BagProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const router = useRouter();

  const fetchBagProducts = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    DataStore.query(BagProduct, bp =>
      bp.userSub.eq(userData.attributes.sub),
    ).then(setBagProducts);
  };

  useEffect(() => {
    fetchBagProducts();
  }, []);

  //console.warn(bagProducts)

  useEffect(() => {
    if (bagProducts.filter((bp) => !bp.product).length === 0) {
      return;
    }
    const fetchProducts = async () => {
      // query all products that are used in cart
      const products = await Promise.all(
        bagProducts.map((bagProduct) =>
          DataStore.query(Product, bagProduct.productID)
        )
      );
      console.warn(products || undefined)

      // assign the products to the cart items
      setBagProducts((currentBagProducts) =>
        currentBagProducts.map((bagProduct) => ({
          ...bagProduct,
          product: products.filter((p) => p?.id === bagProduct.productID),
        }))
      );
      // console.warn(bagProducts)
    };

    fetchProducts();
  }, [bagProducts]);

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
    <SafeAreaView style={tw`flex-1`}>
      <Stack.Screen options={{ title: "Cart" }} />
      <Screen style={tw`pt-25`}>
        <FlatList
          data={bagProducts}
          renderItem={({ item }) => <Text>{item.productID}</Text>}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View>
              <Text style={{ fontSize: 18 }}>
                Subtotal ({bagProducts.length} items):{" "}
                <Text style={{ color: "#e47911", fontWeight: "bold" }}>
                  {/* {`${"\u20A6"}`} */}
                  {formatCurrency(totalPrice)}
                </Text>
              </Text>
              <Button title="Proceed to checkout" onPress={onCheckout} />
            </View>
          )}
        />
      </Screen>
    </SafeAreaView>
  );
}
