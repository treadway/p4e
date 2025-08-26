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
	variant?: (typeof ButtonVariants.variant)[number];
	label?: string;
	iconNode?: ReactNode;
	iconName?: string; // Add this for testID purposes
	onPress?: () => void;
	testID?: string;
}

export const ButtonVariants = {
	background: ["On", "Off"],
	icon: ["Off", "Left", "Right", "Only"],
	size: ["Default", "Small"],
	state: ["Active", "Disabled"],
	text: ["On", "Off"],
	variant: ["Primary", "Secondary"],
} as const;

export function Button({
	background,
	icon,
	size,
	state,
	text,
	variant = "Primary",
	label = "Button",
	iconNode,
	iconName,
	onPress,
	testID,
}: ButtonProps) {
	const theme = useTheme();
	const { styles } = useStyles(stylesheet);
	const { vstyles } = useVariants(
		ButtonVariants,
		{ background, icon, size, state, text, variant },
		styles
	);

	const isDisabled = state === "Disabled";

	// Get background colors based on variant and background state
	const getBgColor = () => {
		if (isDisabled) {
			return theme.button.background.disabled;
		}

		if (background === "On") {
			return variant === "Primary"
				? theme.button.background.on // tokens.colors.link.light
				: theme.button.background.secondary; // tokens.colors.link.dark
		} else {
			return theme.button.background.off; // tokens.colors.white
		}
	};

	// Get text/icon colors
	const getContentColor = () => {
		if (isDisabled) {
			return theme.colors.disabled;
		}

		if (background === "On") {
			return theme.button.text.on; // tokens.colors.white
		} else {
			// For "Off" background, use the variant color for text/icons
			return variant === "Primary"
				? theme.button.background.on // tokens.colors.link.light
				: theme.button.background.secondary; // tokens.colors.link.dark
		}
	};

	// Get border color
	const getBorderColor = () => {
		if (background === "On") {
			return "transparent";
		}

		if (isDisabled) {
			return theme.colors.disabled;
		}

		// For "Off" background, use variant color for border
		return variant === "Primary"
			? theme.button.background.on // tokens.colors.link.light
			: theme.button.background.secondary; // tokens.colors.link.dark
	};

	const bgColor = getBgColor();
	const contentColor = getContentColor();
	const borderColor = getBorderColor();

	// Build the full variant key including the new variant
	const fullRootKey = `rootText${text}Icon${icon}Size${size}Background${background}State${state}Variant${variant}`;
	const fullOverride = (styles as any)[fullRootKey] || {};

	const fullTextKey = fullRootKey.replace(/^root/, "text");
	const fullTextOverride = (styles as any)[fullTextKey] || {};

	// Create testID suffix with icon name if provided
	const getIconTestID = (position: string) => {
		const baseTestID = testID ?? "Button";
		const iconSuffix = iconName ? `-${iconName}` : "";
		return `${baseTestID}-${position}-icon${iconSuffix}`;
	};

	return (
		<Pressable
			onPress={onPress}
			disabled={isDisabled}
			testID={testID ?? "Button"}
			style={(pressState: PressableStateCallbackType) => [
				vstyles.root(pressState),
				fullOverride,
				{ backgroundColor: bgColor, borderColor },
				pressState.pressed && !isDisabled && styles.pressed,
			]}
		>
			<View style={vstyles.content()}>
				{/* Left icon */}
				{(icon === "Left" || icon === "Only") &&
					iconNode &&
					cloneElement(iconNode as React.ReactElement, {
						color: contentColor,
						fill: contentColor,
						testID: getIconTestID("left"),
					})}

				{/* Label text */}
				{text === "On" && icon !== "Only" && (
					<Text
						style={[
							...vstyles.text(),
							fullTextOverride,
							{ color: contentColor },
						]}
						testID={`${testID ?? "Button"}-text`}
					>
						{label}
					</Text>
				)}

				{/* Right icon */}
				{icon === "Right" &&
					iconNode &&
					cloneElement(iconNode as React.ReactElement, {
						color: contentColor,
						fill: contentColor,
						testID: getIconTestID("right"),
					})}
			</View>
		</Pressable>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	// ——— BASE ——————————————————————————————————————————————————————————————————————————————————————————————————————————
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
		columnGap: theme.spacing.sm,
	},

	text: {
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.fontSize.sm,
		fontWeight: theme.typography.fontWeight.bold,
	},

	// ——— "Icon-Only" OVERRIDES ——————————————————————————————————————————————————————————————————————————————————————
	rootTextOffIconOnlySizeDefaultBackgroundOffStateActiveVariantPrimary: {
		width: theme.button.size.default,
		height: theme.button.size.default,
		paddingHorizontal: theme.button.padding.horzIcon,
		borderRadius: theme.button.size.default,
	},
	rootTextOffIconOnlySizeSmallBackgroundOffStateActiveVariantPrimary: {
		width: theme.button.size.small,
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzIcon,
		borderRadius: theme.button.size.small,
	},
	rootTextOffIconOnlySizeDefaultBackgroundOffStateDisabledVariantPrimary: {
		width: theme.button.size.default,
		height: theme.button.size.default,
		paddingHorizontal: theme.button.padding.horzIcon,
		borderRadius: theme.button.size.default,
	},
	rootTextOffIconOnlySizeSmallBackgroundOffStateDisabledVariantPrimary: {
		width: theme.button.size.small,
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzIcon,
		borderRadius: theme.button.size.small,
	},

	// Secondary variant icon-only overrides
	rootTextOffIconOnlySizeDefaultBackgroundOffStateActiveVariantSecondary: {
		width: theme.button.size.default,
		height: theme.button.size.default,
		paddingHorizontal: theme.button.padding.horzIcon,
		borderRadius: theme.button.size.default,
	},
	rootTextOffIconOnlySizeSmallBackgroundOffStateActiveVariantSecondary: {
		width: theme.button.size.small,
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzIcon,
		borderRadius: theme.button.size.small,
	},
	rootTextOffIconOnlySizeDefaultBackgroundOffStateDisabledVariantSecondary: {
		width: theme.button.size.default,
		height: theme.button.size.default,
		paddingHorizontal: theme.button.padding.horzIcon,
		borderRadius: theme.button.size.default,
	},
	rootTextOffIconOnlySizeSmallBackgroundOffStateDisabledVariantSecondary: {
		width: theme.button.size.small,
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzIcon,
		borderRadius: theme.button.size.small,
	},

	// ——— "Small" SIZE OVERRIDES (text+icon) ————————————————————————————————————————————————————————————————————————
	rootTextOnIconOffSizeSmallBackgroundOnStateActiveVariantPrimary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconOffSizeSmallBackgroundOffStateActiveVariantPrimary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconOffSizeSmallBackgroundOnStateDisabledVariantPrimary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconOffSizeSmallBackgroundOffStateDisabledVariantPrimary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconLeftSizeSmallBackgroundOnStateActiveVariantPrimary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	textTextOnIconLeftSizeSmallBackgroundOnStateActiveVariantPrimary: {
		fontSize: theme.typography.fontSize.xs,
	},

	// Add Secondary variant overrides for small buttons
	rootTextOnIconOffSizeSmallBackgroundOnStateActiveVariantSecondary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconOffSizeSmallBackgroundOffStateActiveVariantSecondary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconLeftSizeSmallBackgroundOnStateActiveVariantSecondary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconLeftSizeSmallBackgroundOffStateActiveVariantSecondary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},

	// Continue with existing overrides but add Secondary variants as needed...
	rootTextOnIconRightSizeSmallBackgroundOnStateActiveVariantPrimary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconLeftSizeSmallBackgroundOffStateActiveVariantPrimary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconRightSizeSmallBackgroundOffStateActiveVariantPrimary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconLeftSizeSmallBackgroundOnStateDisabledVariantPrimary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconRightSizeSmallBackgroundOnStateDisabledVariantPrimary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconLeftSizeSmallBackgroundOffStateDisabledVariantPrimary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconRightSizeSmallBackgroundOffStateDisabledVariantPrimary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},

	// Secondary variant small size overrides
	rootTextOnIconRightSizeSmallBackgroundOnStateActiveVariantSecondary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconRightSizeSmallBackgroundOffStateActiveVariantSecondary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconLeftSizeSmallBackgroundOnStateDisabledVariantSecondary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconRightSizeSmallBackgroundOnStateDisabledVariantSecondary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconLeftSizeSmallBackgroundOffStateDisabledVariantSecondary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
	rootTextOnIconRightSizeSmallBackgroundOffStateDisabledVariantSecondary: {
		height: theme.button.size.small,
		paddingHorizontal: theme.button.padding.horzSm,
	},
}));
