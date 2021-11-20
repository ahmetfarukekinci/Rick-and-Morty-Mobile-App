import React from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
const EpisodeButton = ({ onPress, title: { air_date, episode, name }, style }) => {
	return (
		<TouchableOpacity onPress={onPress} style={[ styles.container, style ]}>
			<Text style={styles.text}>
				Name: {name}
				{'\n'}Episode: {episode} | Air Date: {air_date}
			</Text>
		</TouchableOpacity>
	);
};

EpisodeButton.propTypes = {
	title: PropTypes.object.isRequired,
	onPress: PropTypes.func.isRequired,
	style: PropTypes.object
};
EpisodeButton.defaultProps = {
	title: {},
	onPress: () => {},
	style: {}
};
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		width: width,
		height: height * 0.075,
		justifyContent: 'center',
		borderBottomWidth: height * 0.001,
		paddingLeft: width * 0.025,
		borderBottomColor: 'gray'
	},
	image: {
		width: width * 0.3,
		height: height * 0.2,
		borderRadius: height * 0.02
	},
	text: {
		fontSize: height * 0.02,
		lineHeight: height * 0.028
	}
});

export { EpisodeButton };
