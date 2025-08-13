// ===================================
// app/screens/transportation.tsx (new screen structure)
// ===================================

import React from "react";
import { ScrollView, Text } from "react-native";
import { useStyles, createStyleSheet } from "styles";
import { ParticipantHeader } from "components/organisms/participant-header/index"; // Assuming you have this

export default function TransportationScreen() {
	const { styles } = useStyles(stylesheet);

	return (
		<ScrollView
			testID="transportation"
			style={styles.container}
			contentContainerStyle={styles.content}
		>
			<ParticipantHeader />
			<Text style={styles.title}>Transportation & Activity</Text>
			{/* Your transportation content here */}
		</ScrollView>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	container: {
		flex: 1,
	},
	content: {
		padding: theme.spacing.md,
	},
	title: {
		fontSize: theme.typography.fontSize.xl,
		fontWeight: theme.typography.fontWeight.bold,
		color: theme.colors.text.default,
		marginBottom: theme.spacing.lg,
	},
}));
