/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '../screens';
import {AuthStackParamsList} from './types';

const Stack = createNativeStackNavigator<AuthStackParamsList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Screens.Auth.LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Screens.Auth.RegisterScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
