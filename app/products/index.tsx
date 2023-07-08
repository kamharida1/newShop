import Animated from 'react-native-reanimated';
import { Link } from 'expo-router';
import { Pressable, StyleSheet } from '@bacons/react-views';
import { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import products from '../../data/products'
import SkeletonItem from '../../etc/errors/SkeletonItem';

const ProductItem = ({ item }: { item: any}) => (
  <Link href={`/products/${item.id}`} asChild>
    <Pressable style={styles.city}>
      <Animated.Image
        style={styles.image}
        source={{ uri: item.images[0] }}
      />
      <Animated.Text
        style={styles.name}
      >
        {item.name}
      </Animated.Text>
    </Pressable>
  </Link>
);

export default function ProductGrid() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <FlatList
        data={Array(10)}
        renderItem={() => <SkeletonItem />}
        numColumns={2}
      />
    );
  }

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      scrollEventThrottle={16}
      data={products}
      scrollEnabled
      renderItem={({ item }) => <ProductItem item={item} />}
      keyExtractor={(item) => item.name}
      numColumns={2}
    />
  );
}

const styles = StyleSheet.create({
  city: {
    flex: 1,
    aspectRatio: 1,
    marginHorizontal: 8,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    elevation: 2,
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "70%",
    backgroundColor: "gainsboro",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
});
