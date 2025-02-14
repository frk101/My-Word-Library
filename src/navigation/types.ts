import {Word} from '../hooks/useWords';

export type RootStackParamList = {
  MainStack: undefined;
  AuthStack: undefined;
  Loading: undefined;
};

export type AuthStackParamsList = {
  Login: undefined;
  Register: undefined;
};

export type MainStackParamsList = {
  WordList: undefined;
  Profile: undefined;
  WordForm: {word?: Word};
};
