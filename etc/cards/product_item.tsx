import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { Storage, Analytics } from "aws-amplify";
import { Image } from "expo-image";

import { useNavigation } from "@react-navigation/native";
import { Product } from "../../src/models";
import { Pressable } from "react-native";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = (props: ProductListItemProps) => {
  const { product } = props;
  const [image, setImage] = useState<string | null>(null);

  const navigation = useNavigation();
  const firstImage = product?.images.length > 0 ? product.images[0] : ""; // Get the first image URL

  useEffect(() => {
    try {
      if (firstImage.startsWith("file")) {
        setImage(firstImage);
      } else {
        Storage.get(product.images[0]).then(setImage);
      }
    } catch (error) {
      console.warn("Error Loading Image", error);
    }
  }, [product]);

  return (
    <Pressable
      style={{alignItems: 'center', justifyContent: 'center',flex: 1}}
      onPress={() => { }}
    >
      <Image
        style={{ width: "100%", height: 100 }}
        source={image}
        //placeholder={blurhash}
        contentFit="cover"
        transition={1000}
        //onLoadStart={() => console.warn("Image loading started")}
        onLoad={() => console.warn("Image loaded successfully")}
        onError={(error) => console.log("Error loading image:", error)}
      />
    </Pressable>
  );
};

export default ProductListItem;
