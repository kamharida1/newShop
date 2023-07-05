import { Stack, useRouter, useSearchParams } from "expo-router";
import {  useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Product, BagProduct } from "../../../src/models";
import { SafeAreaView } from "react-native-safe-area-context";
import { Screen } from "../../../etc/views/screen";
import ImageCarousel from "../../../etc/cards/image_carousel";
import { Box } from "../../../etc/_Theme";
import tw from 'twrnc'
import ImageModal from "../../../etc/modals/image_modal";
import { Auth, DataStore } from "aws-amplify";

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  let [isImageModalVisible, setIsImageModalVisible] = useState(false);
  let [activeIndex, setActiveIndex] = useState(0);

  const { id } = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!id) return
    DataStore.query(Product, id).then(setProduct);
    setIsLoading(false)
  },[id])


  const handleImagePress = (index: number): void => {
    setIsImageModalVisible(!isImageModalVisible);
    setActiveIndex(index);
  };

  const onAddToBag = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    if (!product || !userData ) {
      return;
    };

    const newBagProduct = new BagProduct({
      userSub: userData.attributes.sub,
      quantity,
      productID: product.id
    });

    await DataStore.save(newBagProduct)
    router.push('tabs/cart')
  }

  if (isLoading) {
    return (
        <Text>Loading...</Text>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: `${product?.name}`,
        }}
      />
      <Screen style={{ paddingHorizontal: 2 }} scroll>
        <ImageCarousel onImagePress={handleImagePress} product={product} />
        <Box>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            overflow={"hidden"}
          >
            <Text style={tw`text-xl font-bold text-slate-800`}>
              {product?.name}
            </Text>
            <Text style={tw`font-medium text-2xl text-slate-700`}>
              ${product?.price}
            </Text>
          </Box>
          <Text
            style={{
              marginTop: 16,
              lineHeight: 24,
            }}
          >
            {product?.about}
          </Text>
          <Button title="Add to Cart" onPress={onAddToBag} />
          {/* <Button title="Go to Cart" onPress={() => router.push("/cart")} /> */}
        </Box>
        <ImageModal
          activeIndex={activeIndex}
          images={product?.images}
          isVisible={isImageModalVisible}
          setVisible={setIsImageModalVisible}
        />
      </Screen>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
});

export default ProductDetail;
