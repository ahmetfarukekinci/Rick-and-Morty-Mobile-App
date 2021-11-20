import React, { useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { EpisodeButton as Button, Spinner } from '../components/';
import NavigationConstant from '../navigation';
import axios from 'axios';
const { height } = Dimensions.get('window');
const ViewWithSpinner = Spinner(View);
export default function EpisodeScreen({ navigation }) {
	const [ page, setPage ] = useState(1);
	const [ info, setInfo ] = useState({});
	const [ data, setData ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	React.useEffect(
		() => {
			getEpisodes();
		},
		[ page ]
	);
	const getEpisodes = async () => {
		try {
			setLoading(true);
			const response = await axios(`https://rickandmortyapi.com/api/episode?page=${page}`);
			const { info, results } = response.data;
			setInfo(info);
			data.push(...results);
			setLoading(false);
		} catch (error) {
			console.log('error', error);
			console.log('error', error.response);
			setLoading(false);
		}
	};
	const incrementPage = () => {
		const { pages, next } = info;
		if (page < pages && next !== null) {
			setPage(page + 1);
		}
	};
	return (
		<ViewWithSpinner isLoading={loading} style={{ flex: 1, height: height }}>
			<FlatList
				data={data}
				keyExtractor={(item) => JSON.stringify(item.id)}
				renderItem={({ item }) => (
					<Button
						onPress={() => navigation.navigate(NavigationConstant.EpisodeDetailScreen, { data: item })}
						title={{ air_date: item.air_date, episode: item.episode, name: item.name }}
					/>
				)}
				onEndReachedThreshold={0.1}
				onEndReached={(distanceFromEnd) => {
					if (distanceFromEnd < 0) return;
					incrementPage();
				}}
			/>
		</ViewWithSpinner>
	);
}
