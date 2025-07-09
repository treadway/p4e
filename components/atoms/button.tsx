// components/atoms/Button.tsx
import React, { ReactNode, cloneElement } from "react";
import {
	Pressable,
	Text,
	View,
	PressableStateCallbackType,
} from "react-native";
import { useTheme, useStyles, createStyleSheet } from "styles";
import { useVariants } from "@/utils/useVariants";

export interface ButtonProps {
	background: (typeof ButtonVariants.background)[number];
	icon: (typeof ButtonVariants.icon)[number];
	size: (typeof ButtonVariants.size)[number];
	state: (typeof ButtonVariants.state)[number];
	text: (typeof ButtonVariants.text)[number];
	label?: string;
	iconNode?: ReactNode;
	onPress?: () => void;
	testID?: string;
}

export const ButtonVariants = {
	background: ["On", "Off"] as const,
	icon: ["Off", "Left", "Right", "Only"] as const,
	size: ["Default", "Small"] as const,
	state: ["Active", "Disabled"] as const,
	text: ["On", "Off"] as const,
};

export function Button({
	background,
	icon,
	size,
	state,
	text,
	label = "Button",
	iconNode,
	onPress,
	testID,
}: ButtonProps) {
	const theme = useTheme();
	const { styles } = useStyles(stylesheet);
	const { vstyles } = useVariants(
		ButtonVariants,
		{ background, icon, size, state, text },
		styles
	);

	const isDisabled = state === "Disabled";

	// compute colours from theme
	const bgColor = isDisabled
		? theme.button.background.disabled
		: background === "On"
		? theme.button.background.on
		: theme.button.background.off;

	const contentColor = isDisabled
		? theme.colors.disabled
		: background === "On"
		? theme.button.text.on
		: theme.button.text.off;

	const borderColor =
		background === "On"
			? "transparent"
			: isDisabled
			? theme.colors.disabled
			: theme.button.background.on;

	return (
		<Pressable
			onPress={onPress}
			disabled={isDisabled}
			testID={testID}
			style={(pressed: PressableStateCallbackType) => [
				styles.root,
				...vstyles.root(pressed),
				{ backgroundColor: bgColor, borderColor },
				pressed && !isDisabled && styles.pressed,
			]}
		>
			<View style={styles.content}>
				{(icon === "Left" || icon === "Only") &&
					iconNode &&
					cloneElement(iconNode as React.ReactElement, { color: contentColor })}
				{text === "On" && icon !== "Only" && (
					<Text style={[...vstyles.text(), { color: contentColor }]}>
						{label}
					</Text>
				)}
				{icon === "Right" &&
					iconNode &&
					cloneElement(iconNode as React.ReactElement, { color: contentColor })}
			</View>
		</Pressable>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	// ─── BASE ────────────────────────────────────────────────────────────────
	root: {
		height: theme.button.size.default,
		paddingHorizontal: theme.button.padding.horz,
		paddingVertical: theme.button.padding.vert,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: theme.button.radii,
		borderWidth: theme.button.border.width,
		borderStyle: theme.button.border.style,
		shadowColor: theme.button.shadow.color,
		shadowOffset: {
			width: theme.button.shadow.x,
			height: theme.button.shadow.y,
		},
		shadowRadius: theme.button.shadow.blur,
		shadowOpacity: theme.button.shadow.opacity ?? 1,
	},
	pressed: {
		opacity: 0.8,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.xs,
	},
	text: {
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.fontSize.sm,
		fontWeight: theme.typography.fontWeight.bold,
		// colour comes via render prop
	},

	// ─── “Icon-Only” OVERRIDES ─────────────────────────────────────────────
	rootTextOffIconOnlySizeDefaultBackgroundOffStateActive: {
		width: theme.button.size.default,
		height: theme.button.size.default,
		paddingHorizontal: 0,
		paddingVertical: 0,
		borderRadius: theme.button.size.default,
	},
	rootTextOffIconOnlySizeSmallBackgroundOffStateActive: {
		width: theme.button.size.small,
		height: theme.button.size.small,
		paddingHorizontal: 0,
		paddingVertical: 0,
		borderRadius: theme.button.size.small,
	},
	rootTextOffIconOnlySizeDefaultBackgroundOffStateDisabled: {
		width: theme.button.size.default,
		height: theme.button.size.default,
		paddingHorizontal: 0,
		paddingVertical: 0,
		borderRadius: theme.button.size.default,
	},
	rootTextOffIconOnlySizeSmallBackgroundOffStateDisabled: {
		width: theme.button.size.small,
		height: theme.button.size.small,
		paddingHorizontal: 0,
		paddingVertical: 0,
		borderRadius: theme.button.size.small,
	},

	// ─── “Small” SIZE OVERRIDES (text+icon) ────────────────────────────────
	rootTextOnIconOffSizeSmallBackgroundOnStateActive: {
		height: 82,
		paddingVertical: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconOffSizeSmallBackgroundOffStateActive: {
		height: theme.button.size.small,
		paddingVertical: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconOffSizeSmallBackgroundOnStateDisabled: {
		height: theme.button.size.small,
		paddingVertical: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconOffSizeSmallBackgroundOffStateDisabled: {
		height: theme.button.size.small,
		paddingVertical: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconLeftSizeSmallBackgroundOnStateActive: {
		height: theme.button.size.small,
		paddingVertical: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconRightSizeSmallBackgroundOnStateActive: {
		height: theme.button.size.small,
		paddingVertical: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconLeftSizeSmallBackgroundOffStateActive: {
		height: theme.button.size.small,
		paddingVertical: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconRightSizeSmallBackgroundOffStateActive: {
		height: theme.button.size.small,
		paddingVertical: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconLeftSizeSmallBackgroundOnStateDisabled: {
		height: theme.button.size.small,
		paddingVertical: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconRightSizeSmallBackgroundOnStateDisabled: {
		height: theme.button.size.small,
		paddingVertical: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconLeftSizeSmallBackgroundOffStateDisabled: {
		height: theme.button.size.small,
		paddingVertical: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	rootTextOnIconRightSizeSmallBackgroundOffStateDisabled: {
		height: theme.button.size.small,
		paddingVertical: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
}));
