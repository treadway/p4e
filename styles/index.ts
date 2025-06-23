// styles/index.ts
import { useColorScheme } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "./theme-context";
import { lightTheme, darkTheme, Theme } from "./themes";

export const useTheme = (): Theme => {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error("useTheme must be used within ThemeProvider");
	}
	return ctx;
};

export function useStyles<T>(input: T | ((theme: Theme) => T)): { styles: T } {
	const theme = useTheme();
	const styles = typeof input === "function" ? input(theme) : input;
	return { styles };
}

export function createStyleSheet<T>(factory: (theme: Theme) => T): () => T {
	return () => {
		const scheme = useColorScheme();
		const theme = scheme === "dark" ? darkTheme : lightTheme;
		return factory(theme);
	};
}
