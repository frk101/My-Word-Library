/* eslint-disable react-native/no-inline-styles */
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useWords, Word} from '../../hooks/useWords';
import {Colors, Enums, LocalData} from '../../constants';
import {IChipSelector, SearchInput} from '../../components';
import FabButton from '../../components/fab-button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamsList} from '../../navigation/types';
import {deleteWord, toggleLearned} from '../../actions/word';
import {Accordion} from '../../components/accordion';
import {speakWord} from '../../utils/tts';
type Props = NativeStackScreenProps<MainStackParamsList, 'WordList'>;

const WordListScreen: React.FC<Props> = ({navigation}) => {
  const words = useWords();
  const [selectedIds, setSelectedIds] = useState<number[]>([-1]);
  const [searchWord, setSearchWord] = useState<string>('');
  const [filteredWorks, setFilteredWorks] = useState<Word[]>([]);
  const [, setPlayingWordId] = useState<string | null>(null);

  const handleDeleteWord = async (wordId: string) => {
    await deleteWord(wordId);
  };
  const checktoggleLearned = async (wordId: string, learned: boolean) => {
    await toggleLearned(wordId, learned);
  };
  const handleUpdateWord = (word: Word) => {
    navigation.navigate('WordForm', {word});
  };
  const handlePlay = (wordId: string, word: string, language: 'en' | 'tr') => {
    setPlayingWordId(wordId);
    speakWord(word, language);
  };

  useEffect(() => {
    let updatedWorks = words;
    const selectedFilter = LocalData.INITIAL_DATA.find(
      d => d.id === selectedIds[0],
    )?.name;
    if (selectedFilter === Enums.PRIORITY.LEARNED) {
      updatedWorks = updatedWorks.filter(word => word.learned);
    } else if (selectedFilter === Enums.PRIORITY.PROGRESS) {
      updatedWorks = updatedWorks.filter(word => !word.learned);
    }
    if (searchWord) {
      updatedWorks = updatedWorks.filter(word =>
        word.english.toLowerCase().includes(searchWord.toLowerCase()),
      );
    }

    setFilteredWorks(updatedWorks);
  }, [selectedIds, words, searchWord]);

  const renderWordList = ({item}: {item: Word}) => {
    return (
      <Accordion
        handleDeleteWord={handleDeleteWord}
        checktoggleLearned={checktoggleLearned}
        english={item.english}
        turkish={item.turkish}
        wordId={item.id}
        checked={item.learned}
        item={item}
        handleUpdateWord={handleUpdateWord}
        handlePlay={handlePlay}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <SearchInput
          value={searchWord}
          setValue={setSearchWord}
          placeholder="Search Word"
        />
        <IChipSelector
          selectedIds={selectedIds}
          data={LocalData.INITIAL_DATA}
          onSelect={(id: number) => {
            setSelectedIds([id]);
          }}
          onReset={() => {
            setSelectedIds([-1]);
          }}
        />
        <FlatList
          style={{marginTop: 20}}
          data={filteredWorks}
          keyExtractor={item => item.id}
          renderItem={renderWordList}
        />
      </View>
      <FabButton
        onPress={() => {
          navigation.navigate('WordForm', {word: undefined});
        }}
      />
    </SafeAreaView>
  );
};

export default WordListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  view: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  renderWordContainer: {
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    elevation: 3,
    padding: 10,
  },
});
