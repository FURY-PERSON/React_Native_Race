import {RacerCircuits} from '@/screens/RacerCircuits';
import {RacerInfo} from '@/screens/RacerInfo';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

export type RacerStackParamList = {
  RacerInfo: {racerId: string};
  RacerCircuits: {racerId: string};
};

const Stack = createStackNavigator<RacerStackParamList>();

export const RacerNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
    }}>
    <Stack.Screen
      name="RacerInfo"
      component={RacerInfo}
      options={{
        ...TransitionPresets.DefaultTransition,
        headerTitle: 'Racer Info',
      }}
    />
    <Stack.Screen
      name="RacerCircuits"
      component={RacerCircuits}
      options={{
        ...TransitionPresets.DefaultTransition,
        headerTitle: 'Racer`s circuits',
      }}
    />
  </Stack.Navigator>
);
