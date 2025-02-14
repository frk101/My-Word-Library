/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '../screens';
import {MainStackParamsList} from './types';

const Stack = createNativeStackNavigator<MainStackParamsList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WordList" component={Screens.Main.WordListScreen} />
      <Stack.Screen name="WordForm" component={Screens.Main.WordFormScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
