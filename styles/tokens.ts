// styles/tokens.ts

// import { TokenSystem } from "./token-types";

// styles/token-types.ts
export interface FontSizes {
	xs: number;
	sm: number;
	base: number;
	lg: number;
	xl: number;
}

export interface FontFamilies {
	satoshi: string;
	workSans: string;
}

export interface TextDecoration {
	underline: string;
}

export interface FontWeights {
	bold: string;
	regular: string;
}

export interface ColorScale {
	16: string;
	33: string;
	50: string;
	66: string;
	83: string;
	100: string;
}

export interface ColorVariant {
	light: string;
	dark: string;
}

export interface BackgroundColors {
	default: string;
	complementary1: string;
	complementary2: string;
	complementary3: string;
	complementary4: string;
	complementary5: string;
	modal: string;
}

export interface TextColors {
	title: string;
	subtitle: string;
	data: string;
}

export interface NeutralColors {
	white: {
		"100": string;
	};
	page: string;
}

export interface SuccessColors {
	light: string;
	dark: string;
}

export interface Colors {
	green: {
		dark: ColorScale;
		light: ColorScale;
	};
	black: {
		4: string;
		8: string;
		16: string;
		33: string;
		50: string;
		66: string;
		83: string;
		100: string;
	};
	danger: ColorVariant;
	warning: ColorVariant;
	link: ColorVariant;
	info: ColorVariant;
	background: BackgroundColors;
	text: TextColors;
	disabled: string;
	white: string;
	success: SuccessColors;
	neutral: NeutralColors;
}

export interface Spacing {
	none: number;
	xs: number;
	sm: number;
	md: number;
	lg: number;
	xl: number;
	xxl: number;
	navBottom: number;
	auto: string | number;
}

export interface Padding {
	formHorizontalDefault: number;
	formVertical: number;
	formHorizontalSmall: number;
	formVerticalIcon: number;
}

export interface BorderRadius {
	default: number;
	image: number;
	sheet: number[];
}

export interface Sizing {
	base: number;
	formDefault: number;
	formSmall: number;
	participantImage: number;
	badge: number;
}

export interface ButtonBorder {
	width: number;
	color: string;
	style: string;
}

export interface Border {
	button: ButtonBorder;
}

export interface ShadowConfig {
	x: number;
	y: number;
	blur: number;
	spread: number;
	color: string;
	opacity?: number;
	type?: string;
}

export interface Shadow {
	card: ShadowConfig;
	nav: Omit<ShadowConfig, "opacity">;
	button: Omit<ShadowConfig, "opacity">;
	textField: ShadowConfig & {
		type: string;
	};
}

export interface TypographyStyle {
	fontFamily: string;
	fontWeight: string;
	fontSize?: number;
}

export interface Typography {
	label: TypographyStyle & { fontSize: number };
	labelDeselected: TypographyStyle & { fontSize: number };
	titleDefault: TypographyStyle & { fontSize: number };
	titleSmall: TypographyStyle & { fontSize: number };
	subtitle: TypographyStyle & { fontSize: number };
	link: Omit<TypographyStyle, "fontSize">;
}

export interface TokenSystem {
	fontSizes: FontSizes;
	fontFamilies: FontFamilies;
	textDecoration: TextDecoration;
	fontWeights: FontWeights;
	colors: Colors;
	spacing: Spacing;
	padding: Padding;
	borderRadius: BorderRadius;
	sizing: Sizing;
	border: Border;
	shadow: Shadow;
	typography: Typography;
}

// Export the individual interfaces for component-specific typing
export type {
	FontSizes,
	FontFamilies,
	TextDecoration,
	FontWeights,
	ColorScale,
	ColorVariant,
	BackgroundColors,
	TextColors,
	NeutralColors,
	SuccessColors,
	Colors,
	Spacing,
	Padding,
	BorderRadius,
	Sizing,
	ButtonBorder,
	Border,
	ShadowConfig,
	Shadow,
	TypographyStyle,
	Typography,
};

//
// ————————————————————————————————————————————————————
//
// ————— TOKENS ———————————————————————————————————————
//

