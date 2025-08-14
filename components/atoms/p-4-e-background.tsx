// components/atoms/p-4-e-background/index.tsx
import { useStyles, createStyleSheet } from "styles";
import { useVariants } from "@/utils/useVariants";
import { View } from "react-native";
import { Image } from "expo-image";

// Import all your background images (add more as needed)
import bottomBackground1 from "assets/images/content/backgrounds/bottom-background-1.png";
import topBackground1 from "assets/images/content/backgrounds/top-background-1.png";
// Future images for MVP+
// import bottomBackground2 from "assets/images/content/bottom-background-2.png";
// import rewardsBackground from "assets/images/content/rewards-background.png";

export interface P4EBackgroundProps {
	position: (typeof P4EBackgroundVariants.position)[number];
	imageVariant?: (typeof P4EBackgroundVariants.imageVariant)[number];
	section?: (typeof P4EBackgroundVariants.section)[number];
	testID?: string;
}

export const P4EBackgroundVariants = {
	position: ["Top", "Bottom"],
	imageVariant: ["1", "2", "3"], // For future different image sets
	section: ["Transportation", "Rewards", "ComingSoon", "About"], // For section-specific backgrounds
} as const;

// Background image mapping (expandable for future)
const backgroundImages = {
	Transportation: {
		Bottom: {
			"1": bottomBackground1,
			// "2": bottomBackground2, // Future
			// "3": bottomBackground3, // Future
		},
		Top: {
			"1": topBackground1, // For now, same image
			// "1": topBackground1, // Future
		},
	},
	Rewards: {
		Bottom: {
			"1": bottomBackground1, // For now, same image
			// "1": rewardsBackground, // Future
		},
		Top: {
			"1": topBackground1, // For now, same image
		},
	},
	ComingSoon: {
		Bottom: {
			"1": bottomBackground1, // For now, same image
		},
		Top: {
			"1": topBackground1, // For now, same image
		},
	},
	About: {
		Bottom: {
			"1": bottomBackground1, // For now, same image
		},
		Top: {
			"1": topBackground1, // For now, same image
		},
	},
};

export function P4EBackground({
	position,
	imageVariant = "1",
	section = "Transportation",
	testID,
}: P4EBackgroundProps) {
	const { styles } = useStyles(stylesheet);
	const { vstyles } = useVariants(
		P4EBackgroundVariants,
		{ position, imageVariant, section },
		styles
	);

	// Get the appropriate image based on section, position, and variant
	const backgroundImage =
		backgroundImages[section]?.[position]?.[imageVariant] || bottomBackground1;

	return (
		<View
			style={[vstyles.root()]}
			testID={
				testID ??
				`p-4-e-background-${position.toLowerCase()}-${section.toLowerCase()}`
			}
		>
			<Image
				source={backgroundImage}
				style={vstyles.image()}
				contentFit="cover"
				testID={`${testID ?? "p-4-e-background"}-image`}
			/>
			<View
				style={vstyles.gradient()}
				testID={`${testID ?? "p-4-e-background"}-gradient`}
			/>
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		position: "absolute",
		width: "100%",
		height: "100%",
		zIndex: 0,
		elevation: 0,
	},

	// Position variants - handles top/bottom positioning internally
	rootPositionTop: {
		top: 0,
		left: 0,
		right: 0,
	},

	rootPositionBottom: {
		bottom: 0,
		left: 0,
		right: 0,
	},

	image: {
		width: "100%",
		height: "100%",
		position: "absolute",
	},

	// Image size variants for different positions
	imagePositionTop: {
		// Could have different sizing for top position
	},

	imagePositionBottom: {
		// Current bottom positioning
	},

	gradient: {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "transparent",
		// Add any gradient overlays here if needed
	},

	// Future: Section-specific gradient variants
	gradientSectionTransportation: {
		// Transportation-specific gradient
	},

	gradientSectionRewards: {
		// Rewards-specific gradient (maybe gold tint?)
	},

	gradientSectionComingSoon: {
		// Coming soon-specific gradient
	},

	gradientSectionAbout: {
		// About-specific gradient
	},

	// Future: Image variant styles
	imageImageVariant1: {
		// Default variant
	},

	imageImageVariant2: {
		// Future variant 2 (maybe different opacity?)
	},

	imageImageVariant3: {
		// Future variant 3
	},
}));
