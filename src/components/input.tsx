import React from 'react';
import {Text, TextInput, StyleSheet, TextInputProps, View} from 'react-native';
import {Colors} from '../constants';

interface CustomComponentProps {
  text: string;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  placeholderTextColor?: string;
  inputStyle?: TextInputProps['style'];
  type?: TextInputProps['keyboardType'];
  editable?: TextInputProps['editable'];
  maxLength?: number;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  ref?: any;
  autoCapitalize?: TextInputProps['autoCapitalize'];
}

const Input: React.FC<CustomComponentProps> = ({
  text,
  value,
  setValue,
  placeholder,
  placeholderTextColor = Colors.GRAY, // Default placeholder text color
  inputStyle,
  type,
  editable,
  maxLength,
  secureTextEntry,
  autoFocus,
  ref,
  autoCapitalize,
}) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, marginVertical: 10}}>
      <Text style={styles.text}>{text}</Text>
      <TextInput
        keyboardType={type}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={[styles.inputSettings, inputStyle]}
        editable={editable}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        autoFocus={autoFocus}
        ref={ref}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputSettings: {
    color: Colors.BLACK,
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 15,
    borderRadius: 10,
    marginTop: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  text: {
    marginHorizontal: 5,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
});

export default Input;
