import { Link, Stack, useRouter } from 'expo-router';
import { Platform, Pressable } from 'react-native';
import { Box, Text } from '../../etc/_Theme';
import { FontAwesome } from "@expo/vector-icons"


export default function ProductLayout() {
    const router = useRouter();

    return (
      <Stack screenOptions={{}}>
        <Stack.Screen
          name="index"
          options={{
            title: "Products",
            headerLargeTitle: true,
            headerRight: AddProductButton,
            headerSearchBarOptions: {
              onChangeText: (event) => {
                // Update the query params to match the search query.
                router.setParams({
                  q: event.nativeEvent.text,
                });
              },
            },
          }}
        />
        <Stack.Screen
          name="add_product"
          options={{
            title: "Add Product",
            presentation: "modal",
            headerRight: Platform.select({
              ios: DismissComposeButton,
            }),
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            title: "Product Detail",
            headerLargeTitle: true,
          }}
        />
        <Stack.Screen
          name="edit"
          options={{
            title: "Edit Product",
            headerLargeTitle: true,
          }}
        />
      </Stack>
    );
};

function AddProductButton() {
    const router = useRouter();
    return (
      <Pressable
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          paddingRight: 8,
        }}
        onPress={() => router.push("/products/add_product")}
      >
        <Text variant="body"> Add Product </Text>
        <FontAwesome name="sign-out" size={24} color="black" />
      </Pressable>
    );
}

function DismissComposeButton() {
    return (
        <Link href="..">
            <Text
                style={{
                    fontWeight: "normal",
                    paddingHorizontal: 8,
                    fontSize: 16,
                }}
            >
                Back
            </Text>
        </Link>
    );
}