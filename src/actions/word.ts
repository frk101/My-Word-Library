import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const addWord = async (word: string, translation: string) => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    return;
  }

  await firestore().collection('kelimeler').add({
    userId,
    word,
    translation,
    learned: false,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};
export const toggleLearned = async (wordId: string, learned: boolean) => {
  await firestore().collection('kelimeler').doc(wordId).update({
    learned: !learned,
  });
};
