import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AnimatedText} from '../components';
import {Colors} from '../constants';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {navigation} from '../utils';

const LoadingScreen: React.FC = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  function onAuthStateChanged(authUser: FirebaseAuthTypes.User | null) {
    setUser(authUser);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!initializing) {
      if (user) {
        setTimeout(() => {
          navigation.reset({index: 0, routes: [{name: 'MainStack'}]});
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.reset({index: 0, routes: [{name: 'AuthStack'}]});
        }, 2000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, initializing, navigation]);

  if (initializing) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AnimatedText text="Welcome to My App!" />
      <ActivityIndicator style={styles.indicator} size="large" />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MIDNIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    marginTop: 40,
  },
});
