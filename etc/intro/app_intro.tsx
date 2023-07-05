import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const introScreens = [
  {
    id: 1,
    title: "Screen 1",
    description: "Description 1",
    imageSource: require("./images/image1.jpg"),
  },
  {
    id: 2,
    title: "Screen 2",
    description: "Description 2",
    imageSource: require("./images/image2.jpg"),
  },
  {
    id: 3,
    title: "Screen 3",
    description: "Description 3",
    imageSource: require("./images/image3.jpg"),
  },
];

const IntroScreen = ({ title, description, imageSource, isLastScreen }) => {
  const navigation = useNavigation();

  const handleDone = () => {
    if (isLastScreen) {
      // Navigate to the homepage or desired screen
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.slideContainer}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {isLastScreen && (
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};


const AppIntro = () => {
  const renderScreen = ({ item, index }) => (
    <IntroScreen
      title={item.title}
      description={item.description}
      imageSource={item.imageSource}
      isLastScreen={index === introScreens.length - 1}
    />
  );

  return (
    <FlatList
      data={introScreens}
      renderItem={renderScreen}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
  );
};


export default AppIntro

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  doneButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
