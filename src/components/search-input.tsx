import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {Colors} from '../constants';

interface SearchInputProps extends TextInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  setValue,
  placeholder,
  style,
  ...rest
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={Colors.GRAY}
      style={[styles.input, style]}
      value={value}
      onChangeText={setValue}
      {...rest}
    />
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.WHITE,
    marginVertical: 20,
    padding: 10,
    borderRadius: 5,
    color: Colors.BLACK,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    elevation: 3,
  },
});
