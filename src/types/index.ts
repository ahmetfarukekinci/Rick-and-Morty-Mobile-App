import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ViewStyle} from 'react-native';
export interface IInfo {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

export interface IEpisodeBase {
  name: string;
  air_date: string;
  episode: string;
}
export interface IEpisodeButton extends IEpisodeBase {
  air_date: string;
  episode: string;
  name: string;
  onPress: () => void;
  style?: ViewStyle;
}
export interface IEpisode extends IEpisodeBase {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: Date;
}
export interface IData {
  info: IInfo;
  results: IEpisode[];
}
export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ILocation;
  location: ILocation;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface ILocation {
  name: string;
  url: string;
}
export enum NavigationConstant {
  EpisodeScreen = 'EpisodeScreen',
  EpisodeDetailScreen = 'EpisodeDetailScreen',
  CharacterScreen = 'CharacterScreen',
  LocationScreen = 'LocationScreen',
}
export type RootStackParamList = {
  [NavigationConstant.EpisodeScreen]: undefined;
  [NavigationConstant.EpisodeDetailScreen]: {
    id: number;
    name: string;
  };
  [NavigationConstant.CharacterScreen]: {
    id: number;
  };
};
export type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  keyof RootStackParamList
>;
