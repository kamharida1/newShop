import "@azure/core-asynciterator-polyfill";
import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import ItemCard from "../etc/cards/item_card";

import { Product, User } from "../src/models";
import { Amplify, Auth, DataStore } from "aws-amplify";
import { FlatList } from "react-native-gesture-handler";
import HomeSvg from '../assets/icons/home-svgrepo-com.svg'

  import { MotiView } from "moti";

import awsExports from "../src/aws-exports";
import { Easing } from "react-native-reanimated";
import { useFocusEffect, useRouter } from "expo-router";
import { Space } from "../etc/space/re_space";

Amplify.configure(awsExports);

const Home = () => {
  // const [products, setProducts] = useState<Product[]>([]);

  const router = useRouter();

  useFocusEffect(() => {
    const saveUserToDB = async () => {
      // get user from cognito
      const userInfo = await Auth.currentAuthenticatedUser();

      if (!userInfo) {
        return;
      }
      const userId = userInfo.attributes.sub;

      // check if user exists in DB
      const user = (await DataStore.query(User)).find((u) => u.sub === userId);
      if (!user) {
        // if not, save user to db.
        await DataStore.save(
          new User({
            sub: userId,
            email: userInfo.attributes.email,
          })
        );
      } else {
        // console.warn("User already exists in DB")
        // return
        router.replace("tabs/home");  
      }
    };
    saveUserToDB();
  });

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Button title="Tabs" onPress={() => router.push('tabs/home')} />
      <Space />
      <Button title="Products" onPress={() => router.push('products')} />
   </View>
  );
};

export default Home;
