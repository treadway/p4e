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
