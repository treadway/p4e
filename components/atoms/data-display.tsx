// components/atoms/DataDisplay.tsx
import React from "react";
import { View, Text, ViewStyle } from "react-native";
import { useTheme, useStyles, createStyleSheet } from "styles";
import { useVariants } from "@/utils/useVariants";
import { Icon } from "components/atoms/icon";
import TreeSvg from "assets/icons/tree-fill.svg";

export interface DataDisplayProps {
	iconPosition: (typeof DataDisplayVariants.iconPosition)[number];
	size: (typeof DataDisplayVariants.size)[number];
	value?: string | number;
	label?: string;
	iconName?: string;
	testID?: string;
	style?: ViewStyle;
}

export const DataDisplayVariants = {
	iconPosition: ["Left", "Right"],
	size: ["Small", "Default"],
} as const;

export function DataDisplay({
	iconPosition,
	size,
	value = "Data",
	label,
	iconName = "tree",
	testID,
	style,
}: DataDisplayProps) {
	const theme = useTheme();
	const { styles } = useStyles(stylesheet);
	const { vstyles } = useVariants(
		DataDisplayVariants,
		{ iconPosition, size },
		styles
	);

	const displayValue =
		typeof value === "number" ? value.toLocaleString() : value;

	const iconTestID = testID
		? `${testID}-icon-${iconName}`
		: `DataDisplay-icon-${iconName}`;

	return (
		<View style={[vstyles.root(), style]} testID={testID ?? "DataDisplay"}>
			{iconPosition === "Left" && (
				<Icon
					svg={TreeSvg}
					size={theme.dataDisplay.icon.size}
					color={theme.dataDisplay.icon.color}
					testID={iconTestID}
				/>
			)}

			<Text
				style={vstyles.valueText()}
				testID={`${testID ?? "DataDisplay"}-value`}
			>
				{displayValue}
			</Text>

			{iconPosition === "Right" && (
				<Icon
					svg={TreeSvg}
					size={theme.dataDisplay.icon.size}
					color={theme.dataDisplay.icon.color}
					testID={iconTestID}
				/>
			)}
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "left",
		paddingHorizontal: theme.dataDisplay.padding.horizontal,
		paddingVertical: theme.dataDisplay.padding.vertical,
		borderRadius: theme.dataDisplay.borderRadius,
		backgroundColor: theme.dataDisplay.background.color,
		borderWidth: theme.button.border.width,
		borderStyle: theme.button.border.style,
		borderColor: theme.button.border.color,
		gap: theme.spacing.xs,
		alignSelf: "flex-start",
	},

	valueText: {
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.fontSize.sm,
		fontWeight: theme.typography.fontWeight.bold,
		color: theme.dataDisplay.text.color,
	},

	rootIconPositionLeftSizeSmall: {
		paddingHorizontal: theme.dataDisplay.padding.horizontal * 0.75,
		paddingVertical: theme.dataDisplay.padding.vertical * 0.75,
	},

	rootIconPositionRightSizeSmall: {
		paddingHorizontal: theme.dataDisplay.padding.horizontal * 0.75,
		paddingVertical: theme.dataDisplay.padding.vertical * 0.75,
	},

	valueTextIconPositionLeftSizeSmall: {
		fontSize: theme.typography.fontSize.xs,
	},

	valueTextIconPositionRightSizeSmall: {
		fontSize: theme.typography.fontSize.xs,
	},
}));
