import { useRouter } from 'expo-router';
import React, { memo } from 'react'
import { Image, Pressable } from 'react-native';
import { RoundIconButton } from '../icons';
import { Box, Card, Text } from '../_Theme';

interface CategoryT {
  obj: {
    name: string;
    description: string;
    image: string;
  }
  onPress: () => void
}

const CategoryCard = memo(({ obj, onPress, }: CategoryT) => {
  const { name, description, image } = obj
  const router = useRouter();
  return (
    <Pressable onPress={onPress}>
      <Card
        overflow="hidden"
        flexDirection="row"
        padding="l"
        margin="s"
        variant="elevated"
      >
        <Image
          source={{ uri: image }}
          style={{ width: 80, height: 80, resizeMode: "cover" }}
        />
        <Box ml="m" flex={1}>
          <Text variant="body">{name}</Text>
          <Text variant="body">{description}</Text>
        </Box>
        <Box alignItems="center" justifyContent="center">
          <RoundIconButton
            name="chevron-right"
            size={30}
            color="forgroundSubdued"
            iconRatio={1}
            align="center"
            onPress={() => router.push("/[categore]")}
          />
        </Box>
      </Card>
    </Pressable>
  );
})

export default CategoryCard;
