import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

import {RootStackParamList} from '../navigation/types';

// Sayfaya yönlendiren fonksiyon
export const navigate = (name: keyof RootStackParamList, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

// Navigation referansını oluştur
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Sayfa sıfırlama fonksiyonu
export const reset = (state: any) => {
  if (navigationRef.isReady()) {
    navigationRef.reset(state);
  }
};
export const replace = (name: keyof RootStackParamList, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
};

export default {
  navigate,
  reset,
  replace,
};
