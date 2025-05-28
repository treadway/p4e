// styles/index.ts
import { useColorScheme } from "react-native";
import { tokens } from "./tokens";

const lightTheme = {
	colors: {
		background: tokens.colors.background.default,
		text: tokens.colors.text.default,
		success: tokens.colors.success.light.green,
		neutral: tokens.colors.neutral,
	},
	radii: tokens.radii,
	typography: tokens.typography,
};

const darkTheme = {
	colors: {
		background: tokens.colors.background.dark,
		text: tokens.colors.text.dark,
		success: tokens.colors.success.dark.green,
		neutral: tokens.colors.neutral, // can extend later
	},
	radii: tokens.radii,
	typography: tokens.typography,
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
