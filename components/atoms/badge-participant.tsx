import { useStyles, createStyleSheet } from "styles";
import { View, Text } from "react-native";
// import { StarFill } from "components/atoms/star-fill";

export interface BadgeParticipantProps {
	/** Used to locate this view in end-to-end tests. */
	testID?: string;
}

export function BadgeParticipant(props: BadgeParticipantProps) {
	const { styles } = useStyles(stylesheet);

	return (
		<View style={styles.root} testID={props.testID ?? "67:12691"}>
			// <StarFill testID="67:12686" />
			<Text style={styles.labelText} testID="67:12698">
				{`2`}
			</Text>
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		width: 32,
		height: 32,
		aspectRatio: 1,
		borderBottomLeftRadius: 128,
		borderBottomRightRadius: 128,
		borderTopLeftRadius: 128,
		borderTopRightRadius: 128,
		borderWidth: 2,
		borderStyle: "solid",
		borderColor: "rgba(237, 237, 237, 1)",
		backgroundColor: "rgba(255, 255, 255, 0.6392157077789307)",
	},
	labelText: {
		color: "rgba(255, 255, 255, 1)",
		textAlign: "center",
		fontFamily: "Work Sans",
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "700",
		lineHeight: 26,
	},
}));
