// styles/tokens.ts
export const tokens = {
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
		bold: "bold",
		regular: "regular",
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
		formHorizontalSmall: 8,
		formVertical: 8,
		formVerticalSmall: 0,
	},
	borderRadius: {
		default: 16,
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
