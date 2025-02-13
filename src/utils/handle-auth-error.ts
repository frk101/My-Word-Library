import Toast from 'react-native-toast-message';

export const handleAuthError = (error: any) => {
  const errorMessages: Record<string, string> = {
    'auth/invalid-email': 'Geçersiz e-posta adresi!',
    'auth/user-disabled': 'Bu kullanıcı devre dışı bırakılmış.',
    'auth/user-not-found': 'Böyle bir kullanıcı bulunamadı.',
    'auth/wrong-password': 'Şifre yanlış.',
    'auth/email-already-in-use': 'Bu e-posta adresi zaten kullanılıyor.',
    'auth/weak-password': 'Şifre çok zayıf, lütfen daha güçlü bir şifre seçin.',
    'auth/network-request-failed': 'İnternet bağlantınızı kontrol edin.',
  };

  const message =
    errorMessages[error.code] || `Bilinmeyen bir hata oluştu: ${error.message}`;
  Toast.show({
    type: 'error',
    text1: 'Hata',
    text2: message,
  });
};

export default handleAuthError;
