import { Link, Stack } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import tw from "twrnc";
import { BlurView } from "expo-blur";

const Dogs = () => {
  const [dogs, setDogs] = useState([]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "100%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const Header = () => (
    <View style={tw`w-full px-8 py-4 items-center bg-slate-500`}>
      <Pressable onPress={handlePresentModalPress}>
        <Text>Open Modal</Text>
      </Pressable>
    </View>
  );

  useEffect(() => {
    fetch("https://api.thedogapi.com/v1/breeds?limit=20")
      .then((response) => response.json())
      .then((json) => {
        setDogs(json);
      })
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <Link href={`/cart/${item.id}`} asChild>
      <Pressable style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
      </Pressable>
    </Link>
  );

  return (
    <BottomSheetModalProvider>
      <View style={tw`flex-1`}>
        <Stack.Screen options={{ title: "Dogs" }} />
        <FlatList
          data={dogs}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
          ListHeaderComponent={Header}
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BlurView intensity={20} tint={"light"} style={tw`flex-1 p-8 z-20`}>
            <Text style={tw``}>This is awesome.</Text>
          </BlurView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default Dogs;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textContainer: {
    marginLeft: 16,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
