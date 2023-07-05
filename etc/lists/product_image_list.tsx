import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Product } from "../../src/models"
import {ScreenSize, useDimensions } from "../../src/utils/dimensions"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";

type Props = {
  product: Product;
  onImagePress: (index: number) => void;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export default function ImageList(props: Props) {
  let { product, onImagePress, style, contentContainerStyle } = props;
  let { screenSize, width } = useDimensions();
  
  let isPhone = screenSize === ScreenSize.Small;
  let isTabletPortrait = screenSize === ScreenSize.Medium;
  let isLandscape = screenSize === ScreenSize.Large;

  let imageSize = isLandscape
    ? {
        width: width / 2,
        height: "100%",
      }
    : {
        width,
        height: isPhone ? 320 : 576,
    };
  
  let renderProductImage = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => {
    return (
      <TouchableOpacity style={styles.flex} onPress={() => onImagePress(index)}>
        <Image source={{ uri: item }} style={imageSize} resizeMode="cover" />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={[styles.flex, style]}
      horizontal
      pagingEnabled
      data={product.images}
      renderItem={renderProductImage}
      keyExtractor={(item) => item}
      contentContainerStyle={contentContainerStyle}
    />
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1}
})