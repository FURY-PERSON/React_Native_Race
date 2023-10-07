import {ReactNode, useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {View} from 'react-native';

interface ScreenProps {
  children: ReactNode;
  safeArea?: boolean;
  paddingHorizontal?: boolean;
}

export const Screen = (props: ScreenProps) => {
  const {children, safeArea = false, paddingHorizontal} = props;

  const innerStyles = useMemo(
    () => ({
      paddingHorizontal: paddingHorizontal ? 12 : 0,
    }),
    [paddingHorizontal],
  );

  console.log('innerStyles', innerStyles);

  if (!safeArea) {
    return <View style={[styles.screen, innerStyles]}>{children}</View>;
  }

  return (
    <SafeAreaView style={[styles.screen, innerStyles]}>{children}</SafeAreaView>
  );
};
