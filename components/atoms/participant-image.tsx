import { useStyles, createStyleSheet } from "styles";
import { View, Image } from "react-native";

export interface ParticipantImageProps {
	uri?: string | ReturnType<typeof require>;
	testID?: string;
}

export function ParticipantImage({ uri, testID }: ParticipantImageProps) {
	const { styles } = useStyles(stylesheet);

	const resolvedSource =
		uri ?? require("assets/images/participant-default.png");

	return (
		<View
			data-comp="participant-image"
			style={styles.root}
			testID={testID ?? "67:12743"}
		>
			<View style={styles.innerCircle} testID="67:12739" />
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

const stylesheet = createStyleSheet((theme) => ({
	root: {
		width: theme.participantHeader.participantImage.size,
		height: theme.participantHeader.participantImage.size,
		borderRadius: theme.participantHeader.participantImage.size / 2,
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.colors.background ?? "#EEE",
		shadowColor: theme.card.shadow.color,
		shadowRadius: theme.card.shadow.blur,
		shadowOffset: {
			width: theme.card.shadow.x,
			height: theme.card.shadow.y,
		},
	},

	image: {
		width: "100%",
		height: "100%",
		borderRadius: theme.participantHeader.participantImage.size / 2,
		borderWidth: 4,
		borderColor: "rgba(237, 237, 237, 1)", // consider tokenizing if reused
	},

	innerCircle: {
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: 0,
		alignSelf: "stretch",
		borderRadius: theme.participantHeader.participantImage.size,
		borderWidth: 4,
		borderStyle: "solid",
		borderColor: "rgba(237, 237, 237, 1)", // consider tokenizing if reused
	},
}));
