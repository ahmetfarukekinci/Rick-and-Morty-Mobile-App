import React from 'react';
import {View, Text, FlatList, Dimensions, StyleSheet} from 'react-native';
import {ImageButton, Spinner} from '../components';
import {useQuery} from 'react-query';
import {fetch} from '../util/fetch';
import {ICharacter, IEpisode} from '../types';
import {NavigationProps, NavigationConstant} from '../types';
const {height, width} = Dimensions.get('window');
const ViewWithSpinner = Spinner(View);
export default function EpisodeDetailScreen({
  navigation,
  route,
}: NavigationProps) {
  const episodeID = route.params.id;
  const {isLoading, data} = useQuery<IEpisode>(['episode', episodeID], () =>
    fetch({url: `episode/${episodeID}`}),
  );
  const episodeData = data ?? {name: '', episode: '', air_date: ''};
  const charactersIndexes =
    data?.characters.map(value => {
      const characterInitialIndex = value.lastIndexOf('character/') + 10;
      const valueLenght = value.length;
      const characterIndex = value.slice(characterInitialIndex, valueLenght);
      return characterIndex;
    }) ?? [];
  const characterIndexesWithComma = charactersIndexes?.join(',');
  const {data: characters} = useQuery<ICharacter[]>(
    ['character', ...charactersIndexes],
    () => fetch({url: `character/${characterIndexesWithComma}`}),
    {enabled: !!characterIndexesWithComma},
  );

  const ListHeaderComponent = () => (
    <Text style={styles.text}>
      Name of the Episode: {episodeData.name}
      {'\n'}
      Episode: {episodeData.episode}
      {'\n'}
      Air Date: {episodeData.air_date}
      {'\n'}
      Characters:
    </Text>
  );
  return (
    <ViewWithSpinner isLoading={isLoading} style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        data={characters}
        keyExtractor={item => JSON.stringify(item.id)}
        renderItem={({item}) => (
          <ImageButton
            onPress={() =>
              navigation.navigate(NavigationConstant.CharacterScreen, {
                id: item.id,
              })
            }
            title={item.name}
            uri={item.image}
          />
        )}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapperStyle}
      />
    </ViewWithSpinner>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1},
  columnWrapperStyle: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: height * 0.005,
    paddingBottom: height * 0.05,
  },
  text: {
    fontSize: height * 0.02,
    lineHeight: height * 0.05,
    marginLeft: width * 0.05,
  },
});
