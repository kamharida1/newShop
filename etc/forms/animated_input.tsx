import { View } from "@bacons/react-views";
import React, { useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native"; 
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function AnimatedInput() {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const animationValue = useSharedValue(0);

  const handleFocus = () => {
    setIsFocused(true)
    animationValue.value = withTiming(1, { duration: 200})
  }

  const handleBlur = () => {
    setIsFocused(false)
    animationValue.value = withTiming(0, { duration: 200})
  }

  const animatedStyle = useAnimatedStyle(() => {
    // const translateY = 30 * (1 - animationValue.value);
    // const scale = 0.8 + 0.2 * animationValue.value
    // return {
    //   transform: [{ translateY }, { scale }],
    // }
    const translateY = interpolate(animationValue.value, [0, 1], [0, -30], Extrapolate.CLAMP);
    const scale = interpolate(animationValue.value, [0, 1], [1, 0.8], Extrapolate.CLAMP)
    return {
      transform: [{ translateY }, { scale }]
    }
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.labelContainer, animatedStyle]}>
        <Animated.Text
          style={[
            styles.label,
            {
              fontSize: isFocused ? 14 : 16,
              color: isFocused ? '#4CCCEE' : '#9E9E9E'
            }
          ]}
        >
          {isFocused ? 'Focused' : 'Placeholder'}
        </Animated.Text>
      </Animated.View>
      <TextInput
        ref={inputRef}
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  labelContainer: {
    position: 'absolute',
    left: 16,
    top: 12,
  },
  label: {
    fontSize: 16
  },
  input: {
    height: 40,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#9E9E9E'
  }
});