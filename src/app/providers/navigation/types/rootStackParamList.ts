import {NavigatorScreenParams} from '@react-navigation/native';
import {HomeStackParamList} from '../routers/homeNavigator/homeNavigator';
import {RacerStackParamList} from '../routers/racerNavigator/racerNavigator';

export type RootStackParamList = {
  HomeNavigator: NavigatorScreenParams<HomeStackParamList>;
  RacerNavigator: NavigatorScreenParams<RacerStackParamList>;
};
