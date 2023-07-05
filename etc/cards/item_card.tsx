import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Text, View } from "@bacons/react-views";
import Ionicons from "@expo/vector-icons/Ionicons";


interface ItemCardProps {
  obj: {
    name: string;
    description?: string;
    image?: string;
  };
  onPress?: () => void;
}

export default function ItemCard({ obj, onPress }: ItemCardProps) {
  const {name, description, image } = obj
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{}}>
        <Text style={styles.textStyle}>{name}</Text>
      </View>
      <Ionicons size={24} name="ios-chevron-forward" style={{marginRight: 8}} color="#444" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#C0C0C0",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textStyle: {
    fontSize: 17,
    paddingVertical: 16,
    fontWeight: '400',
  }
});