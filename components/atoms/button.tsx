import { useStyles, createStyleSheet } from "styles";
import { useVariants } from "react-exo/utils";
import { View, Text } from "react-native";

export interface ButtonProps {
	background: (typeof ButtonVariants.background)[number];
	icon: (typeof ButtonVariants.icon)[number];
	size: (typeof ButtonVariants.size)[number];
	state: (typeof ButtonVariants.state)[number];
	text: (typeof ButtonVariants.text)[number];
	/** Used to locate this view in end-to-end tests. */
	testID?: string;
}

export const ButtonVariants = {
	background: ["On", "Off"],
	icon: ["Off", "Left", "Right", "Only"],
	size: ["Default", "Small"],
	state: ["Active", "Disabled"],
	text: ["On", "Off"],
} as const;

export function Button(props: ButtonProps) {
	const { text, icon, size, background, state } = props;
	const { styles } = useStyles(stylesheet);
	const { vstyles } = useVariants(
		ButtonVariants,
		{ text, icon, size, background, state },
		styles
	);

	return (
		<View style={vstyles.root()} testID={props.testID ?? "10:2064"}>
			<Text style={vstyles.text()} testID="34:2332">
				{`Text`}
			</Text>
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		height: 40,
		paddingTop: 8,
		paddingLeft: 16,
		paddingBottom: 8,
		paddingRight: 16,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		rowGap: 6,
		columnGap: 6,
		flexShrink: 0,
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		backgroundColor: "Success.Light.Green",
		shadowColor: "rgba(0, 0, 0, 0.20000000298023224)",
		shadowRadius: 2,
		shadowOffset: { width: 1, height: 2 },
	},
	rootTextOnIconOffSizeSmallBackgroundOnStateActive: {
		width: 58,
		height: 24,
		paddingLeft: 8,
		paddingRight: 8,
	},
	rootTextOnIconLeftSizeDefaultBackgroundOnStateActive: {
		height: "unset" as any,
		flexShrink: "unset" as any,
		flexDirection: "row",
	},
	rootTextOnIconLeftSizeSmallBackgroundOnStateActive: {
		flexDirection: "row",
		height: 24,
		paddingLeft: 8,
		paddingRight: 8,
	},
	rootTextOnIconRightSizeDefaultBackgroundOnStateActive: {
		height: "unset" as any,
		flexShrink: "unset" as any,
		flexDirection: "row",
	},
	rootTextOnIconRightSizeSmallBackgroundOnStateActive: {
		flexDirection: "row",
		height: 24,
		paddingLeft: 8,
		paddingRight: 8,
	},
	rootTextOnIconOffSizeDefaultBackgroundOffStateActive: {
		backgroundColor: "unset" as any,
		shadowColor: "unset" as any,
		shadowRadius: "unset" as any,
		shadowOffset: "unset" as any,
		height: 32,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconOffSizeSmallBackgroundOffStateActive: {
		backgroundColor: "unset" as any,
		shadowColor: "unset" as any,
		shadowRadius: "unset" as any,
		shadowOffset: "unset" as any,
		flexDirection: "row",
		height: 24,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconLeftSizeDefaultBackgroundOffStateActive: {
		backgroundColor: "unset" as any,
		shadowColor: "unset" as any,
		shadowRadius: "unset" as any,
		shadowOffset: "unset" as any,
		flexDirection: "row",
		height: 32,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconLeftSizeSmallBackgroundOffStateActive: {
		backgroundColor: "unset" as any,
		shadowColor: "unset" as any,
		shadowRadius: "unset" as any,
		shadowOffset: "unset" as any,
		flexDirection: "row",
		height: 24,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconRightSizeDefaultBackgroundOffStateActive: {
		backgroundColor: "unset" as any,
		shadowColor: "unset" as any,
		shadowRadius: "unset" as any,
		shadowOffset: "unset" as any,
		flexDirection: "row",
		height: 32,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconRightSizeSmallBackgroundOffStateActive: {
		backgroundColor: "unset" as any,
		shadowColor: "unset" as any,
		shadowRadius: "unset" as any,
		shadowOffset: "unset" as any,
		flexDirection: "row",
		height: 24,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOffIconOnlySizeDefaultBackgroundOffStateActive: {
		shadowColor: "unset" as any,
		shadowRadius: "unset" as any,
		shadowOffset: "unset" as any,
		flexDirection: "row",
		width: 40,
		paddingLeft: 0,
		paddingRight: 0,
		borderBottomLeftRadius: 32,
		borderBottomRightRadius: 32,
		borderTopLeftRadius: 32,
		borderTopRightRadius: 32,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "rgba(0, 200, 81, 1)",
		backgroundColor: "rgba(255, 255, 255, 1)",
	},
	rootTextOffIconOnlySizeSmallBackgroundOffStateActive: {
		shadowColor: "unset" as any,
		shadowRadius: "unset" as any,
		shadowOffset: "unset" as any,
		flexDirection: "row",
		width: 24,
		height: 24,
		paddingLeft: 0,
		paddingRight: 0,
		borderBottomLeftRadius: 34,
		borderBottomRightRadius: 34,
		borderTopLeftRadius: 34,
		borderTopRightRadius: 34,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "rgba(0, 200, 81, 1)",
		backgroundColor: "rgba(255, 255, 255, 1)",
	},
	rootTextOnIconOffSizeDefaultBackgroundOnStateDisabled: {
		shadowColor: "unset" as any,
		shadowRadius: "unset" as any,
		shadowOffset: "unset" as any,
		backgroundColor: "rgba(114, 157, 130, 1)",
	},
	rootTextOnIconOffSizeSmallBackgroundOnStateDisabled: {
		shadowColor: "unset" as any,
		shadowRadius: "unset" as any,
		shadowOffset: "unset" as any,
		width: 58,
		height: 24,
		paddingLeft: 8,
		paddingRight: 8,
		backgroundColor: "rgba(114, 157, 130, 1)",
	},
	rootTextOnIconLeftSizeDefaultBackgroundOnStateDisabled: {
		height: "unset" as any,
		flexShrink: "unset" as any,
		shadowColor: "unset" as any,
		shadowRadius: "unset" as any,
		shadowOffset: "unset" as any,
		flexDirection: "row",
		backgroundColor: "rgba(114, 157, 130, 1)",
	},
	rootTextOnIconLeftSizeSmallBackgroundOnStateDisabled: {
		shadowColor: "unset" as any,
		shadowRadius: "unset" as any,
		shadowOffset: "unset" as any,
		flexDirection: "row",
		height: 24,
		paddingLeft: 8,
		paddingRight: 8,
		backgroundColor: "rgba(114, 157, 130, 1)",
	},
	rootTextOnIconRightSizeDefaultBackgroundOnStateDisabled: {
		height: "unset" as any,
		flexShrink: "unset" as any,
		shadowColor: "unset" as any,
		shadowRadius: "unset" as any,
		shadowOffset: "unset" as any,
		flexDirection: "row",
		backgroundColor: "rgba(114, 157, 130, 1)",
	},
	rootTextOnIconRightSizeSmallBackgroundOnStateDisabled: {
		shadowColor: "unset" as any,
		shadowRadius: "unset" as any,
		shadowOffset: "unset" as any,
		flexDirection: "row",
		height: 24,
		paddingLeft: 8,
		paddingRight: 8,
		backgroundColor: "rgba(114, 157, 130, 1)",
	},
	text: {
		color: "Neutral.White.100",
		textAlign: "center",
		fontFamily: "Work Sans",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "700",
	},
	textTextOnIconOffSizeSmallBackgroundOnStateActive: {
		fontSize: 12,
	},
	textTextOnIconLeftSizeSmallBackgroundOnStateActive: {
		fontSize: 12,
	},
	textTextOnIconRightSizeSmallBackgroundOnStateActive: {
		fontSize: 12,
	},
	textTextOnIconOffSizeDefaultBackgroundOffStateActive: {
		color: "Success.Light.Green",
	},
	textTextOnIconOffSizeSmallBackgroundOffStateActive: {
		color: "Success.Light.Green",
		fontSize: 12,
	},
	textTextOnIconLeftSizeDefaultBackgroundOffStateActive: {
		color: "Success.Light.Green",
	},
	textTextOnIconLeftSizeSmallBackgroundOffStateActive: {
		color: "Success.Light.Green",
		fontSize: 12,
	},
	textTextOnIconRightSizeDefaultBackgroundOffStateActive: {
		color: "Success.Light.Green",
	},
	textTextOnIconRightSizeSmallBackgroundOffStateActive: {
		color: "Success.Light.Green",
		fontSize: 12,
	},
	textTextOnIconOffSizeSmallBackgroundOnStateDisabled: {
		fontSize: 12,
	},
	textTextOnIconLeftSizeSmallBackgroundOnStateDisabled: {
		fontSize: 12,
	},
	textTextOnIconRightSizeSmallBackgroundOnStateDisabled: {
		fontSize: 12,
	},
}));
