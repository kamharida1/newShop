import { Pressable, Text, View } from "@bacons/react-views";
import { Link } from "expo-router";

interface LinkButtonT {
  title: string;
  onPress?: () => void;
  style?: any;
  buttonStyle?: any;
  textStyle?: any;
  link: string;
}

export const LinkButton =({
  title,
  onPress,
  style,
  buttonStyle,
  textStyle,
  link
}: LinkButtonT) => {
  return (
    <Link style={style} href={link} asChild>
      <Pressable onPress={onPress}>
        {({ pressed, hovered }) => (
          <View
            style={[
              {
                borderRadius: 15,
                paddingHorizontal: 8,
                paddingVertical: 16,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#3B3C36",
              },
              buttonStyle,
              hovered && { opacity: 0.8 },
              pressed && { opacity: 0.6 },
            ]}
          >
            <Text
              selectable={false}
              style={[
                { color: "white", fontSize: 16, textAlign: "center" },
                textStyle,
              ]}
            >
              {title}
            </Text>
          </View>
        )}
      </Pressable>
    </Link>
  );
}

export const data = [
  {
    id: "1",
    title: "Categories",
    link: "(app)/category/categories",
    style: { alignSelf: "center", marginTop: 16, width: 300 },
  },
  {
    id: "2",
    title: "Prototypes",
    link: "(app)/prototype/prototypes",
    style: { alignSelf: "center", marginTop: 16, width: 300 },
  },
  {
    id: "3",
    title: "Products",
    link: "(app)/product/products",
    style: { alignSelf: "center", marginTop: 16, width: 300 },
  },
  {
    id: "4",
    title: "Brands",
    link: "(app)/brand/brands",
    style: { alignSelf: "center", marginTop: 16, width: 300 },
  },
  {
    id: "5",
    title: "Sub Categories",
    link: "(app)/sub_category/sub_categories",
    style: { alignSelf: "center", marginTop: 16, width: 300 },
  },
  {
    id: "6",
    title: "Option Types",
    link: "(app)/option_type/option_types",
    style: { alignSelf: "center", marginTop: 16, width: 300 },
  },
  {
    id: "7",
    title: "Option Values",
    link: "(app)/option_value/option_values",
    style: { alignSelf: "center", marginTop: 16, width: 300 },
  },
  {
    id: "8",
    title: "Product Types",
    link: "(app)/product_type/product_types",
    style: { alignSelf: "center", marginTop: 16, width: 300 },
  },
];
