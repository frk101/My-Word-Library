/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '../screens';
import {MainStackParamsList} from './types';
import LogoutBtn from './widgets/logout-btn';

const Stack = createNativeStackNavigator<MainStackParamsList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WordList"
        component={Screens.Main.WordListScreen}
        options={{
          headerRight: () => <LogoutBtn />,
        }}
      />
      <Stack.Screen name="WordForm" component={Screens.Main.WordFormScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
