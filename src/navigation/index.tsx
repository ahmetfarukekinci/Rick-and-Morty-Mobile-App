import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EpisodeScreen from '../screens/EpisodeScreen';
import EpisodeDetailScreen from '../screens/EpisodeDetailScreen';
import CharacterScreen from '../screens/CharacterScreen';
import {NavigationConstant, RootStackParamList} from '../types';

const {Screen, Navigator} = createNativeStackNavigator<RootStackParamList>();
function Router() {
  const opitons = ({route}) => ({title: route.params.name});
  return (
    <NavigationContainer>
      <Navigator initialRouteName={NavigationConstant.EpisodeScreen}>
        <Screen
          options={{headerTitle: 'Episodes'}}
          name={NavigationConstant.EpisodeScreen}
          component={EpisodeScreen}
        />
        <Screen
          name={NavigationConstant.EpisodeDetailScreen}
          component={EpisodeDetailScreen}
          options={opitons}
        />
        <Screen
          name={NavigationConstant.CharacterScreen}
          component={CharacterScreen}
          options={opitons}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default Router;
