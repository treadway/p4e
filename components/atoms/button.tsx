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

	// ① compute colors from theme + on/off/disabled
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

	// build the full N-axis variant key
	const fullRootKey = `rootText${text}Icon${icon}Size${size}Background${background}State${state}`;
	const fullOverride = (styles as any)[fullRootKey] || {};

	const fullTextKey = fullRootKey.replace(/^root/, "text");
	const fullTextOverride = (styles as any)[fullTextKey] || {};

	return (
		<Pressable
			data-comp="button"
			onPress={onPress}
			disabled={isDisabled}
			testID={testID}
			style={(state: PressableStateCallbackType) => [
				vstyles.root(state),
				fullOverride,
				{ backgroundColor: bgColor, borderColor },
				state.pressed && !isDisabled && styles.pressed,
			]}
		>
			<View style={vstyles.content()}>
				{/* left icon */}
				{(icon === "Left" || icon === "Only") &&
					iconNode &&
					cloneElement(iconNode as React.ReactElement, {
						color: contentColor,
					})}
				{/* label */}
				{text === "On" && icon !== "Only" && (
					<Text
						style={[
							...vstyles.text(),
							fullTextOverride,
							{ color: contentColor },
						]}
					>
						{label}
					</Text>
				)}
				{/* right icon */}
				{icon === "Right" &&
					iconNode &&
					cloneElement(iconNode as React.ReactElement, {
						color: contentColor,
						userSelect: "none",
					})}
			</View>
		</Pressable>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	// ─── BASE ─────────────────────────────────────────────────────
	root: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: theme.button.size.default,
		paddingHorizontal: theme.button.padding.horz,
		paddingVertical: theme.button.padding.vert,
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
		shadowOffset: {
			width: theme.button.shadow.pressed.x,
			height: theme.button.shadow.pressed.y,
		},
		shadowRadius: theme.button.shadow.pressed.blur,
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
	},

	// ─── “Icon-Only” OVERRIDES ─────────────────────────────────────────────
	rootTextOffIconOnlySizeDefaultBackgroundOffStateActive: {
		width: theme.button.size.default,
		height: theme.button.size.default,
		paddingHorizontal: theme.button.padding.horzIcon,
		borderRadius: theme.button.size.default,
	},
	rootTextOffIconOnlySizeSmallBackgroundOffStateActive: {
		width: theme.button.size.small,
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzIcon,
		borderRadius: theme.button.size.small,
	},
	rootTextOffIconOnlySizeDefaultBackgroundOffStateDisabled: {
		width: theme.button.size.default,
		height: theme.button.size.default,
		paddingHorizontal: theme.button.padding.horzIcon,
		borderRadius: theme.button.size.default,
	},
	rootTextOffIconOnlySizeSmallBackgroundOffStateDisabled: {
		width: theme.button.size.small,
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzIcon,
		borderRadius: theme.button.size.small,
	},

	// ─── “Small” SIZE OVERRIDES (text+icon) ────────────────────────────────
	rootTextOnIconOffSizeSmallBackgroundOnStateActive: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconOffSizeSmallBackgroundOffStateActive: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconOffSizeSmallBackgroundOnStateDisabled: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconOffSizeSmallBackgroundOffStateDisabled: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconLeftSizeSmallBackgroundOnStateActive: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	textTextOnIconLeftSizeSmallBackgroundOnStateActive: {
		fontSize: theme.typography.fontSize.xs,
	},
	rootTextOnIconRightSizeSmallBackgroundOnStateActive: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconLeftSizeSmallBackgroundOffStateActive: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconRightSizeSmallBackgroundOffStateActive: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconLeftSizeSmallBackgroundOnStateDisabled: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconRightSizeSmallBackgroundOnStateDisabled: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconLeftSizeSmallBackgroundOffStateDisabled: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconRightSizeSmallBackgroundOffStateDisabled: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
}));
