import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const addWord = async (turkish: string, english: string) => {
  console.log('Kelime ekleniyor...');
  const userId = auth().currentUser?.uid;
  console.log('User ID:', userId);

  if (!userId) {
    console.log('Kullanıcı bulunamadı.');
    return;
  }

  try {
    await firestore().collection('words').add({
      userId,
      turkish,
      english,
      learned: false,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    console.log('Kelime başarıyla eklendi!');
  } catch (error) {
    console.error('Kelime ekleme hatası:', error);
  }
};

export const toggleLearned = async (wordId: string, learned: boolean) => {
  try {
    await firestore().collection('words').doc(wordId).update({
      learned: !learned,
    });
    console.log(`Kelimenin öğrenildi durumu değiştirildi: ${!learned}`);
  } catch (error) {
    console.error('Kelime durumu güncellenirken hata oluştu:', error);
  }
};

export const deleteWord = async (wordId: string) => {
  try {
    await firestore().collection('words').doc(wordId).delete();
    console.log('Kelime başarıyla silindi:', wordId);
  } catch (error) {
    console.error('Kelime silme hatası:', error);
  }
};
