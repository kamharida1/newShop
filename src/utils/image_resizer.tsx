import React from "react";
import { View, Image } from "react-native";
import ImageResizer  from "react-native-image-resizer";

const ResizedImage = ({ source, width, height }) => {
  const resizeImage = async () => {
    try {
      const resizedImage = await ImageResizer.createResizedImage(
        source.uri, // The URI of the original image
        width, // The desired width
        height, // The desired height
        "JPEG", // The image format
        80 // The compression quality (0-100)
      );

      // The resized image URI
      const resizedImageURI = resizedImage.uri;

      // Do something with the resized image URI (e.g., display it in an <Image> component)
      console.log("Resized Image URI:", resizedImageURI);
    } catch (error) {
      console.error("Failed to resize image:", error);
    }
  };

  React.useEffect(() => {
    resizeImage();
  }, []);

  return (
    <View>
      <Image
        source={source}
        style={{ width, height }}
        resizeMode="contain"
      />
    </View>
  );
};

// Implementation (not part of the code)
const App = () => {
  const imageSource = { uri: "https://example.com/image.jpg" };
  const desiredWidth = 200;
  const desiredHeight = 200;

  return (
    <View>
      <ResizedImage
        source={imageSource}
        width={desiredWidth}
        height={desiredHeight}
      />
    </View>
  );
};

export default App
