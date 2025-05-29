import { useColorScheme } from "react-native";
import { tokens } from "./tokens";

const lightTheme = {
	colors: {
		background: tokens.colors?.background?.default ?? "#FFFFFF",
		text: tokens.colors?.text?.default ?? "#000000",
		success: tokens.colors?.success?.light?.green ?? "#00C851",
		neutral: tokens.colors?.neutral ?? {
			white: { "100": "#FFFFFF" },
			black: { "100": "#000000" },
		},
	},
	radii: {
		button: tokens.radii?.button ?? 16,
	},
	typography: {
		fontFamily: tokens.typography?.font?.family?.default ?? "System",
		fontSize: {
			sm: tokens.typography?.font?.size?.sm ?? 12,
			md: tokens.typography?.font?.size?.md ?? 14,
			lg: tokens.typography?.font?.size?.lg ?? 16,
		},
		fontWeight: {
			normal: tokens.typography?.font?.weight?.regular ?? "400",
			bold: tokens.typography?.font?.weight?.bold ?? "700",
		},
	},
};

const darkTheme = {
	...lightTheme,
	colors: {
		...lightTheme.colors,
		background: tokens.colors?.background?.dark ?? "#000000",
		text: tokens.colors?.text?.dark ?? "#FFFFFF",
		success: tokens.colors?.success?.dark?.green ?? "#729D82",
	},
};

export type Theme = typeof lightTheme;

export function useStyles<T>(input: T | ((theme: Theme) => T)): { styles: T } {
	const scheme = useColorScheme();
	const theme = scheme === "dark" ? darkTheme : lightTheme;
	const styles = typeof input === "function" ? input(theme) : input;
	return { styles };
}

export function createStyleSheet<T>(factory: (theme: Theme) => T): T {
	return factory(lightTheme); // fallback theme
}
