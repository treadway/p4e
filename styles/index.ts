// styles/index.ts
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme, Theme } from "./themes";

/**
 * Picks lightTheme or darkTheme based on OS setting
 */
export function useTheme(): Theme {
	const scheme = useColorScheme();
	return scheme === "dark" ? darkTheme : lightTheme;
}

/**
 * Hook to build styles objects from a factory function
 */
export function useStyles<T>(factory: T | ((theme: Theme) => T)): {
	styles: T;
} {
	const theme = useTheme();
	const styles =
		typeof factory === "function" ? (factory as any)(theme) : factory;
	return { styles };
}

/**
 *  For static sheets that only need the *light* theme at build-time.
 */
export function createStyleSheet<T>(
	fn: (theme: Theme) => T
): (theme: Theme) => T {
	return fn;
}
