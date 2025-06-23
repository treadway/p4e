import { useStyles, createStyleSheet } from "styles";
import { useVariants } from "@/utils/useVariants";
import { Pressable, Text, View } from "react-native";
import { ReactNode } from "react";
import { tokens } from "styles/tokens";

export interface ButtonProps {
	background: "On" | "Off";
	icon: "Off" | "Left" | "Right" | "Only";
	size: "Default" | "Small";
	state: "Active" | "Disabled";
	text: "On" | "Off";
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
		if (bg === "On") return tokens.colors.neutral.white["100"];
		if (state === "Disabled") return tokens.colors.disabled;
		return tokens.colors.success.light;
	},
	text: (bg: string, state: string) => {
		if (bg === "On") return tokens.colors.neutral.white["100"];
		if (state === "Disabled") return tokens.colors.disabled;
		return tokens.colors.success.light;
	},
	border: (bg: string, state: string) => {
		if (bg === "On") return "transparent";
		if (state === "Disabled") return tokens.colors.disabled;
		return tokens.colors.success.light;
	},
	bg: (bg: string, state: string) => {
		if (state === "Disabled") return tokens.colors.disabled;
		return bg === "On"
			? tokens.colors.success.dark
			: tokens.colors.neutral.white["100"];
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

const { styles } = useStyles(
	createStyleSheet((theme) => ({
		root: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			borderRadius: theme.button.radii,
			borderWidth: theme.button.border.width,
			borderColor: theme.button.border.color,
			borderStyle: theme.button.border.style,
			backgroundColor: theme.colors.success,
			paddingHorizontal: theme.button.padding.horz,
			paddingVertical: theme.button.padding.vert,
			shadowColor: theme.button.shadow.color,
			shadowRadius: theme.button.shadow.blur,
			shadowOffset: {
				width: theme.button.shadow.x,
				height: theme.button.shadow.y,
			},
		},

		// 🔽 ADD FULL VARIANT OVERRIDES

		rootTextOffIconOnlySizeSmallBackgroundOffStateActive: {
			width: theme.button.size.small,
			height: theme.button.size.small,
			paddingHorizontal: 0,
			backgroundColor: theme.colors.neutral.white,
		},

		rootTextOnIconOffSizeSmallBackgroundOffStateActive: {
			height: theme.button.size.small,
			paddingHorizontal: 0,
		},

		rootTextOnIconLeftSizeSmallBackgroundOffStateActive: {
			height: theme.button.size.small,
			paddingHorizontal: 0,
		},

		rootTextOnIconRightSizeSmallBackgroundOffStateActive: {
			height: theme.button.size.small,
			paddingHorizontal: 0,
		},

		rootTextOnIconOffSizeSmallBackgroundOnStateActive: {
			height: theme.button.size.small,
			paddingHorizontal: theme.button.padding.horz,
		},

		rootTextOnIconLeftSizeSmallBackgroundOnStateActive: {
			height: theme.button.size.small,
			paddingHorizontal: theme.button.padding.horz,
		},

		rootTextOnIconRightSizeSmallBackgroundOnStateActive: {
			height: theme.button.size.small,
			paddingHorizontal: theme.button.padding.horz,
		},

		rootTextOnIconOffSizeDefaultBackgroundOffStateActive: {
			height: theme.button.size.default,
			paddingHorizontal: 0,
		},

		rootTextOnIconLeftSizeDefaultBackgroundOffStateActive: {
			height: theme.button.size.default,
			paddingHorizontal: 0,
		},

		rootTextOnIconRightSizeDefaultBackgroundOffStateActive: {
			height: theme.button.size.default,
			paddingHorizontal: 0,
		},

		rootTextOnIconLeftSizeDefaultBackgroundOnStateActive: {
			height: theme.button.size.default,
			paddingHorizontal: theme.button.padding.horz,
		},

		rootTextOnIconRightSizeDefaultBackgroundOnStateActive: {
			height: theme.button.size.default,
			paddingHorizontal: theme.button.padding.horz,
		},

		textTextOnIconOffSizeSmallBackgroundOnStateActive: {
			fontSize: theme.typography.fontSize.sm,
		},

		textTextOnIconLeftSizeSmallBackgroundOnStateActive: {
			fontSize: theme.typography.fontSize.sm,
		},

		textTextOnIconRightSizeSmallBackgroundOnStateActive: {
			fontSize: theme.typography.fontSize.sm,
		},

		textTextOnIconOffSizeSmallBackgroundOffStateActive: {
			fontSize: theme.typography.fontSize.sm,
			color: theme.colors.success.light,
		},

		content: {
			gap: theme.spacing.xs,
		},

		text: {
			fontFamily: theme.typography.fontFamily,
			fontSize: theme.typography.fontSize.sm,
			fontWeight: theme.typography.fontWeight.bold,
			textAlign: "center",
		},
	}))
);
