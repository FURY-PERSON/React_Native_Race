import {RacerCircuitsRouteProps} from '@/app/providers/navigation';
import {Screen} from '@/shared/ui/Screen/Screen';
import {RacerCircuitsTable} from '@/widgets/RacerCircuitsTable';
import {useRoute} from '@react-navigation/native';
import {memo} from 'react';

export const RacerCircuits = memo(() => {
  const {params} = useRoute<RacerCircuitsRouteProps>();
  return (
    <Screen paddingHorizontal={false}>
      <RacerCircuitsTable racerId={params.racerId} />
    </Screen>
  );
});
