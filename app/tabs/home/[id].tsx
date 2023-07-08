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
import { BlurView } from "expo-blur";
import QuantitySelector from "../../../etc/misc/quantity_selector";
import { formatCurrency } from "../../../src/utils";

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
      productID: product.id,
    });

    await DataStore.save(newBagProduct)
    router.push('tabs/cart')
  }

  if (isLoading && !product) {
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
      <Screen style={tw`flex-1 bg-transparent`} scroll>
        <ImageCarousel onImagePress={handleImagePress} product={product} />
        <View style={tw`flex-1 bg-transparent p-4`}>
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
              {`${"\u20A6"}`} {product?.price}
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
          <Button title="Go to Cart" onPress={() => router.push("tabs/cart")} />
          <View style={tw`self-center`}>
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </View>
        </View>
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
  container: {
    // flex:1,
    width: "100%",
    height: 250,
    zIndex: 1
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ProductDetail;
