import { useColorScheme } from "react-native";

const lightTheme = {
	background: "#fff",
	text: "#000",
};

const darkTheme = {
	background: "#000",
	text: "#fff",
};

export function useStyles<T>(input: T | ((theme: typeof lightTheme) => T)): {
	styles: T;
} {
	const scheme = useColorScheme();
	const theme = scheme === "dark" ? darkTheme : lightTheme;

	const styles = typeof input === "function" ? (input as any)(theme) : input;

	return { styles };
}

export function createStyleSheet<T>(
	factory: (theme: typeof lightTheme) => T
): T {
	return factory(lightTheme); // Optional: apply a default theme statically
}
