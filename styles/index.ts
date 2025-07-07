// styles/index.ts
import { useContext, useColorScheme } from "react-native";
import { ThemeProvider, useTheme as contextUseTheme } from "./theme-context";
import { lightTheme, darkTheme, Theme } from "./themes";

export { ThemeProvider, contextUseTheme as useTheme };

/**
 * Helper to call our real useTheme (from theme-context)
 * or fall back to OS-level light/dark if you ever need it.
 */
export function useStyles<T>(factory: T | ((theme: Theme) => T)): {
	styles: T;
} {
	const theme = contextUseTheme();
	const styles =
		typeof factory === "function" ? (factory as any)(theme) : factory;
	return { styles };
}

export function createStyleSheet<T>(
	fn: (theme: Theme) => T
): (theme: Theme) => T {
	return fn;
}
