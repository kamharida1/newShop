import { useRouter, useSearchParams } from "expo-router";
import products from "../../data/products";
import { Box, Text } from "../../etc/_Theme";
import ImageCarousel from "../../etc/cards/image_carousel";
import { Screen } from "../../etc/views/screen";

const ProductDetails = () => {
  const { id } = useSearchParams();
  const router = useRouter();

  const product = products.find((p) => p.id == id);

  const handlePressBack = () => {
    router.back();
  };

  return (
    <Screen scroll>
      <ImageCarousel images={product?.images} />
      <Box m="l">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text style={{ color: "black" }} variant="subheader">
            {product?.name}
          </Text>
          <Text style={{ color: "black", fontWeight: '300' }} variant="header">
            ${product?.price}
          </Text>
        </Box>
        <Text
          style={{
            marginTop: 16,
            lineHeight:24
          }}
        >
          {product?.about}
        </Text>
      </Box>
    </Screen>
  );
};

export default ProductDetails;