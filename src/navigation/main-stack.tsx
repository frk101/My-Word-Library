/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '../screens';
import {MainStackParamsList} from './types';

const Stack = createNativeStackNavigator<MainStackParamsList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WordList"
        component={Screens.Main.WordListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WordForm"
        component={Screens.Main.WordFormScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
