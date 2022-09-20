import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {EpisodeButton as Button, Spinner} from '../components';
import {NavigationConstant, NavigationProps} from '../types';
import {useInfiniteQuery} from 'react-query';
const ViewWithSpinner = Spinner(View);
import {fetch} from '../util/fetch';
import ErrorScreen from './ErrorScreen';
import {IData} from '../types';
export default function EpisodeScreen({navigation}: NavigationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {data, isError, isLoading, fetchNextPage} = useInfiniteQuery<IData>(
    'episode',
    ({pageParam}) => {
      return fetch({url: `episode?page=${pageParam ?? 1}`});
    },
  );
  const pages = data?.pages ?? [];
  const hasNextPage = pages[pages.length - 1]?.info.next ?? undefined;
  const episodes = pages.flatMap(value => value.results);
  const incrementPage = () => {
    if (hasNextPage !== undefined) {
      fetchNextPage({pageParam: currentPage + 1});
      setCurrentPage(prev => prev + 1);
    }
  };
  if (isError) {
    return <ErrorScreen />;
  }
  return (
    <ViewWithSpinner isLoading={isLoading} style={styles.container}>
      <FlatList
        data={episodes}
        keyExtractor={item => JSON.stringify(item.id)}
        renderItem={({item}) => (
          <Button
            onPress={() =>
              navigation.navigate(NavigationConstant.EpisodeDetailScreen, {
                id: item.id,
                name: item.name,
              })
            }
            air_date={item.air_date}
            episode={item.episode}
            name={item.name}
          />
        )}
        onEndReachedThreshold={0.1}
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) {
            return;
          }
          incrementPage();
        }}
      />
    </ViewWithSpinner>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingBottom: 20},
});
