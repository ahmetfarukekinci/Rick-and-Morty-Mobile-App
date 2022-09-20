import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function ErrorScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Something gone wrong!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 21,
  },
});
