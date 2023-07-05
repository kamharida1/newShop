import { View, ViewStyle } from "@bacons/react-views"
import { StyleProp, Text, TextStyle } from "react-native"
import useFadingAnimation from "../../src/utils/useFadingAnimation";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  data: Data;
  showIcon?: boolean;
}

type Data = {
  message: string;
  isVisible: boolean;
  hideToast?: () => void;
}

export default function Toast(props: Props) {
  let { containerStyle, textStyle, data, showIcon = true } = props;
  let { isVisible, message, hideToast } = data;

  let [animatedVisibility, animatedValue] = useFadingAnimation(isVisible, { duration: 200 });

  if (!animatedVisibility) {
    return null;
  }

  return (
    <SafeAreaView style={tw`absolute bottom-0 items-center`}>
      <View style={tw.style([
        'flex-row items-center self-center justify-between m-2 h-12 p-5 w-4/5 pl-16 bg-black rounded-s mb-10'
      ], !showIcon && 'pl-6', {
        opacity: animatedValue,
        transform: [
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1],
            })
          }
        ]
      },
       containerStyle
      )}
      >
        <Text style={tw.style('text-zinc-700', {})}></Text>
      </View>
    </SafeAreaView>
  )
}