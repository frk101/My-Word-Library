import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {Input, CustomButton, AnimatedImage} from '../../components';
import {Colors} from '../../constants';
import {MainStackParamsList} from '../../navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {addWord} from '../../actions/word';

const {width} = Dimensions.get('window');
type Props = NativeStackScreenProps<MainStackParamsList, 'WordForm'>;

const WordFormScreen: React.FC<Props> = ({route}) => {
  const {word} = route.params || {};
  const [turkish, setTurkish] = useState(word?.turkish || '');
  const [english, setEnglish] = useState(word?.english || '');
  const handleWord = async () => {
    try {
      await addWord(turkish, english);
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <AnimatedImage
              size={width / 3}
              source={require('../../../assets/add.png')}
              style={{tintColor: Colors.MIDNIGHT}}
            />
            <Input
              text={'Turkish'}
              value={turkish}
              setValue={setTurkish}
              placeholder={'Turkish Word'}
            />
            <Input
              text={'English'}
              value={english}
              setValue={setEnglish}
              placeholder={'English Word'}
            />
            <CustomButton
              onPress={handleWord}
              title={word ? 'Update Word' : 'Add Word'}
              style={styles.btn}
              disabled={!english || !turkish}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default WordFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  scrollContainer: {
    flex: 1,
  },
  image: {
    width: width / 2,
    height: width / 2,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 40,
  },
  btn: {marginVertical: 20},
  content: {paddingHorizontal: 20, paddingTop: 50},
  text: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginHorizontal: 10,
    textDecorationLine: 'underline',
    color: Colors.MIDNIGHT,
  },
});
