import { DataStore } from "aws-amplify";
import { BagProduct, Brand, Product } from "../../src/models";
import { Image, Pressable, Text, View } from "react-native";
import tw from 'twrnc'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { formatCurrency } from "../../src/utils";
import QuantitySelector from "../misc/quantity_selector";
import React, { useEffect, useState } from "react";
import Card from "./universal_card";
import { useTheme } from "../_Theme";
import NumberFormatted from "../../src/utils/number_formatted";
import Animated, { LightSpeedInLeft, Layout, LightSpeedOutRight, ZoomInDown, ZoomInUp, SlideInUp, FadeInDown } from "react-native-reanimated";
import { AnimatePresence, MotiView } from "moti";

interface BagProductItemProps {
  bagItem: BagProduct;
}

const AnimatedCard =
  Animated.createAnimatedComponent(Card);


const BagProductItem = ({ bagItem }: BagProductItemProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  //console.warn(bagItem);
  const { productID, ...bagProduct } = bagItem;

  const { colors } = useTheme()
  //console.warn(productID);

  useEffect(() => {
    findProduct();
  }, []);

  const findProduct = async () => {
    await DataStore.query(Product, productID).then(setProduct)
  };

  const deleteCart = async (id) => {
    const toDelete = await DataStore.query(BagProduct, id);
    if (toDelete) {
      DataStore.delete(toDelete);
    }
  }

  const updateQuantity = async (newQuantity: number) => {
    const original: any = await DataStore.query(BagProduct, bagProduct.id);

    await DataStore.save(
      BagProduct.copyOf(original, (updated) => {
        updated.quantity = newQuantity;
      })
    );
  }
    return (
      <AnimatePresence>
        <Card style={tw`flex-row overflow-hidden`}>
          <View style={tw``}>
            <Image
              source={{ uri: product?.images[0] }}
              style={tw.style(
                { flex: 2, width: 100, height: 100, borderRadius: 10 },
                ["items-center"]
              )}
            />
            <QuantitySelector
              quantity={bagProduct.quantity}
              setQuantity={updateQuantity}
            />
          </View>
          <View style={tw`flex-3 pl-4`}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={tw`text-xl font-bold`}
            >
              {product?.name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={tw`text-base font-medium text-zinc-700 `}
            >
              {product?.about}
            </Text>
            {product?.count <= 4 ? (
              <Text style={tw`text-red-700 text-sm font-extrabold`}>
                Less than {product?.count} items
              </Text>
            ) : (
              <Text style={tw`text-green-700 text-sm font-bold`}>In Stock</Text>
            )}
            <Text
              style={tw.style(
                "absolute text-[#c45500] right-4 bottom-0 mt-2 font-light text-3xl"
              )}
            >
              {/* {`${"\u20A6"}`}
            {product?.price} */}
              <NumberFormatted value={product?.price} />
            </Text>
          </View>

          <View style={tw`flex-0.6`}>
            <Pressable
              style={tw.style({ position: "absolute", top: 3, right: 3 })}
              onPress={() => deleteCart(bagProduct.id)}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                size={30}
                color={colors.body}
              />
            </Pressable>
          </View>
        </Card>
      </AnimatePresence>
    );
  };

export default BagProductItem;