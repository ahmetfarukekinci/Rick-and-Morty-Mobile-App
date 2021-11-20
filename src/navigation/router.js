import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from './index';
import EpisodeScreen from '../screens/EpisodeScreen';
import EpisodeDetailScreen from '../screens/EpisodeDetailScreen';
import CharacterScreen from '../screens/CharacterScreen';
import LocationScreen from '../screens/LocationScreen';
const Stack = createNativeStackNavigator();

function Router() {
	const opitons = ({ route }) => ({ title: route.params.data.name });
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={Constants.EpisodeScreen}>
				<Stack.Screen
					options={{ headerTitle: 'Episodes' }}
					name={Constants.EpisodeScreen}
					component={EpisodeScreen}
				/>
				<Stack.Screen name={Constants.EpisodeDetailScreen} component={EpisodeDetailScreen} options={opitons} />
				<Stack.Screen name={Constants.CharacterScreen} component={CharacterScreen} options={opitons} />
				<Stack.Screen name={Constants.LocationScreen} component={LocationScreen} options={opitons} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Router;
