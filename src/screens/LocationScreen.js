import axios from 'axios';
import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { ImageButton, Spinner } from '../components';
import NavigationConstant from '../navigation';
const { height, width } = Dimensions.get('window');
const ViewWithSpinner = Spinner(View);
export default function LocationScreen({ navigation, route }) {
	const [ data, setData ] = React.useState(route.params.data);
	const [ characters, setCharacters ] = React.useState([]);
	const [ loading, setLoading ] = React.useState(false);
	React.useEffect(async () => {
		getCharacters();
	}, []);
	const getCharacters = async () => {
		try {
			setLoading(true);
			const response = await axios.all(data.residents.map((arg) => axios.get(arg)));
			setCharacters(response);
			setLoading(false);
		} catch (error) {
			console.log('error', error);
			setLoading(false);
		}
	};
	return (
		<ViewWithSpinner isLoading={loading} style={{ flex: 1 }}>
			<FlatList
				data={characters}
				keyExtractor={(item) => JSON.stringify(item.data.id)}
				renderItem={({ item }) => (
					<ImageButton
						onPress={() => navigation.push(NavigationConstant.CharacterScreen, { data: item.data })}
						title={item.data.name}
						uri={item.data.image}
					/>
				)}
				numColumns={3}
				columnWrapperStyle={{
					flexGrow: 1,
					justifyContent: 'space-around',
					alignItems: 'center',
					marginTop: height * 0.005,
					paddingBottom: height * 0.05
				}}
				ListHeaderComponent={
					<Text style={{ fontSize: height * 0.02, lineHeight: height * 0.05, marginLeft: width * 0.05 }}>
						Name: {data.name}
						{'\n'}
						Type: {data.type}
						{'\n'}
						Dimension: {data.dimension}
						{'\n'}
						Residents:
					</Text>
				}
			/>
		</ViewWithSpinner>
	);
}
