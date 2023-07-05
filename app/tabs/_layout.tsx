import { StyleSheet } from "@bacons/react-views";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#224499",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "rgba(200,200,200, 0.5)",
        },
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={30}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          title: "Catalog",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
