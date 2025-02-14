import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  StyleProp,
  Text,
} from 'react-native';
import {Colors} from '../constants';

interface IProps {
  isSkeleton?: boolean;
  title?: string | null;
  isSelected?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  index?: number;
  children?: React.ReactElement;
}

const styles = StyleSheet.create({
  containerInner: {
    paddingHorizontal: 16,
    height: 32,
    justifyContent: 'center',
    borderRadius: 5,
    marginEnd: 8,
    backgroundColor: Colors.GRAY,
  },
  containerInnerBack: {
    backgroundColor: Colors.MIDNIGHT,
  },
});

const IChip: React.FC<IProps> = ({
  title,
  isSelected = true,
  onPress,
  children,
  containerStyle,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={[
          styles.containerInner,
          isSelected && styles.containerInnerBack,
          containerStyle,
        ]}>
        {children}
        {!!title && <Text style={{color: Colors.WHITE}}>{title}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default IChip;
