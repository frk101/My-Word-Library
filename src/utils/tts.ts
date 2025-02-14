import Tts from 'react-native-tts';

// TTS Başlangıç Ayarları
export const initTTS = () => {
  Tts.setDefaultLanguage('en-US'); // Varsayılan dil İngilizce
  Tts.setDefaultRate(0.5, true); // iOS için ikinci parametre `true`
  Tts.setDefaultPitch(1.0);
};

// İngilizce ve Türkçe seslendirme için uygun dili seçerek konuşmayı başlat
export const speakWord = (word: string, language: 'en' | 'tr') => {
  if (language === 'en') {
    Tts.setDefaultLanguage('en-US'); // İngilizce aksan
    Tts.speak(word, {
      iosVoiceId: 'com.apple.ttsbundle.Moira-compact', // iOS özel sesi
      rate: 0.5,
      androidParams: {
        KEY_PARAM_PAN: -1, // Sol hoparlör
        KEY_PARAM_VOLUME: 0.5, // Ses seviyesi
        KEY_PARAM_STREAM: 'STREAM_MUSIC', // Müzik ses kanalı
      },
    });
  } else {
    Tts.setDefaultLanguage('tr-TR'); // Türkçe aksan
    Tts.speak(word, {
      iosVoiceId: 'com.apple.ttsbundle.Yelda-compact', // iOS Türkçe sesi (Yelda)
      rate: 0.5,
      androidParams: {
        KEY_PARAM_PAN: 1, // Sağ hoparlör
        KEY_PARAM_VOLUME: 0.5,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  }
};
