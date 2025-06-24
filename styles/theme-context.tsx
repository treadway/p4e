// styles/theme-context.tsx
import React, {
	createContext,
	useContext,
	useMemo,
	useState,
	useEffect,
} from "react";
import { Appearance } from "react-native";
import { lightTheme, darkTheme, Theme } from "./themes";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
	theme: Theme;
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const colorScheme = (Appearance.getColorScheme() as ThemeMode) || "light";
	const [mode, setMode] = useState<ThemeMode>(colorScheme);

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
	const value = useMemo(() => ({ theme, mode, setMode }), [theme, mode]);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export const useThemeContext = () => {
	const ctx = useContext(ThemeContext);
	if (!ctx)
		throw new Error("useThemeContext must be used within ThemeProvider");
	return ctx;
};
