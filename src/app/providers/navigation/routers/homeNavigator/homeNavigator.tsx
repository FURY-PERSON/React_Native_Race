import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

import {Racers} from '@/screens/Racers';

export type HomeStackParamList = {
  Racers: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Racers"
      component={Racers}
      options={{
        headerShown: false,
        ...TransitionPresets.DefaultTransition,
      }}
    />
  </Stack.Navigator>
);
