import {RacerCard, useGetRacerInfo} from '@/entities/Racer';
import {ErrorFormApiSlice} from '@/shared/ui/ErrorFromApiSlice/ErrorFormApiSlice';
import {memo, useCallback} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '@/app/providers/navigation';

interface RacerInfoProps {
  style?: StyleProp<ViewStyle>;
  racerId: string;
}

export const RacerInfo = memo((props: RacerInfoProps) => {
  const {style, racerId} = props;

  const navigation = useNavigation<RootNavigationProps>();

  const {
    data: racer,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetRacerInfo({
    racerId,
  });

  const onViewRacesPress = useCallback(() => {
    if (!racer) {
      return;
    }

    navigation.navigate('RacerNavigator', {
      screen: 'RacerCircuits',
      params: {
        racerId: racer.driverId,
      },
    });
  }, [navigation, racer]);

  const loading = isLoading || isFetching;

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator animating />
      </View>
    );
  }

  if (error) {
    return (
      <ErrorFormApiSlice
        error={error}
        fallbackMessage={'Can not fetch driver info. Try again.'}
        onRetryPress={refetch}
      />
    );
  }

  return (
    <RacerCard
      style={[style]}
      item={racer}
      onViewRacesPress={onViewRacesPress}
    />
  );
});
