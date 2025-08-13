// app/(tabs)/index.tsx - Modernized with Theme System
import React from "react";
import { ImageBackground, ScrollView } from "react-native";
import { useStyles, createStyleSheet } from "styles";
import { ParticipantHeader } from "components/organisms/participant-header";

export default function HomeScreen() {
	const { styles } = useStyles(stylesheet);

	return (
		<ScrollView
			testID="(tabs)/index"
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			showsVerticalScrollIndicator={false}
		>
			<ImageBackground
				style={styles.backgroundImage}
				source={require("@/assets/images/content/bottom-background-1.png")}
				resizeMode="cover"
			>
				<ParticipantHeader
					curvedBottom="True"
					edit="True"
					testID="homeParticipantHeader"
				/>

				{/* TODO: Add your other sections here */}
				{/* - Earnings History Card */}
				{/* - Transportation Methods Card */}
				{/* - Recent Activity */}
			</ImageBackground>
		</ScrollView>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	// ─── MAIN LAYOUT ─────────────────────────────────────────────
	container: {
		flex: 1,
		backgroundColor: theme.page.background,
	},

	contentContainer: {
		flexGrow: 1,
		paddingBottom: theme.spacing.navBottom, // Account for tab bar
	},

	backgroundImage: {
		flex: 1,
		minHeight: "100%",
		paddingHorizontal: theme.spacing.lg,
		paddingTop: theme.spacing.xl,
		justifyContent: "flex-start",
		alignItems: "center",
	},

	// ─── ORIGINAL STYLES (THEMED) ────────────────────────────────
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.sm,
	},

	stepContainer: {
		gap: theme.spacing.sm,
	},

	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},

	imagePositionbottomContainerContent: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
	},

	imagePositiontopContainerContent: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
	},

	gradientLayout: {
		backgroundColor: "transparent",
		width: 375,
		height: 780,
		position: "absolute",
	},

	p4ePosition: {
		zIndex: 0,
		width: 374,
		bottom: 0,
		position: "absolute",
		height: 780,
		left: 0,
		overflow: "hidden",
	},

	gradient: {
		top: 648,
		left: 375,
		transform: [{ rotate: "-180deg" }],
	},

	emptyContent1: {
		fontSize: theme.typography.fontSize.base,
		letterSpacing: 0,
		lineHeight: 20,
		fontWeight: theme.typography.fontWeight.bold,
		fontFamily: theme.typography.fontFamily,
		color: theme.colors.success,
		textAlign: "center",
	},

	emptyContent: {
		alignSelf: "stretch",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 1,
		height: 780,
	},

	imagePositionbottom: {
		backgroundColor: theme.colors.background.default,
		width: 360,
		minHeight: 640,
		flex: 1,
		maxWidth: 360,
	},

	imageIcon: {
		top: -273,
		height: 671,
		width: 375,
		left: 0,
		position: "absolute",
	},

	gradient1: {
		top: 0,
		left: 0,
		backgroundColor: "transparent",
	},

	p4eTopBackground: {
		backgroundColor: theme.colors.neutral.page,
	},

	baseview: {
		borderRadius: 5,
		borderStyle: "dashed",
		borderColor: "#9747ff",
		borderWidth: 1,
		width: "100%",
		padding: theme.spacing.lg,
		gap: theme.spacing.xxl,
		overflow: "hidden",
	},
}));
