import {useState, useEffect} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

// Kelime tipini tanımla
interface Word {
  id: string;
  word: string;
  translation: string;
  learned: boolean;
  createdAt?: FirebaseFirestoreTypes.Timestamp;
}

// useWords Hook'u
export const useWords = (): Word[] => {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('kelimeler')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const wordsArray: Word[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Word, 'id'>),
        }));
        setWords(wordsArray);
      });

    return () => unsubscribe();
  }, []);

  return words;
};
