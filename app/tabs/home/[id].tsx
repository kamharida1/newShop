import { Stack, useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Product, BagProduct } from "../../../src/models";
import { SafeAreaView } from "react-native-safe-area-context";
import { Screen } from "../../../etc/views/screen";
import ImageCarousel from "../../../etc/cards/image_carousel";
import { Box } from "../../../etc/_Theme";
import tw from "twrnc";
import ImageModal from "../../../etc/modals/image_modal";
import { Auth, DataStore } from "aws-amplify";
import { BlurView } from "expo-blur";
import QuantitySelector from "../../../etc/misc/quantity_selector";
import { formatCurrency } from "../../../src/utils";

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bagProducts, setBagProducts] = useState<BagProduct[]>([]);

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  let [isImageModalVisible, setIsImageModalVisible] = useState(false);
  let [activeIndex, setActiveIndex] = useState(0);

  const { id } = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    DataStore.query(Product, id).then(setProduct);
    setIsLoading(false);
  }, [id]);

  const fetchBagProducts = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      DataStore.query(BagProduct, (bp) =>
        bp.userSub.eq(userData.attributes.sub)
      ).then(setBagProducts);
    } catch (error) {
      console.warn("Error fetching bag products:", error);
    }
  };

  useEffect(() => {
    fetchBagProducts();
  }, []);

  const handleImagePress = (index: number): void => {
    setIsImageModalVisible(!isImageModalVisible);
    setActiveIndex(index);
  };

  const onAddToBag = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    if (!product || !userData) {
      return;
    }

    // Check if the product already exists in the cart
    const existingBagProduct = bagProducts.find(
      (bp) => bp.productID === product.id
    );

    if (existingBagProduct) {
      // If the product already exists, update the quantity
      const updatedQuantity = existingBagProduct.quantity + 1;

      // Create a new instace of BagProduct with the updated quantity
      const updatedBagProduct = BagProduct.copyOf(
        existingBagProduct,
        (updated) => {
          (updated.userSub = userData.attributes.sub),
            (updated.quantity = updatedQuantity),
            (updated.productID = product.id);
        }
      );

      await DataStore.save(updatedBagProduct);
    } else {
      const newBagProduct = new BagProduct({
        userSub: userData.attributes.sub,
        quantity,
        productID: product.id,
      });

      await DataStore.save(newBagProduct);
    }

    router.push("tabs/cart");
  };

  if (isLoading && !product) {
    return <Text>Loading...</Text>;
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
    zIndex: 1,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ProductDetail;
