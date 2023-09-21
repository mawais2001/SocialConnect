import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import colors from '../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../styles/responsiveSize';
import fontFamily from '../styles/fontFamily';

function TextInputCompo({
  value = '',
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  onPressSecure = () => {},
  secureText = '',
  inputStyle = {},
  textStyle = {},
  placeholderTextColor = colors.whiteColorOpacity50,
  clearIcon = '',
  onPressClear = () => {},
  ...props
}) {
  return (
    <View style={{...styles.inputStyle, ...inputStyle}}>
      <TextInput
        style={{...styles.textStyle, ...textStyle}}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        onPressSecure={onPressSecure}
        {...props}
      />
      {secureText ? (
        <Text style={{color: 'white'}} onPress={onPressSecure}>
          {' '}
          {secureText}{' '}
        </Text>
      ) : null}
      {clearIcon.length > 0 ? (
        <Text onPress={onPressClear} style={{color: 'white'}}>
          {' '}
          {clearIcon}{' '}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    height: moderateScale(48),
    justifyContent: 'space-between',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(16),
    alignItems: 'center',
    backgroundColor: colors.gray2,
    marginBottom: moderateScaleVertical(16),
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: textScale(16),
    fontFamily: fontFamily.bold,
    flex: 1,
    color: colors.whiteColor,
  },
});

export default TextInputCompo;
