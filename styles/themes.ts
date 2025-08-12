// styles/themes.ts
import { tokens } from "./tokens";

export interface Theme {
	participantHeader: {
		width: number;
		participantImage: { size: number };
	};
	colors: {
		background: { default: string };
		text: { default: string };
		success: string;
		successDark: string;
		warning: string;
		warningDark: string;
		danger: string;
		dangerDark: string;
		info: string;
		infoDark: string;
		disabled: string;
		neutral: {
			white: string;
			grayLight: string;
			gray: string;
			grayDark: string;
			page: string;
		};
	};
	typography: {
		fontFamily: string;
		fontWeight: { regular: string; bold: string; semibold?: string };
		fontSize: {
			xs: number;
			sm: number;
			base: number;
			lg: number;
			xl: number;
			xxl: number;
		};
		letterSpacing: { default: number };
	};
	spacing: {
		xs: number;
		sm: number;
		md: number;
		lg: number;
		xl: number;
		xxl: number;
		auto: number | string;
		navBottom: number;
	};
	page: {
		width: number;
		background: string;
	};
	button: {
		size: { default: number; small: number };
		padding: { horz: number; vert: number; horzIcon: number; horzSm: number };
		radii: number;
		border: { width: number; style: string; color: string };
		shadow: {
			x: number;
			y: number;
			blur: number;
			spread: number;
			color: string;
		};
		background: { on: string; off: string; disabled: string };
		text: { on: string; off: string };
	};
	card: {
		borderRadius: number;
		shadow: {
			x: number;
			y: number;
			blur: number;
			spread: number;
			color: string;
		};
	};
	nav: {
		shadow: {
			x: number;
			y: number;
			blur: number;
			spread: number;
			color: string;
		};
	};
	textField: {
		shadow: {
			x: number;
			y: number;
			blur: number;
			spread: number;
			color: string;
			type?: string;
		};
	};
	badge: {
		color: string;
		background: string;
		stroke: string;
		size: number;
	};
}

//
// ————————————————————————————————————————————————————
//
// ————— LIGHT THEME ———————————————————————————————————————
//

export const lightTheme: Theme = {
	participantHeader: {
		width: tokens.sizing.base,
		participantImage: { size: tokens.sizing.participantImage },
	},

	colors: {
		background: { default: tokens.colors.background.default },
		text: { default: tokens.colors.text.data },
		success: tokens.colors.success.light,
		successDark: tokens.colors.success.dark,
		warning: tokens.colors.warning.light,
		warningDark: tokens.colors.warning.dark,
		danger: tokens.colors.danger.light,
		dangerDark: tokens.colors.danger.dark,
		info: tokens.colors.info.light,
		infoDark: tokens.colors.info.dark,
		disabled: tokens.colors.disabled,
		neutral: {
			white: tokens.colors.neutral.white["100"],
			grayLight: tokens.colors.black["50"],
			gray: tokens.colors.black["66"],
			grayDark: tokens.colors.black["83"],
			page: tokens.colors.neutral.page,
		},
	},

	typography: {
		fontFamily: tokens.fontFamilies.workSans,
		fontWeight: {
			regular: "400",
			bold: tokens.fontWeights.bold,
			semibold: "600",
		},
		fontSize: {
			xs: tokens.fontSizes.xs,
			sm: tokens.fontSizes.sm,
			base: tokens.fontSizes.base,
			lg: tokens.fontSizes.lg,
			xl: tokens.fontSizes.xl,
			xxl: tokens.fontSizes.xl * 1.25,
		},
		letterSpacing: { default: 0.28 },
	},

	spacing: {
		xs: tokens.spacing.xs,
		sm: tokens.spacing.sm,
		md: tokens.spacing.md,
		lg: tokens.spacing.lg,
		xl: tokens.spacing.xl,
		xxl: tokens.spacing.xxl,
		auto: tokens.spacing.auto,
		navBottom: tokens.spacing.navBottom,
	},

	page: {
		width: tokens.sizing.base,
		background: tokens.colors.neutral.page,
	},

	button: {
		size: {
			default: tokens.sizing.formDefault,
			small: tokens.sizing.formSmall,
		},
		padding: {
			horz: tokens.padding.formHorizontalDefault,
			vert: tokens.padding.formVertical,
			horzIcon: tokens.padding.formVerticalIcon,
			horzSm: tokens.padding.formHorizontalSmall,
		},
		radii: tokens.borderRadius.default,
		border: {
			width: tokens.border.button.width,
			style: tokens.border.button.style,
			color: tokens.border.button.color,
		},
		shadow: {
			x: tokens.shadow.button.x,
			y: tokens.shadow.button.y,
			blur: tokens.shadow.button.blur,
			spread: tokens.shadow.button.spread,
			color: tokens.shadow.button.color,
			pressed: {
				x: 0,
				y: 0,
				blur: 0,
			},
		},
		background: {
			on: tokens.colors.success.light,
			off: tokens.colors.white,
			disabled: tokens.colors.disabled,
		},
		text: {
			on: tokens.colors.white,
			off: tokens.colors.success.light,
		},
	},

	card: {
		borderRadius: tokens.borderRadius.default,
		shadow: {
			x: tokens.shadow.card.x,
			y: tokens.shadow.card.y,
			blur: tokens.shadow.card.blur,
			spread: tokens.shadow.card.spread,
			color: tokens.shadow.card.color,
		},
	},

	nav: {
		shadow: {
			x: tokens.shadow.nav.x,
			y: tokens.shadow.nav.y,
			blur: tokens.shadow.nav.blur,
			spread: tokens.shadow.nav.spread,
			color: tokens.shadow.nav.color,
		},
	},

	textField: {
		shadow: {
			x: tokens.shadow.textField.x,
			y: tokens.shadow.textField.y,
			blur: tokens.shadow.textField.blur,
			spread: tokens.shadow.textField.spread,
			color: tokens.shadow.textField.color,
			type: tokens.shadow.textField.type,
		},
	},

	badge: {
		color: tokens.colors.success.dark,
		background: tokens.colors.neutral.page,
		stroke: "rgba(255, 255, 255, 0.64)",
		size: 32,
	},
};

//
// ————————————————————————————————————————————————————
//
// ————— DARK THEME ———————————————————————————————————————
//

export const darkTheme: Theme = {
	...lightTheme,
	colors: {
		...lightTheme.colors,
		background: { default: "#000000" },
		text: { default: "#FFFFFF" },
		success: tokens.colors.success.dark,
	},
};
