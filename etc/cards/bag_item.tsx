import { DataStore } from "aws-amplify";
import { BagProduct } from "../../src/models";
import { Image, Text, View } from "moti";
import tw from 'twrnc'
import {FontAwesome} from '@expo/vector-icons'
import { formatCurrency } from "../../src/utils";
import QuantitySelector from "../misc/quantity_selector";
import React from "react";

interface BagProductItemProps {
  bagItem: BagProduct;
}

const BagProductItem =({bagItem}: BagProductItemProps) => {
  console.warn(bagItem);
  const { product, ...bagProduct } = bagItem;

  const updateQuantity = async (newQuantity: number) => {
    const original: any = await DataStore.query(BagProduct, bagProduct.id);

    await DataStore.save(
      BagProduct.copyOf(original, (updated) => {
        updated.quantity = newQuantity;
      })
    );
  }

    return (
      <View style={tw``}>
        <View style={tw`flex-row`}>
          <Image
            resizeMode="contain"
            style={tw.style({ flex: 2, height: 150 })}
            source={{ uri: product.image }}
          />
          <View style={tw.style({ flex: 3, padding: 10 })}>
            <Text style={tw``}>{product.title}</Text>
            {/* Ratings */}
            <View style={tw``}>
              {[0, 0, 0, 0, 0].map((el, i) => (
                <FontAwesome
                  key={`${product.id}-${i}`}
                  style={tw``}
                  name={i < Math.floor(product.rating) ? "star" : "star-o"}
                  size={18}
                  color={"#e47911"}
                />
              ))}
              <Text>{product.rating}</Text>
            </View>
            <Text style={tw``}>
              from {formatCurrency(product.price)}
              <Text style={tw``}>{formatCurrency(product.price)}</Text>
            </Text>
          </View>
        </View>
        <View style={tw``}>
          <QuantitySelector
            quantity={bagProduct.quantity}
            setQuantity={updateQuantity}
          />
        </View>
      </View>
    );
  };

export default BagProductItem;