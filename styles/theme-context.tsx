// styles/theme-context.tsx
import React, {
	createContext,
	useState,
	useEffect,
	useMemo,
	useContext,
} from "react";
import { Appearance } from "react-native";
import { lightTheme, darkTheme, Theme } from "./themes";

type ThemeMode = "light" | "dark";

export interface ThemeContextType {
	theme: Theme;
	mode: ThemeMode;
	setMode: (m: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
	children,
}) => {
	const initial = (Appearance.getColorScheme() as ThemeMode) || "light";
	const [mode, setMode] = useState<ThemeMode>(initial);

	useEffect(() => {
		const sub = Appearance.addChangeListener(({ colorScheme }) => {
			if (colorScheme) setMode(colorScheme as ThemeMode);
		});
		return () => sub.remove();
	}, []);

	const theme = useMemo(
		() => (mode === "dark" ? darkTheme : lightTheme),
		[mode]
	);

	return (
		<ThemeContext.Provider value={{ theme, mode, setMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

/**
 * Our single source-of-truth hook.
 * Must be called under <ThemeProvider>.
 */
export function useTheme(): Theme {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return ctx.theme;
}
