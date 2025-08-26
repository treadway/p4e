// components/atoms/Divider.tsx
import React from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "styles";

export interface DividerProps {
	color?: string;
	style?: ViewStyle;
	testID?: string;
}

export function Divider({ color, style, testID }: DividerProps) {
	const theme = useTheme();

	return (
		<View
			style={[
				{
					width: "100%",
					height: theme.divider.width,
					backgroundColor: color || theme.divider.color,
				},
				style,
			]}
			testID={testID ?? "Divider"}
		/>
	);
}
