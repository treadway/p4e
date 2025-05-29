import { useColorScheme } from "react-native";
import { tokens } from "./tokens";

const lightTheme = {
	colors: {
		background: tokens.colors?.background?.default ?? "#FFFFFF",
		text: tokens.colors?.text?.default ?? "#000000",
		success: tokens.colors?.success?.light?.green ?? "#00C851",
		neutral: tokens.colors?.neutral ?? {
			white: { "100": "#FFFFFF" },
			black: { "100": "#000000" },
		},
	},
	button: {
		size: {
			default: tokens.sizing?.formDefault ?? 40,
			small: tokens.sizing?.formSmall ?? 24,
		},
		radii: tokens.borderRadius?.default ?? 16,
		padding: {
			horz: tokens.padding?.formHorizontalDefault ?? 16,
			horzSmall: tokens.padding?.formHorizontalSmall ?? 8,
			vert: tokens.padding?.formVertical ?? 8,
		},
		border: {
			width: tokens.border?.button?.width ?? 1,
			color: tokens.border?.button?.color ?? "#00C851",
			style: tokens.border?.button?.style ?? "inside",
		},
		shadow: tokens.shadow?.button ?? {
			x: 1,
			y: 2,
			blur: 2,
			spread: 0,
			color: "rgba(0,0,0,0.20)",
		},
	},
	card: {
		shadow: tokens.shadow?.card ?? {
			x: 0,
			y: 0,
			blur: 4,
			spread: 0,
			color: "rgba(0,0,0,0.25)",
		},
	},
	nav: {
		shadow: tokens.shadow?.nav ?? {
			x: 0,
			y: 0,
			blur: 8,
			spread: 0,
			color: "rgba(0,0,0,0.25)",
		},
	},
	textField: {
		shadow: tokens.shadow?.textField ?? {
			x: 1,
			y: 2,
			blur: 2,
			spread: 0,
			color: "rgba(0,0,0,0.20)",
			type: "inner",
		},
	},
	typography: {
		fontFamily: tokens.typography?.font?.family?.default ?? "System",
		fontSize: {
			sm: tokens.typography?.label ?? 12,
			md: tokens.typography?.subtitle ?? 14,
			lg: tokens.typography?.titleSmall ?? 16,
		},
		fontWeight: {
			normal: tokens.typography?.font?.weight?.regular ?? "400",
			bold: tokens.typography?.font?.weight?.bold ?? "700",
		},
	},
	spacing: {
		xs: tokens.spacing?.xs ?? 4,
		sm: tokens.spacing?.sm ?? 8,
		md: tokens.spacing?.md ?? 12,
		lg: tokens.spacing?.lg ?? 16,
		xl: tokens.spacing?.xl ?? 24,
		xxl: tokens.spacing?.xxl ?? 32,
		navBottom: tokens.spacing?.navBottom ?? 84,
		auto: tokens.spacing?.auto ?? "auto",
	},
};

const darkTheme = {
	...lightTheme,
	colors: {
		...lightTheme.colors,
		background: tokens.colors?.background?.dark ?? "#000000",
		text: tokens.colors?.text?.dark ?? "#FFFFFF",
		success: tokens.colors?.success?.dark?.green ?? "#729D82",
	},
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
