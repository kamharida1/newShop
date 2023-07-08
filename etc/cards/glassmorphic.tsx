import { BlurView } from "expo-blur";
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

const GlassmorphicCard = ({ imageSource, title, description }) => {
  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <BlurView
        style={styles.contentContainer}
        tint="light"
        intensity={10}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "80%",
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "white",
  },
});

export default GlassmorphicCard;
