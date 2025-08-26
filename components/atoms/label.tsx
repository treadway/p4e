// components/atoms/label.tsx
import { useStyles, createStyleSheet } from "styles";
import { View, Text } from "react-native";

export interface LabelProps {
	/** The label text to display */
	text?: string;
	/** Used to locate this view in end-to-end tests. */
	testID?: string;
}

export function Label({ text = "Label", testID }: LabelProps) {
	const { styles } = useStyles(stylesheet);

	return (
		<View style={styles.root} testID={testID ?? "Label"}>
			<Text style={styles.labelText} testID={`${testID ?? "Label"}-text`}>
				{text}
			</Text>
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: theme.spacing.none, // 8px from theme
		backgroundColor: theme.colors.background.default, // Theme background instead of hardcoded white
		borderRadius: theme.spacing.xs, // Small border radius for better appearance
	},

	labelText: {
		color: theme.colors.neutral.grayDark, // Theme gray instead of hardcoded rgba
		fontFamily: theme.typography.fontFamily, // Theme font family
		fontSize: theme.typography.fontSize.xs, // 12px from theme
		fontWeight: theme.typography.fontWeight.bold, // Theme bold weight
		letterSpacing: theme.typography.letterSpacing.default, // Theme letter spacing
		textTransform: "uppercase", // Labels are often uppercase
	},
}));
