import { useStyles, createStyleSheet } from "styles";
import { View, Image } from "react-native";

export interface ParticipantImageProps {
	uri?: string | ReturnType<typeof require>; // support both remote and local
	testID?: string;
}

export function ParticipantImage({ uri, testID }: ParticipantImageProps) {
	const { styles } = useStyles(stylesheet);

	const resolvedSource =
		uri ?? require("assets/images/participant-default.png");

	return (
		<View style={styles.root} testID={testID ?? "67:12743"}>
			<View style={styles.innerCircle} testID="67:12739"></View>
			<Image
				source={
					typeof resolvedSource === "string"
						? { uri: resolvedSource }
						: resolvedSource
				}
				style={styles.image}
				resizeMode="cover"
				testID="67:12739"
			/>
		</View>
	);
}

const stylesheet = createStyleSheet(() => ({
	root: {
		width: 128,
		height: 128,
		borderRadius: 64,
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#EEE", // fallback color
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 64,
		borderWidth: 4,
		borderColor: "rgba(237, 237, 237, 1)",
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
