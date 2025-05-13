import { useStyles, createStyleSheet } from "styles";
import { View, Text } from "react-native";

export interface LabelProps {
	/** Used to locate this view in end-to-end tests. */
	text?: string;
	testID?: string;
}

export function Label({ text = "label", testID }: LabelProps) {
	const { styles } = useStyles(stylesheet);

	return (
		<View style={styles.root} testID={testID ?? "52:5210"}>
			<Text style={styles.label} testID="52:4961">
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
		paddingHorizontal: 8,
		backgroundColor: "white",
		top: 16,
		left: 16,
	},
	label: {
		color: "rgba(91, 91, 91, 1)",
		fontFamily: "Work Sans",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "700",
		letterSpacing: 0.5,
	},
}));
