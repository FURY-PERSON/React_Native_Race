import {RacerInfoRouteProps} from '@/app/providers/navigation';
import {RacerInfo as RacerInfoCard} from '@/features/RacerInfo';
import {Screen} from '@/shared/ui/Screen/Screen';
import {useRoute} from '@react-navigation/native';
import {memo} from 'react';
import {styles} from './styles';

export const RacerInfo = memo(() => {
  const {params} = useRoute<RacerInfoRouteProps>();

  return (
    <Screen paddingHorizontal>
      <RacerInfoCard racerId={params.racerId} style={styles.card} />
    </Screen>
  );
});
