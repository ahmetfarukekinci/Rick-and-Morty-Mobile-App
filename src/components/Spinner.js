import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
const Spinner = (Comp) => ({ isLoading, children, ...props }) => {
	return (
		<View style={{ flex: 1 }}>
			<Comp {...props}>{children}</Comp>
			{isLoading && (
				<View
					style={[
						StyleSheet.absoluteFill,
						{ backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
					]}
				>
					<ActivityIndicator size="large" color="#fff" />
				</View>
			)}
		</View>
	);
};
export { Spinner };
