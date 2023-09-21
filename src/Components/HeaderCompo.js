import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { moderateScaleVertical } from '../styles/responsiveSize';
import imagePath from '../constants/imagePath';
import { useNavigation } from '@react-navigation/native'
function HeaderCompo({
    onPressleft,
    style,
    iconColor = 'white'
}) {
    const navigation = useNavigation();
    return (
        <View style={{ ...styles.container, ...style }}>
            <TouchableOpacity onPress={!!onPressleft ? onPressleft : () => navigation.goBack()}>
                <Image style={{ tintColor: iconColor }} source={imagePath.icBack} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        height: moderateScaleVertical(52)
    }
})

export default HeaderCompo;