// components/atoms/ThemedView.tsx

import { View, type ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
	/** optional overrides for the light / dark theme backgrounds */
	lightColor?: string;
	darkColor?: string;
};

export function ThemedView({
	style,
	lightColor,
	darkColor,
	...otherProps
}: ThemedViewProps) {
	// this will fall back to theme.colors.background if no override is passed
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"background"
	);

	return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
