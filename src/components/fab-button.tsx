import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Colors} from '../constants';

interface FabButtonProps {
  onPress: () => void;
}

const FabButton: React.FC<FabButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.7}>
      <Image
        source={require('../../assets/add.png')}
        style={styles.icon}
        tintColor={Colors.WHITE}
      />
    </TouchableOpacity>
  );
};

export default FabButton;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.MIDNIGHT,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
