import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Colors} from '../constants';
import CheckBox from './checkbox';
import {Word} from '../hooks/useWords';

type Props = {
  english: string;
  turkish: string;
  wordId: string;
  checked: boolean;
  handleDeleteWord: (wordId: string) => void;
  checktoggleLearned: (wordId: string, learned: boolean) => void;
  item: Word;
  handleUpdateWord: (word: Word) => void;
  handlePlay: (wordId: string, word: string, language: 'en' | 'tr') => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const COLLAPSED_HEIGHT = 50;

const baseSpringConfig = {
  mass: 1,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
  reduceMotion: ReduceMotion.System,
};

const getSpringConfig = (isExpanding: boolean) => ({
  ...baseSpringConfig,
  damping: isExpanding ? 10 : 15,
  stiffness: isExpanding ? 100 : 120,
});

export const Accordion: FC<Props> = ({
  english,
  turkish,
  wordId,
  checked,
  handleDeleteWord,
  checktoggleLearned,
  item,
  handleUpdateWord,
  handlePlay,
}) => {
  const fullHeight = useRef(0);
  const progress = useSharedValue(0);
  const height = useSharedValue<number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(checked);

  const handleAccordionPress = () => {
    const isExpanding = progress.value === 0;
    setOpen(isExpanding);
    progress.value = withSpring(
      isExpanding ? 1 : 0,
      getSpringConfig(isExpanding),
    );
    height.value = withSpring(
      isExpanding ? fullHeight.current : COLLAPSED_HEIGHT,
      getSpringConfig(isExpanding),
    );
  };

  const accordionAnimatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));
  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: open ? '90deg' : '0deg'}],
  }));

  const handleOnLayout = (event: LayoutChangeEvent) => {
    if (!fullHeight.current) {
      fullHeight.current = Math.ceil(event.nativeEvent.layout.height);
      height.value = COLLAPSED_HEIGHT;
    }
  };

  return (
    <AnimatedPressable
      onLayout={handleOnLayout}
      style={[styles.container, accordionAnimatedStyle]}
      onPress={handleAccordionPress}>
      <Animated.View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{english?.toLocaleUpperCase()}</Text>
          <Animated.Image
            source={require('../../assets/right-arrow.png')}
            style={[styles.icon, iconAnimatedStyle]}
          />
        </View>
        <View style={styles.voiceView}>
          <Text style={styles.description}>
            🇹🇷 {turkish.toLocaleUpperCase()}
          </Text>

          <TouchableOpacity
            onPress={() => handlePlay(item.id, item.turkish, 'tr')}>
            <Text style={{color: 'blue'}}>🔊 TR</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={styles.voiceView}>
          <Text style={styles.description}>
            🇬🇧 {english.toLocaleUpperCase()}
          </Text>

          <TouchableOpacity
            onPress={() => handlePlay(item.id, item.english, 'en')}>
            <Text style={{color: 'blue'}}>🔊 EN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <CheckBox
          label="I learned this word"
          isChecked={isChecked}
          onToggle={() => {
            checktoggleLearned(wordId, isChecked);
            setIsChecked(!isChecked);
          }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              handleDeleteWord(wordId);
            }}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => handleUpdateWord(item)}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.GRAY,
    marginVertical: 10,
  },
  contentContainer: {
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: Colors.MIDNIGHT,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    tintColor: Colors.MIDNIGHT,
    width: 20,
    height: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  description: {
    color: Colors.MIDNIGHT,
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.GRAY,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteButton: {
    width: '40%',
    backgroundColor: Colors.RED,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  updateButton: {
    width: '40%',
    backgroundColor: Colors.MIDNIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  voiceView: {flexDirection: 'row', justifyContent: 'space-between'},
});
