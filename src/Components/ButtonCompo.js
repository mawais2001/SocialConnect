import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../styles/responsiveSize';

function ButtonCompo({
  title = '',
  style = {},
  onPress = () => {},
  textStyle = {},
  leftImg = null,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{...styles.container, ...style}}
      onPress={onPress}>
      {!!leftImg ? <Image source={leftImg} /> : <View />}
      <Text style={{...styles.textStyle, ...textStyle}}> {title} </Text>
      <View />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.redColor,
    height: moderateScaleVertical(48),
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
  },
  textStyle: {
    color: colors.whiteColor,
    fontFamily: fontFamily.medium,
    fontSize: textScale(16),
  },
});

export default ButtonCompo;
