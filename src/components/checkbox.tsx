import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {Colors} from '../constants';

interface CheckBoxProps {
  label?: string;
  isChecked: boolean;
  onToggle: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({label, isChecked, onToggle}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      <View style={[styles.box, isChecked && styles.checkedBox]}>
        {isChecked && <Text style={styles.checkMark}>✔</Text>}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkMark: {
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: Colors.MIDNIGHT,
    fontWeight: 'bold',
  },
});

export default CheckBox;
