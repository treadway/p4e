// components/atoms/ThemedText.tsx
import { Text, type TextProps } from "react-native";
import { useTheme } from "styles";

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
	style,
	lightColor,
	darkColor,
	type = "default",
	...rest
}: ThemedTextProps) {
	const theme = useTheme();
	const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

	// pull sizes/weights from theme.typography
	const typography = {
		default: {
			fontSize: theme.typography.fontSize.default,
			lineHeight: theme.typography.lineHeight.default,
			fontWeight: theme.typography.fontWeight.regular,
		},
		defaultSemiBold: {
			fontSize: theme.typography.fontSize.default,
			lineHeight: theme.typography.lineHeight.default,
			fontWeight: theme.typography.fontWeight.bold,
		},
		title: {
			fontSize: theme.typography.fontSize.title,
			lineHeight: theme.typography.lineHeight.title,
			fontWeight: theme.typography.fontWeight.bold,
		},
		subtitle: {
			fontSize: theme.typography.fontSize.small,
			lineHeight: theme.typography.lineHeight.default,
			fontWeight: theme.typography.fontWeight.bold,
		},
		link: {
			fontSize: theme.typography.fontSize.default,
			lineHeight: theme.typography.lineHeight.default,
			fontWeight: theme.typography.fontWeight.bold,
			textDecorationLine: "underline",
		},
	}[type];

	return <Text {...rest} style={[{ color }, typography, style]} />;
}
