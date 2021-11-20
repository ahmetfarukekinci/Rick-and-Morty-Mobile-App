import axios from 'axios';
import React from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import NavigationConstant from '../navigation';
const { height, width } = Dimensions.get('window');

export default function CharacterScreen({ navigation, route }) {
	const [ data, setData ] = React.useState(route.params.data);
	const navigateToLocationOrOrigin = async (url) => {
		try {
			const response = await axios(url);
			const data = response.data;
			navigation.navigate(NavigationConstant.LocationScreen, {
				data
			});
		} catch (error) {
			console.log('error', error);
		}
	};
	return (
		<View style={{ flex: 1, paddingTop: height * 0.05 }}>
			<Image source={{ uri: data.image }} resizeMode="contain" style={{ height: height * 0.3, width }} />
			<Text
				style={{
					fontSize: height * 0.02,
					marginTop: height * 0.02,
					marginLeft: width * 0.05,
					lineHeight: height * 0.05
				}}
			>
				Name of the Character: {data.name}
				{'\n'}
				Status: {data.status}
				{'\n'}
				Species: {data.species}
				{'\n'}
				Origin:{' '}
				<Text
					onPress={() => data.origin.url && navigateToLocationOrOrigin(data.origin.url)}
					style={{ fontSize: height * 0.02, textDecorationLine: 'underline', color: 'blue' }}
				>
					{data.origin.name}
				</Text>
				{'\n'}
				Location:{' '}
				<Text
					onPress={() => data.location.url && navigateToLocationOrOrigin(data.location.url)}
					style={{ fontSize: height * 0.02, textDecorationLine: 'underline', color: 'blue' }}
				>
					{data.location.name}
				</Text>
				{'\n'}
			</Text>
		</View>
	);
}
