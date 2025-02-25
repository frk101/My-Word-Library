import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {Colors} from '../constants';

interface Props {
  size?: number;
}

const CrossIcon: React.FC<Props> = ({size = 24}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G
        clipPath="url(#a)"
        stroke={Colors.BLACK}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M18 6 6 18M6 6l12 12" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill={Colors.BLACK} d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default CrossIcon;
