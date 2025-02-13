import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../constants';

type CustomButtonProps = {
  loading?: boolean;
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  padding?: number;
  width?: number | string;
  height?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title = 'Button',
  onPress = () => {},
  disabled = false,
  backgroundColor = Colors.MIDNIGHT,
  textColor = Colors.WHITE,
  borderRadius = 8,
  padding = 12,
  width = '100%',
  height = 50,
  style = {},
  textStyle = {},
  loading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? Colors.GRAY : backgroundColor,
          borderRadius,
          padding,
          width,
          height,
        } as ViewStyle,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.text, {color: textColor}, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  } as TextStyle,
});

export default CustomButton;
