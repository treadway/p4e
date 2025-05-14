import React from "react";
import { View, StyleSheet } from "react-native";

export interface IconProps {
	svg: React.ComponentType<React.SVGProps<SVGSVGElement>>; // SVG component
	color?: string;
	size?: number;
	testID?: string;
}

export function Icon({
	svg: Svg,
	color = "black",
	size = 24,
	testID,
}: IconProps) {
	return (
		<View style={{ width: size, height: size }} testID={testID}>
			<Svg width={size} height={size} fill={color} />
		</View>
	);
}
