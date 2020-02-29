import styled from 'styled-components/native';
import React, { useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from '../common/Icon';

const Wrapper = styled.View`
  height: 70px;
  border-radius: 35px;
  align-items: center;
  flex-direction: row;
  position: absolute;
  bottom: ${({ insetBottom }) => insetBottom + 8}px;
  left: 16px;
  right: 16px;
  shadow-color: #000000;
  shadow-offset: 0 0;
  shadow-opacity: 0.38;
  shadow-radius: 20px;
`;

const IconWrapper = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const TabIndicatorWrapper = styled(Animated.View)`
  align-items: center;
  position: absolute;
  bottom: 10px;
`;

const TabIndicator = styled.View`
  height: 4px;
  width: 50%;
  border-radius: 2px;
`;

const TabbarComponent = ({ props }) => {
  const insets = useSafeArea();
  const { colors } = useTheme();
  const [switchAnim] = useState(new Animated.Value(0))
  const { width } = Dimensions.get('window');

  const switchTab = (tabName, index) => {
    Animated.spring(
      switchAnim,
      {
        toValue: index,
        duration: 250,
      }
    ).start();
    props.navigation.navigate(tabName);
  }

  const tabbarWidth = width - 32;

  const indicatorPosition = switchAnim.interpolate({
    inputRange: [0, props.state.routeNames.length - 1],
    outputRange: [0, tabbarWidth - tabbarWidth / 4],
  });

  return (
    <Wrapper style={{ backgroundColor: colors.secondary }} insetBottom={insets.bottom}>
      {props.state.routeNames.map((route, index) => (
        <TouchableWithoutFeedback key={route} onPress={() => switchTab(route, index)}>
          <IconWrapper style={{ width: tabbarWidth / 4 }} >
            <Icon name={route} />
          </IconWrapper>
        </TouchableWithoutFeedback>
      ))}
      <TabIndicatorWrapper style={{ left: indicatorPosition, width: tabbarWidth / 4 }}>
        <TabIndicator style={{ backgroundColor: colors.accent }} />
      </TabIndicatorWrapper>
    </Wrapper>
  )
}

const Tabbar: React.FC = routeProps => <TabbarComponent props={routeProps} />;

export default Tabbar;