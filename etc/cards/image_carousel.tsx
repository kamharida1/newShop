import { useRouter } from "expo-router";
import React, { useState, useCallback } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { Product } from "../../src/models";


const ImageCarousel = ({
  product,
  onImagePress,
}: {
  product: Product;
  onImagePress: (index: number) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = useWindowDimensions().width;

  const onFlatlistUpdate = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
    //console.log(viewableItems);
  }, []);

  return (
    <View style={styles.root}>
      <FlatList
        data={product?.images}
        renderItem={({ item, index }) => {
          const handleItemClick = () => {
            onImagePress(index);
          };
          return (
            <Pressable onPress={handleItemClick}>
              <Image
                style={[styles.image, { width: windowWidth - 20 }]}
                source={{ uri: item }}
                resizeMode="cover"
              />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth}
        snapToAlignment={"center"}
        decelerationRate={"fast"}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        onViewableItemsChanged={onFlatlistUpdate}
      />
      <View style={styles.dots}>
        {product?.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex ? "#c9c9c9" : "#ededed",
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  image: {
    margin: 10,
    height: 250,
    resizeMode: "contain",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: "#ededed",
    borderColor: "#c9c9c9",
    margin: 5,
  },
});

export default ImageCarousel;
