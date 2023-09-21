import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import tw from 'twrnc';
function TailWindFirst(props) {
    return (
        <View className="flex-1 bg-red-500">
            <Text style={tw`text-black text-3xl font-bold`}>Hello</Text>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {

    }
})

export default TailWindFirst;