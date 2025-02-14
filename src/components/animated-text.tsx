import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {Colors} from '../constants';

const AnimatedText = ({
  text,
  color = Colors.WHITE,
}: {
  text: string;
  color?: string;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Başlangıçta görünmez
  const translateYAnim = useRef(new Animated.Value(20)).current; // 20px aşağıda başlasın

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // 1 saniyede görünür olacak
      useNativeDriver: true,
    }).start();

    Animated.timing(translateYAnim, {
      toValue: 0,
      duration: 2000, // 1 saniyede yukarı kayacak
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.text,
          {
            color: color,
            opacity: fadeAnim,
            transform: [{translateY: translateYAnim}],
          },
        ]}>
        {text}
      </Animated.Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default AnimatedText;
