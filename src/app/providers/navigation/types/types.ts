import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './rootStackParamList';
import {HomeStackParamList} from '../routers/homeNavigator/homeNavigator';
import {RacerStackParamList} from '../routers/racerNavigator/racerNavigator';
import {RouteProp} from '@react-navigation/native';

export type RootNavigationProps = StackNavigationProp<RootStackParamList>;

// home navigator
export type RacersScreenProps = StackNavigationProp<
  HomeStackParamList,
  'Racers'
>;
export type RacersRouteProp = RouteProp<HomeStackParamList, 'Racers'>;

// racer navigator
export type RacerInfoScreenProps = StackNavigationProp<
  RacerStackParamList,
  'RacerInfo'
>;
export type RacerInfoRouteProps = RouteProp<RacerStackParamList, 'RacerInfo'>;

export type RacerCircuitsScreenProps = StackNavigationProp<
  RacerStackParamList,
  'RacerCircuits'
>;
export type RacerCircuitsRouteProps = RouteProp<
  RacerStackParamList,
  'RacerCircuits'
>;

export type GodParamList = RootStackParamList &
  HomeStackParamList &
  RacerStackParamList;

// use this just when you need access to different navigation-lines
export type GodNavigationProps = StackNavigationProp<GodParamList>;
