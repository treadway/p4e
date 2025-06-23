// app/providers.tsx
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { ThemeProvider as CustomThemeProvider } from "styles/theme-context";
import { useColorScheme } from "@/hooks/useColorScheme";

export function Providers({ children }: { children: React.ReactNode }) {
	const system = useColorScheme(); // or Appearance.getColorScheme()
	return (
		<CustomThemeProvider>
			<NavigationThemeProvider value={{ dark: system === "dark", colors: {} }}>
				{children}
			</NavigationThemeProvider>
		</CustomThemeProvider>
	);
}
