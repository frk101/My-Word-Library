import auth from '@react-native-firebase/auth';
import {handleAuthError} from '../utils';
import navigate from '../utils/navigate';
import {Platform, PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const register = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    handleAuthError(error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();
      console.log(token);
    }
    navigate.reset({index: 0, routes: [{name: 'MainStack'}]});

    return userCredential.user;
  } catch (error) {
    handleAuthError(error);
  }
};

export const logout = async () => {
  await auth()
    .signOut()
    .then(() => navigate.reset({index: 0, routes: [{name: 'AuthStack'}]}));
};
