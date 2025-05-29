import { useStyles, createStyleSheet } from "styles";
import { useVariants } from "@/utils/useVariants";
import { Pressable, Text, View } from "react-native";
import { ReactNode } from "react";
import { tokens } from "styles/tokens";

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

const getColors = {
	icon: (bg: string, state: string) => {
		if (bg === "On") return tokens.colors.neutral.white[100];
		if (state === "Disabled") return tokens.colors.success.default;
		return tokens.colors.success.light.green;
	},
	text: (bg: string, state: string) => {
		if (bg === "On") return tokens.colors.neutral.white[100];
		if (state === "Disabled") return tokens.colors.success.default;
		return tokens.colors.success.light.green;
	},
	border: (bg: string, state: string) => {
		if (bg === "On") return "transparent";
		if (state === "Disabled") return tokens.colors.success.default;
		return tokens.colors.success.light.green;
	},
	bg: (bg: string, state: string) => {
		if (state === "Disabled") return tokens.colors.success.muted;
		return bg === "On"
			? tokens.colors.success.default
			: tokens.colors.neutral.white[100];
	},
};

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

	const variantKey = `rootText${text}Icon${icon}Size${size}Background${background}State${state}`;
	const variantStyle = styles[variantKey as keyof typeof styles];

	const isDisabled = state === "Disabled";
	const iconColor = iconColorOverride || getColors.icon(background, state);
	const textColor = textColorOverride || getColors.text(background, state);
	const borderColor =
		borderColorOverride || getColors.border(background, state);

	return (
		<Pressable
			onPress={onPress}
			disabled={isDisabled}
			style={({ pressed }) => [
				styles.root,
				variantStyle,
				pressed && !isDisabled && { opacity: 0.8 },
				borderColor ? { borderColor } : {},
			]}
			testID={testID}
		>
			<View style={vstyles.content()}>
				{(icon === "Left" || icon === "Only") && iconNode}
				{text === "On" && icon !== "Only" && (
					<Text style={[vstyles.text(), { color: textColor }]}>
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
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: theme.radii.button,
		borderWidth: 1,
		borderColor: "transparent",
		backgroundColor: theme.colors.success,
		paddingHorizontal: 16,
		paddingVertical: 8,
		shadowColor: "rgba(0, 0, 0, 0.2)",
		shadowRadius: 2,
		shadowOffset: { width: 1, height: 2 },
	},

	// Variants for layout
	rootTextOffIconOnlySizeSmallBackgroundOffStateActive: {
		width: 24,
		height: 24,
		borderRadius: 34,
		borderWidth: 1,
		borderColor: tokens.colors.success.light.green,
		backgroundColor: tokens.colors.neutral.white[100],
		padding: 0,
		justifyContent: "center",
		alignItems: "center",
	},

	rootTextOffIconOnlySizeSmallBackgroundOffStateActive: {
		// shadowColor: "unset" as any,
		// shadowRadius: "unset" as any,
		// shadowOffset: "unset" as any,
		flexDirection: "row",
		width: 24,
		height: 24,
		paddingLeft: 0,
		paddingRight: 0,
		borderRadius: 34,
		borderWidth: 1,
		// borderStyle: "solid",
		borderColor: "rgba(0, 200, 81, 1)",
		backgroundColor: "rgba(255, 255, 255, 1)",
	},

	rootTextOnIconOffSizeSmallBackgroundOnStateActive: {
		width: 58,
		height: 24,
		paddingLeft: 8,
		paddingRight: 8,
	},
	rootTextOnIconLeftSizeDefaultBackgroundOnStateActive: {
		// height: "unset" as any,
		// flexShrink: "unset" as any,
		flexDirection: "row",
	},
	rootTextOnIconLeftSizeSmallBackgroundOnStateActive: {
		flexDirection: "row",
		height: 24,
		paddingLeft: 8,
		paddingRight: 8,
	},
	rootTextOnIconRightSizeDefaultBackgroundOnStateActive: {
		// height: "unset" as any,
		// flexShrink: "unset" as any,
		flexDirection: "row",
	},
	rootTextOnIconRightSizeSmallBackgroundOnStateActive: {
		flexDirection: "row",
		height: 24,
		paddingLeft: 8,
		paddingRight: 8,
	},
	rootTextOnIconOffSizeDefaultBackgroundOffStateActive: {
		// backgroundColor: "unset" as any,
		// shadowColor: "unset" as any,
		// shadowRadius: "unset" as any,
		// shadowOffset: "unset" as any,
		height: 32,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconOffSizeSmallBackgroundOffStateActive: {
		// backgroundColor: "unset" as any,
		// shadowColor: "unset" as any,
		// shadowRadius: "unset" as any,
		// shadowOffset: "unset" as any,
		flexDirection: "row",
		height: 24,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconLeftSizeDefaultBackgroundOffStateActive: {
		// backgroundColor: "unset" as any,
		// shadowColor: "unset" as any,
		// shadowRadius: "unset" as any,
		// shadowOffset: "unset" as any,
		flexDirection: "row",
		height: 32,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconLeftSizeSmallBackgroundOffStateActive: {
		// backgroundColor: "unset" as any,
		// shadowColor: "unset" as any,
		// shadowRadius: "unset" as any,
		// shadowOffset: "unset" as any,
		flexDirection: "row",
		height: 24,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconRightSizeDefaultBackgroundOffStateActive: {
		// backgroundColor: "unset" as any,
		// shadowColor: "unset" as any,
		// shadowRadius: "unset" as any,
		// shadowOffset: "unset" as any,
		flexDirection: "row",
		height: 32,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconRightSizeSmallBackgroundOffStateActive: {
		// backgroundColor: "unset" as any,
		// shadowColor: "unset" as any,
		// shadowRadius: "unset" as any,
		// shadowOffset: "unset" as any,
		flexDirection: "row",
		height: 24,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOffIconOnlySizeDefaultBackgroundOffStateActive: {
		// shadowColor: "unset" as any,
		// shadowRadius: "unset" as any,
		// shadowOffset: "unset" as any,
		flexDirection: "row",
		width: 40,
		paddingLeft: 0,
		paddingRight: 0,
		borderRadius: 32,
		borderWidth: 1,
		// borderStyle: "solid",
		borderColor: "rgba(0, 200, 81, 1)",
		backgroundColor: "rgba(255, 255, 255, 1)",
	},
	rootTextOnIconOffSizeDefaultBackgroundOnStateDisabled: {
		// shadowColor: "unset" as any,
		// shadowRadius: "unset" as any,
		// shadowOffset: "unset" as any,
		backgroundColor: "rgba(114, 157, 130, 1)",
	},
	rootTextOnIconOffSizeSmallBackgroundOnStateDisabled: {
		// shadowColor: "unset" as any,
		// shadowRadius: "unset" as any,
		// shadowOffset: "unset" as any,
		width: 58,
		height: 24,
		paddingLeft: 8,
		paddingRight: 8,
		backgroundColor: "rgba(114, 157, 130, 1)",
	},
	rootTextOnIconLeftSizeDefaultBackgroundOnStateDisabled: {
		// height: "unset" as any,
		// flexShrink: "unset" as any,
		// shadowColor: "unset" as any,
		// shadowRadius: "unset" as any,
		// shadowOffset: "unset" as any,
		flexDirection: "row",
		backgroundColor: "rgba(114, 157, 130, 1)",
	},
	rootTextOnIconLeftSizeSmallBackgroundOnStateDisabled: {
		// shadowColor: "unset" as any,
		// shadowRadius: "unset" as any,
		// shadowOffset: "unset" as any,
		flexDirection: "row",
		height: 24,
		paddingLeft: 8,
		paddingRight: 8,
		backgroundColor: "rgba(114, 157, 130, 1)",
	},
	rootTextOnIconRightSizeDefaultBackgroundOnStateDisabled: {
		// height: "unset" as any,
		// flexShrink: "unset" as any,
		// shadowColor: "unset" as any,
		// shadowRadius: "unset" as any,
		// shadowOffset: "unset" as any,
		flexDirection: "row",
		backgroundColor: "rgba(114, 157, 130, 1)",
	},
	rootTextOnIconRightSizeSmallBackgroundOnStateDisabled: {
		// shadowColor: "unset" as any,
		// shadowRadius: "unset" as any,
		// shadowOffset: "unset" as any,
		flexDirection: "row",
		height: 24,
		paddingLeft: 8,
		paddingRight: 8,
		backgroundColor: "rgba(114, 157, 130, 1)",
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

	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
	},

	text: {
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.fontSize.md,
		fontWeight: theme.typography.fontWeight.bold,
		color: theme.colors.neutral.white[100],
		textAlign: "center",
	},
}));
