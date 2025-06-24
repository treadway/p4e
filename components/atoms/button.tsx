// components/atoms/Button.tsx
import React, { ReactNode } from "react";
import {
	Pressable,
	Text,
	View,
	PressableStateCallbackType,
} from "react-native";
import { useStyles, createStyleSheet } from "styles";
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
	background: ["On", "Off"],
	icon: ["Off", "Left", "Right", "Only"],
	size: ["Default", "Small"],
	state: ["Active", "Disabled"],
	text: ["On", "Off"],
} as const;

export function Button({
	background,
	icon,
	size,
	state,
	text,
	label,
	iconNode,
	onPress,
	testID,
}: ButtonProps) {
	const { styles } = useStyles(stylesheet);
	// sets up all your variant‐based overrides
	const { vstyles } = useVariants(
		ButtonVariants,
		{ background, icon, size, state, text },
		styles
	);

	const isDisabled = state === "Disabled";

	return (
		<Pressable
			onPress={onPress}
			disabled={isDisabled}
			style={(pressed: PressableStateCallbackType) => [
				...vstyles.root(pressed),
				pressed && !isDisabled && styles.pressed,
			]}
			testID={testID}
		>
			<View style={styles.content}>
				{(icon === "Left" || icon === "Only") && iconNode}
				{text === "On" && icon !== "Only" && (
					<Text style={vstyles.text()}>{label ?? "Button"}</Text>
				)}
				{icon === "Right" && iconNode}
			</View>
		</Pressable>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	// base button
	root: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: theme.button.radii,
		borderWidth: theme.button.border.width,
		borderColor: theme.button.border.color,
		backgroundColor: theme.button.background.default,
		paddingHorizontal: theme.button.padding.horz,
		paddingVertical: theme.button.padding.vert,
		shadowColor: theme.button.shadow.color,
		shadowOffset: {
			width: theme.button.shadow.x,
			height: theme.button.shadow.y,
		},
		shadowRadius: theme.button.shadow.blur,
		shadowOpacity: theme.button.shadow.opacity,
	},

	// simple pressed feedback
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
		color: theme.button.text.default,
	},

	// ─── VARIANT OVERRIDES ────────────────────────────────────────────────────────

	// icon-only, small, background=Off, state=Active
	rootTextOffIconOnlySizeSmallBackgroundOffStateActive: {
		width: theme.button.size.small,
		height: theme.button.size.small,
		paddingHorizontal: 0,
		backgroundColor: theme.button.background.off,
		borderColor: theme.button.border.color,
	},

	// you can fold the similar small-height overrides into one if you like,
	// but here’s each variant explicitly:

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

	// text-size overrides (for small vs default)
	textTextOnIconOffSizeSmallBackgroundOnStateActive: {
		fontSize: theme.typography.fontSize.xs,
	},
	textTextOnIconLeftSizeSmallBackgroundOnStateActive: {
		fontSize: theme.typography.fontSize.xs,
	},
	textTextOnIconRightSizeSmallBackgroundOnStateActive: {
		fontSize: theme.typography.fontSize.xs,
	},

	textTextOnIconOffSizeSmallBackgroundOffStateActive: {
		fontSize: theme.typography.fontSize.xs,
		color: theme.button.text.off,
	},
}));
