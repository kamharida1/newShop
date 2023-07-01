import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const Home = () => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <View style={tw`border-4 p-4 rounded-xl border-zinc-400`}>
        <Text style={tw`text-4xl text-zinc-800 font-bold`}>Hello World</Text>
      </View>
    </View>
  );
}

export default Home

const styles = StyleSheet.create({})