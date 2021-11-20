import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
const ImageButton = ({ style, uri, onPress, title }) => {
	return (
		<TouchableOpacity onPress={onPress} style={[ styles.container, style ]}>
			<Image borderRadius={width * 0.13} source={{ uri }} resizeMode="contain" style={styles.image} />
			<Text numberOfLines={1} style={styles.text}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

ImageButton.propTypes = {
	style: PropTypes.object,
	uri: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired
};
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: width * 0.26
	},
	image: {
		width: width * 0.26,
		height: width * 0.26
	},
	text: {
		fontSize: height * 0.02,
		marginTop: height * 0.005
	}
});

export { ImageButton };
