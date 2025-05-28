import { useStyles, createStyleSheet } from "styles";
import { useVariants } from "@/utils/useVariants";
import { Pressable, Text, View } from "react-native";
import { ReactNode } from "react";

export interface ButtonProps {
	background: (typeof ButtonVariants.background)[number];
	icon: (typeof ButtonVariants.icon)[number];
	size: (typeof ButtonVariants.size)[number];
	state: (typeof ButtonVariants.state)[number];
	text: (typeof ButtonVariants.text)[number];
	label?: string;
	iconNode?: ReactNode;
	onPress?: () => void;
	iconColorOverride?: string;
	textColorOverride?: string;
	borderColorOverride?: string;
	testID?: string;
}

export const ButtonVariants = {
	background: ["On", "Off"],
	icon: ["Off", "Left", "Right", "Only"],
	size: ["Default", "Small"],
	state: ["Active", "Disabled"],
	text: ["On", "Off"],
} as const;

export function Button({
	text,
	icon,
	size,
	background,
	state,
	label,
	iconNode,
	onPress,
	iconColorOverride,
	textColorOverride,
	borderColorOverride,
	testID,
}: ButtonProps) {
	const { styles } = useStyles(stylesheet);
	const { vstyles } = useVariants(
		ButtonVariants,
		{ text, icon, size, background, state },
		styles
	);

	const isDisabled = state === "Disabled";

	// Defaults from tokens.json (embedded directly)
	const defaultIconColor =
		background === "On"
			? "#FFFFFF"
			: state === "Disabled"
			? "#729D82"
			: "#00C851";

	const defaultTextColor =
		background === "On"
			? "#FFFFFF"
			: state === "Disabled"
			? "#729D82"
			: "#00C851";

	const defaultBorderColor =
		background === "On"
			? "transparent"
			: state === "Disabled"
			? "#729D82"
			: "#00C851";

	const iconColor = iconColorOverride || defaultIconColor;
	const textColor = textColorOverride || defaultTextColor;
	const borderColor = borderColorOverride || defaultBorderColor;

	return (
		<Pressable
			onPress={onPress}
			disabled={isDisabled}
			style={({ pressed }) => [
				vstyles.root(),
				pressed && !isDisabled && { opacity: 0.8 },
				borderColor ? { borderColor } : {},
			]}
			testID={testID}
		>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				{(icon === "Left" || icon === "Only") && iconNode}
				{text === "On" && icon !== "Only" && (
					<Text style={[vstyles.text(), { color: textColor }]} testID="34:2332">
						{label ?? "Text"}
					</Text>
				)}
				{icon === "Right" && iconNode}
			</View>
		</Pressable>
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
		borderRadius: theme.radii.button,
		backgroundColor: theme.colors.success,
		shadowColor: "rgba(0, 0, 0, 0.2)",
		shadowRadius: 2,
		shadowOffset: { width: 1, height: 2 },
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.fontSize.lg,
	},
	text: {
		color: theme.colors.neutral.white["100"],
		fontWeight: theme.typography.fontWeight.bold,
		textAlign: "center",
		fontStyle: "normal",
		fontWeight: "700",
	},
}));
