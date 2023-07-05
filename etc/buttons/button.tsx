import { Pressable, Text, View } from "@bacons/react-views";
import {TextStyle, ViewStyle} from 'react-native'

interface ButtonT {
  children: string;
  onPress: () => void;
  style?: any;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button =({
  children,
  onPress,
  style,
  buttonStyle,
  textStyle
 }: ButtonT) => {
  return (
    <Pressable onPress={onPress} style={style}>
      {({ pressed, hovered }) => (
        <View
          style={[
            {
              borderRadius: 8,
              paddingHorizontal: 8,
              paddingVertical: 16,
              justifyContent: 'center',
              alignItems: 'center'
            },
            buttonStyle,
            hovered && { opacity: 0.8 },
            pressed && { opacity: 0.6 }
          ]}
        >
          <Text
            selectable={false}
            style={[
              { color: "white", fontSize: 16, textAlign: 'center' },
              textStyle,
            ]}
          >
            {children}
          </Text>
        </View>
      )}
    </Pressable>
  )
}