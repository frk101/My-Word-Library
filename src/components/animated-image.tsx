import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  ImageStyle,
  Keyboard,
  StyleSheet,
} from 'react-native';

const {width} = Dimensions.get('window');

type AnimatedImageProps = {
  source: any;
  style?: Animated.WithAnimatedObject<ImageStyle>;
  size?: number;
};

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  source,
  style = {},
  size = width / 2,
}) => {
  const imageSize = useRef(new Animated.Value(size)).current;

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(imageSize, {
        toValue: size / 2,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(imageSize, {
        toValue: size,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [imageSize, size]);

  return (
    <Animated.Image
      source={source}
      style={[styles.image, {width: imageSize, height: imageSize}, style]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 40,
  },
});

export default AnimatedImage;
