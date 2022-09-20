import React from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {IEpisodeButton} from '../types';
const EpisodeButton = ({
  onPress,
  air_date,
  episode,
  name,
  style,
}: IEpisodeButton) => (
  <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
    <Text style={styles.text}>
      Name: {name}
      {'\n'}Episode: {episode} | Air Date: {air_date}
    </Text>
  </TouchableOpacity>
);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.075,
    justifyContent: 'center',
    borderBottomWidth: height * 0.001,
    paddingLeft: width * 0.025,
    borderBottomColor: 'gray',
  },
  image: {
    width: width * 0.3,
    height: height * 0.2,
    borderRadius: height * 0.02,
  },
  text: {
    fontSize: height * 0.02,
    lineHeight: height * 0.028,
  },
});

export {EpisodeButton};
