// components/LoadingScreen.tsx
import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

export function LoadingScreen() {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="#00C851" />
			<Text style={styles.text}>Loading points4earth...</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
	},
	text: {
		marginTop: 16,
		fontSize: 16,
		color: "#666",
		fontFamily: "WorkSans-Regular", // Will fallback to system font during loading
	},
});
