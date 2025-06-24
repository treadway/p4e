// styles/index.ts
import { useContext } from "react";
import { ThemeContext, ThemeProvider } from "./theme-context";
import { tokens } from "./tokens";

/**
 * Pull out the `theme` object from ThemeContext
 * — this is now a real hook at the top level.
 */
export const useTheme = () => {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error("useTheme must be used within ThemeProvider");
	}
	return ctx.theme;
};

/**
 * A tiny helper: if you pass an object, it’s returned verbatim;
 * if you pass a function, we call it with the theme.
 */
export function useStyles<T>(
	input: T | ((theme: ReturnType<typeof useTheme>) => T)
): { styles: T } {
	const theme = useTheme();
	const styles = typeof input === "function" ? (input as any)(theme) : input;
	return { styles };
}

/**
 * createStyleSheet simply returns your factory back.
 * Don’t call hooks here.
 */
export function createStyleSheet<T>(
	factory: (theme: ReturnType<typeof useTheme>) => T
): (theme: ReturnType<typeof useTheme>) => T {
	return factory;
}

export { ThemeProvider } from "./theme-context";
