import { useStyles, createStyleSheet } from "react-native-unistyles";
import { View } from "react-native";
import { Image } from "react-exo/image";
import image from "assets/img/image.png";

import type { ViewStyle, StyleProp } from "react-native";

export interface P4ETopBackgroundProps {
	/** Used to override the default root style. */
	style?: StyleProp<ViewStyle>;
	/** Used to locate this view in end-to-end tests. */
	testID?: string;
}

export function P4ETopBackground(props: P4ETopBackgroundProps) {
	const { styles } = useStyles(stylesheet);

	return (
		<View testID={props.testID ?? "33:5254"} style={[styles.root, props.style]}>
			<Image url={image} width={375} height={671} />
			<View testID="33:5186" style={styles.gradient}></View>
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
