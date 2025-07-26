import { useStyles, createStyleSheet } from "react-native-unistyles";
import { View } from "react-native";

import type { ViewStyle, StyleProp } from "react-native";

export interface P4EBottomBackgroundProps {
	/** Used to override the default root style. */
	style?: StyleProp<ViewStyle>;
	/** Used to locate this view in end-to-end tests. */
	testID?: string;
}

export function P4EBottomBackground(props: P4EBottomBackgroundProps) {
	const { styles } = useStyles(stylesheet);

	return (
		<View testID={props.testID ?? "33:5256"} style={[styles.root, props.style]}>
			<View testID="34:8330" style={styles.gradient}></View>
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		width: 374,
		height: 780,
		paddingBottom: 132,
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "lightgray",
	},
	gradient: {
		width: 375,
		height: 780,
		flexDirection: "column",
		alignItems: "flex-start",
		flexShrink: 0,
	},
}));
