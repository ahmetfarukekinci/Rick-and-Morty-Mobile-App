import React from 'react';
import {View, Text, Dimensions, Image, StyleSheet} from 'react-native';
import {useQuery} from 'react-query';
import {fetch} from '../util/fetch';
import ErrorScreen from './ErrorScreen';
const {height, width} = Dimensions.get('window');
import {Spinner} from '../components';
import {ICharacter, NavigationProps} from '../types';
const ViewWithSpinner = Spinner(View);
export default function CharacterScreen({route}: NavigationProps) {
  const id = route.params.id;
  const {data, isError, isLoading} = useQuery<ICharacter>(
    ['character', id],
    () => fetch({url: `character/${id}`}),
    {
      enabled: !!id,
    },
  );
  if (isError) {
    return <ErrorScreen />;
  }
  return (
    <ViewWithSpinner isLoading={isLoading} style={styles.container}>
      <Image
        source={{uri: data?.image}}
        resizeMode="contain"
        style={{height: height * 0.3, width}}
      />
      <Text style={styles.text}>
        Name of the Character: {data?.name}
        {'\n'}
        Status: {data?.status}
        {'\n'}
        Species: {data?.species}
        {'\n'}
        Origin: <Text style={styles.text}>{data?.origin.name}</Text>
        {'\n'}
        Location: <Text style={styles.text}>{data?.location.name}</Text>
        {'\n'}
      </Text>
    </ViewWithSpinner>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.05,
  },
  text: {
    fontSize: height * 0.02,
    marginTop: height * 0.02,
    marginLeft: width * 0.05,
    lineHeight: height * 0.05,
  },
});
