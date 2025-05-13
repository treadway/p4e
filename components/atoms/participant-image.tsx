import { useStyles, createStyleSheet } from "styles";
import { View } from "react-native";

export interface ParticipantImageProps {
	/** Used to locate this view in end-to-end tests. */
	testID?: string;
}

export function ParticipantImage(props: ParticipantImageProps) {
	const { styles } = useStyles(stylesheet);

	return (
		<View style={styles.root} testID={props.testID ?? "67:12743"}>
			<View style={styles.innerCircle} testID="67:12739"></View>
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		flexDirection: "row",
		width: 128,
		height: 128,
		paddingTop: 8,
		paddingLeft: 8,
		paddingBottom: 8,
		paddingRight: 8,
		justifyContent: "center",
		alignItems: "center",
		rowGap: 8,
		columnGap: 8,
		aspectRatio: 1,
		borderBottomLeftRadius: 128,
		borderBottomRightRadius: 128,
		borderTopLeftRadius: 128,
		borderTopRightRadius: 128,
		backgroundColor: "Participant",
	},
	innerCircle: {
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: 0,
		alignSelf: "stretch",
		borderBottomLeftRadius: 128,
		borderBottomRightRadius: 128,
		borderTopLeftRadius: 128,
		borderTopRightRadius: 128,
		borderWidth: 4,
		borderStyle: "solid",
		borderColor: "rgba(237, 237, 237, 1)",
	},
}));
