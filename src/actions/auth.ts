import auth from '@react-native-firebase/auth';
import {handleAuthError} from '../utils';
import navigate from '../utils/navigate';

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
    navigate.reset({index: 0, routes: [{name: 'MainStack'}]});
    return userCredential.user;
  } catch (error) {
    handleAuthError(error);
  }
};

export const logout = async () => {
  await auth().signOut();
};
