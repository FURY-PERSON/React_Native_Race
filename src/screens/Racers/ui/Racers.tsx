import {RacersTable} from '@/widgets/RacersTable';
import {memo} from 'react';

import {Screen} from '@/shared/ui/Screen/Screen';

export const Racers = memo(() => {
  return (
    <Screen safeArea paddingHorizontal={false}>
      <RacersTable />
    </Screen>
  );
});
