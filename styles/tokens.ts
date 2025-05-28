// styles/tokens.ts

export const tokens = {
	colors: {
		background: {
			default: "#FFFFFF",
			dark: "#000000",
		},
		text: {
			default: "#000000",
			dark: "#FFFFFF",
		},
		success: {
			light: {
				green: "rgba(0, 200, 81, 1)",
			},
			dark: {
				green: "rgba(0, 180, 70, 1)",
			},
		},
		neutral: {
			white: {
				"100": "#FFFFFF",
			},
			gray: {
				"80": "#5B5B5B",
			},
		},
	},
	radii: {
		button: 16,
		round: 32,
		participantImage: 64,
	},
	typography: {
		fontFamily: "Work Sans",
		fontSize: {
			sm: 12,
			base: 14,
			lg: 16,
		},
		fontWeight: {
			regular: "400",
			semibold: "600",
			bold: "700",
		},
	},
};
