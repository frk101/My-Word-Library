import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../constants';
import {logout} from '../../actions/auth';

const LogoutBtn = () => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {}
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Image
        source={require('../../../assets/logout.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default LogoutBtn;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',

    width: 30,
    height: 30,
    tintColor: Colors.MIDNIGHT,
  },
});