export const tokens: TokenSystem = {
	fontSizes: {
		xs: 12,
		sm: 14,
		base: 16,
		lg: 24,
		xl: 32,
	},
	fontFamilies: {
		satoshi: "Satoshi",
		workSans: "Work Sans",
	},
	textDecoration: {
		underline: "underline",
	},
	fontWeights: {
		regular: "400",
		semibold: "600",
		bold: "700",
	},
	colors: {
		green: {
			dark: {
				16: "#F8FBEC",
				33: "#F1F6D9",
				50: "#E2EFB5",
				66: "#D4E692",
				83: "#C5DE72",
				100: "#C1D952",
			},
			light: {
				16: "#F5F7F6",
				33: "#E9F0EC",
				50: "#D4E1D9",
				66: "#AAC4B4",
				83: "#81A790",
				100: "#457C57",
			},
		},
		black: {
			4: "#f5f5f5",
			8: "#ebebeb",
			16: "#E1E1E1",
			33: "#C5C5C5",
			50: "#8E8E8E",
			66: "#5B5B5B",
			83: "#2D2D2D",
			100: "#000000",
		},
		danger: {
			light: "#FA4343",
			dark: "#CC0000",
		},
		warning: {
			light: "#FFBB33",
			dark: "#FF8800",
		},
		link: {
			light: "#00C851",
			dark: "#007E33",
		},
		info: {
			light: "#33B5E5",
			dark: "#0099CC",
		},
		background: {
			default: "#FFFFFF",
			complementary1: "#D8E9EB",
			complementary2: "#D8EBDF",
			complementary3: "#EBDCD8",
			complementary4: "#EBE3D8",
			complementary5: "#E2D8EB",
			modal: "rgba(0, 0, 0, 0.35)",
		},
		text: {
			title: "#000000",
			subtitle: "#2D2D2D",
			data: "#5B5B5B",
		},
		disabled: "#729D82",
		white: "#FFFFFF",
		success: {
			light: "#00C851",
			dark: "#007E33",
		},
		neutral: {
			white: {
				"100": "#FFFFFF",
			},
			page: "#ededed",
		},
	},
	spacing: {
		none: 0,
		xs: 4,
		sm: 8,
		md: 12,
		lg: 16,
		xl: 24,
		xxl: 32,
		navBottom: 84,
		auto: "auto",
	},
	padding: {
		formHorizontalDefault: 16,
		formVertical: 8,
		formHorizontalSmall: 8,
		formVerticalIcon: 0,
	},
	borderRadius: {
		default: 20,
		image: 12,
		sheet: [16, 16, 0, 0],
	},
	sizing: {
		base: 360,
		formDefault: 40,
		formSmall: 24,
		participantImage: 128,
		badge: 32,
	},
	border: {
		button: {
			width: 1,
			color: "#00C851",
			style: "inside",
		},
	},
	shadow: {
		card: {
			x: 0,
			y: 0,
			blur: 4,
			spread: 0,
			color: "rgba(0,0,0,0.25)",
			opacity: 1,
		},
		nav: {
			x: 0,
			y: 0,
			blur: 8,
			spread: 0,
			color: "rgba(0,0,0,0.25)",
		},
		button: {
			x: 1,
			y: 2,
			blur: 2,
			spread: 0,
			color: "rgba(0,0,0,0.20)",
		},
		textField: {
			x: 1,
			y: 2,
			blur: 2,
			spread: 0,
			color: "rgba(0,0,0,0.20)",
			type: "inner",
		},
	},
	typography: {
		label: {
			fontFamily: "Work Sans",
			fontWeight: "Bold",
			fontSize: 12,
		},
		labelDeselected: {
			fontFamily: "Work Sans",
			fontWeight: "Regular",
			fontSize: 12,
		},
		titleDefault: {
			fontFamily: "Work Sans",
			fontWeight: "Bold",
			fontSize: 32,
		},
		titleSmall: {
			fontFamily: "Work Sans",
			fontWeight: "Bold",
			fontSize: 16,
		},
		subtitle: {
			fontFamily: "Work Sans",
			fontWeight: "Regular",
			fontSize: 14,
		},
		link: {
			fontFamily: "Satoshi",
			fontWeight: "Bold",
		},
	},
};
