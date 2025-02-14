import Toast from 'react-native-toast-message';

export const handleAuthError = (error: any) => {
  const errorMessages: Record<string, string> = {
    'auth/invalid-email': 'Invalid email address!',
    'auth/user-disabled': 'This user has been disabled.',
    'auth/user-not-found': 'No user found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/email-already-in-use': 'This email address is already in use.',
    'auth/weak-password': 'Weak password, please choose a stronger one.',
    'auth/network-request-failed': 'Check your internet connection.',
  };

  const message =
    errorMessages[error.code] || `Bilinmeyen bir hata oluştu: ${error.message}`;
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: message,
  });
};

export default handleAuthError;
