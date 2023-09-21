import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../styles/colors';

function WrapperContainer({
    style = {},
    children
}) {
    return (
        <View style={{ ...styles.container, ...style }}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.themeColor
    }
})

export default WrapperContainer;