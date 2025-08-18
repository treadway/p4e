import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useStyles, createStyleSheet } from "styles";
import { ParticipantHeader } from "@/components/organisms/participant-header";

// Mock participant data - replace with your actual data source
const mockParticipantData = {
	name: "Gus Slomecki",
	title: "Earth Hero",
	points: 55000,
	// avatar: "https://via.placeholder.com/80x80", // Replace with actual avatar
};

export default function TransportationScreen() {
	const { styles } = useStyles(stylesheet);

	const handleSaveParticipant = (data: Partial<typeof mockParticipantData>) => {
		console.log("Saving participant data:", data);
		// TODO: Implement actual save logic
	};

	const handleImageUpload = () => {
		console.log("Handle image upload");
		// TODO: Implement image picker logic
	};

	return (
		<ScrollView
			testID="TransportationScreen"
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			showsVerticalScrollIndicator={false}
		>
			{/* Participant Header */}
			<ParticipantHeader
				participant={mockParticipantData}
				onSave={handleSaveParticipant}
				onImageUpload={handleImageUpload}
				testID="TransportationScreen-participant-header"
			/>

			{/* Main Content Area */}
			<View testID="TransportationScreen-content" style={styles.mainContent}>
				<Text testID="TransportationScreen-title" style={styles.sectionTitle}>
					Transportation & Activity
				</Text>

				{/* Placeholder for transportation content */}
				<View
					testID="TransportationScreen-placeholder"
					style={styles.placeholder}
				>
					<Text
						testID="TransportationScreen-placeholder-text"
						style={styles.placeholderText}
					>
						Transportation content will go here:
					</Text>
					<Text testID="TransportationScreen-todo-list" style={styles.todoText}>
						• Earnings History Card{"\n"}• Transportation Methods Card{"\n"}•
						Recent Activity{"\n"}• Get Points Card Modal
					</Text>
				</View>
			</View>
		</ScrollView>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	container: {
		flex: 1,
		backgroundColor: "transparent", // Let the BaseLayoutWrapper handle background
	},

	contentContainer: {
		flexGrow: 1,
		paddingBottom: theme.spacing.navBottom, // Account for tab bar
	},

	mainContent: {
		paddingHorizontal: theme.spacing.lg,
		paddingTop: theme.spacing.md,
	},

	sectionTitle: {
		fontSize: theme.typography.fontSize.xl,
		fontWeight: theme.typography.fontWeight.bold,
		color: theme.colors.text.default,
		marginBottom: theme.spacing.lg,
		textAlign: "center",
	},

	placeholder: {
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		borderRadius: theme.card.borderRadius,
		padding: theme.spacing.lg,
		marginBottom: theme.spacing.lg,
		borderWidth: 2,
		borderColor: theme.colors.success,
		borderStyle: "dashed",
	},

	placeholderText: {
		fontSize: theme.typography.fontSize.base,
		fontWeight: theme.typography.fontWeight.semibold,
		color: theme.colors.text.default,
		marginBottom: theme.spacing.md,
	},

	todoText: {
		fontSize: theme.typography.fontSize.sm,
		color: theme.colors.neutral.grayDark,
		lineHeight: 20,
	},
}));
