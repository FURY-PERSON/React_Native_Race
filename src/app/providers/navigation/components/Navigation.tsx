import {NavigationContainer} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {HomeNavigator} from '../routers/homeNavigator/homeNavigator';
import {RootStackParamList} from '../types/rootStackParamList';
import {navigationRef} from '../constants/navigationRef';
import {ProgressBar} from 'react-native-paper';
import {RacerNavigator} from '../routers/racerNavigator/racerNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer fallback={<ProgressBar />} ref={navigationRef}>
      <Stack.Navigator initialRouteName="HomeNavigator">
        <Stack.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{
            headerShown: false,
            ...TransitionPresets.DefaultTransition,
          }}
        />
        <Stack.Screen
          name="RacerNavigator"
          component={RacerNavigator}
          options={{
            headerShown: false,
            ...TransitionPresets.DefaultTransition,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
