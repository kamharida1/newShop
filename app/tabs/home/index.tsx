import { DataStore } from "aws-amplify";
import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Product } from "../../../src/models";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'
import { formatCurrency } from "../../../src/utils";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    DataStore.query(Product).then(setProducts)
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <Link href={`tabs/home/${item.id}`} asChild>
      <Pressable
        style={tw`flex-1 aspect-square mx-2 mb-4 bg-white rounded-md z-2 overflow-hidden items-center`}
      >
        <Image
          source={{ uri: item.images[0] }}
          resizeMode="cover"
          style={{ width: "100%", height: "70%", backgroundColor: "gainsboro" }}
        />
        <Text style={tw`mt-2 text-base font-bold`}>{item.name}</Text>
        <Text style={tw`mt-0 text-lg font-light`}>
          {formatCurrency(item.price)}
        </Text>
      </Pressable>
    </Link>
  );

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Stack.Screen options={{ title: "Cats" }} />
      <>
        <FlatList
          contentInsetAdjustmentBehavior="automatic"
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          scrollEnabled
          data={products}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        />
      </>
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
 
});
