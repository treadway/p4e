import { useStyles, createStyleSheet } from "styles";
import { View } from "react-native";
// import { Image } from "react-exo/image";
import { Image } from "expo-image";
import image from "assets/images/content/bottom-background-1.png";

export interface P4EBackgroundProps {
	/** Used to locate this view in end-to-end tests. */
	testID?: string;
}

export function P4EBackground(props: P4EBackgroundProps) {
	const { styles } = useStyles(stylesheet);

	return (
		<View
			data-comp="p-4-e-background"
			style={styles.root}
			testID={props.testID ?? "33:5254"}
		>
			<Image url={image} width={375} height={671} />
			<View style={styles.gradient} testID="33:5186"></View>
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		width: 374,
		height: 780,
		backgroundColor: "Neutral.BG",
	},
	gradient: {
		width: 375,
		height: 780,
		flexDirection: "column",
		alignItems: "flex-start",
		flexShrink: 0,
	},
}));
