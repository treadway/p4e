import React, { createContext, useState, useMemo } from "react";
import { Appearance } from "react-native";
import { lightTheme, darkTheme, Theme } from "./themes";

export type ThemeMode = "light" | "dark";

export const ThemeContext = createContext<Theme | null>(null);
export const ThemeModeContext = createContext<{
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
} | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const systemScheme = Appearance.getColorScheme() ?? "light";
	const [mode, setMode] = useState<ThemeMode>(systemScheme);

	const theme = useMemo(() => {
		return mode === "dark" ? darkTheme : lightTheme;
	}, [mode]);

	return (
		<ThemeContext.Provider value={theme}>
			<ThemeModeContext.Provider value={{ mode, setMode }}>
				{children}
			</ThemeModeContext.Provider>
		</ThemeContext.Provider>
	);
};
