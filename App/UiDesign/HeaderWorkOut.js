import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../src/styles/colors';
import { useNavigation } from '@react-navigation/native';
function HeaderWorkOut({ leftback, color = colors.wwhite }) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={!!leftback ? leftback : () => navigation.goBack()}>
                <Icon name="chevron-back" size={30} color={color} />
            </TouchableOpacity>
            <FontAwesome name="navicon" size={25} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        flexDirection: 'row',
        // height: moderateVerticalScale(30),
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(18),
        paddingVertical: moderateVerticalScale(10)
    }
})

export default HeaderWorkOut;