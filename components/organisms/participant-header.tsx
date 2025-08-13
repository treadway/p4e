// components/organisms/ParticipantHeader.tsx - Using Figma styles + theme
import React from "react";
import { View, Text } from "react-native";
import { useStyles, createStyleSheet } from "styles";
import { useVariants } from "@/utils/useVariants";
import { BadgeParticipant } from "components/atoms/badge-participant";
import { Button } from "components/atoms/button";
import { DataDisplay } from "components/atoms/data-display";
import { ParticipantImage } from "components/atoms/participant-image";
import EditIcon from "@/assets/icons/pencil-fill.svg";
import PlusIcon from "@/assets/icons/plus-circle.svg";
import { Icon } from "components/atoms/icon";

export interface ParticipantHeaderProps {
	curvedBottom: (typeof ParticipantHeaderVariants.curvedBottom)[number];
	edit: (typeof ParticipantHeaderVariants.edit)[number];
	testID?: string;
}

export const ParticipantHeaderVariants = {
	curvedBottom: ["False", "True"],
	edit: ["False", "True"],
} as const;

export function ParticipantHeader({
	curvedBottom,
	edit,
	testID,
}: ParticipantHeaderProps) {
	const { styles } = useStyles(stylesheet);
	const { vstyles } = useVariants(
		ParticipantHeaderVariants,
		{ curvedBottom, edit },
		styles
	);

	return (
		<View
			data-comp="participant-header"
			style={vstyles.root()}
			testID={testID ?? "participant-header"}
		>
			{/* Top circle with participant image + badge */}
			<View style={vstyles.participant()} testID="participant">
				<View style={vstyles.imageAndBadge()} testID="imageAndBadge">
					<ParticipantImage
						uri={require("assets/images/content/running-city-park.png")}
						testID="participantImage"
					/>
					<View style={vstyles.levelBadge()} testID="levelBadge">
						<BadgeParticipant testID="badgeParticipant" />
					</View>
				</View>
			</View>

			{/* Card with info */}
			<View style={vstyles.participantInfo()} testID="participantInfo">
				<View style={vstyles.topInfo()} testID="topInfo">
					<View style={vstyles.points()} testID="points">
						<DataDisplay
							iconPosition="Left"
							size="Small"
							testID="dataDisplay"
						/>
					</View>
					<View style={vstyles.getPoints()} testID="getPoints">
						<Button
							background="On"
							icon="Left"
							size="Small"
							state="Active"
							text="On"
							label="Get Points"
							iconNode={<Icon svg={PlusIcon} size={14} stroke={1} />}
							testID="getPointsButton"
						/>
					</View>
				</View>

				<View style={vstyles.participantName()} testID="participantName">
					<Text style={vstyles.gusSlomecki()} testID="nameText">
						Gus Slomecki
					</Text>
					<Text style={vstyles.earthHero()} testID="subtitleText">
						Earth Hero
					</Text>
				</View>
			</View>

			{/* Bottom decorative circle */}
			<View style={vstyles.bottomCircle()} testID="bottomCircle">
				<View style={vstyles.bottomCircle2()} testID="bottomCircle2" />
			</View>

			{/* Floating edit button */}
			<View style={vstyles.editButtonWrapper()} testID="editButtonWrapper">
				<Button
					background="Off"
					icon="Only"
					size="Small"
					state="Active"
					text="Off"
					iconNode={<Icon svg={EditIcon} size={14} />}
					testID="editButton"
				/>
			</View>
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	// ─── FIGMA BASE STYLES (THEMED) ──────────────────────────────
	root: {
		width: theme.participantHeader.width, // Use theme value
		paddingTop: theme.spacing.xxl, // 32 → theme value
		flexDirection: "column",
		alignItems: "center",
	},

	rootCurvedBottomTrueEditTrue: {
		height: 384,
		flexShrink: 0,
	},

	participant: {
		flexDirection: "row",
		width: theme.participantHeader.participantImage.size, // 128 → theme value
		justifyContent: "center",
		alignItems: "center",
		shadowColor: theme.card.shadow.color, // Themed shadow
		shadowRadius: theme.card.shadow.blur,
		zIndex: 2,
		shadowOffset: {
			width: theme.card.shadow.x,
			height: theme.card.shadow.y,
		},
	},

	imageAndBadge: {
		width: theme.participantHeader.participantImage.size, // 128 → theme value
		height: theme.participantHeader.participantImage.size,
		position: "absolute",
		top: -theme.participantHeader.participantImage.size / 2, // -64 → calculated
		zIndex: 10,
		alignItems: "center",
		justifyContent: "center",
	},

	levelBadge: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: theme.badge.size, // 32 → theme value
		height: theme.badge.size,
		justifyContent: "center",
		alignItems: "center",
	},

	participantInfo: {
		paddingHorizontal: theme.spacing.md, // 12 → theme value
		flexDirection: "column",
		alignItems: "center",
		alignSelf: "stretch",
		borderTopLeftRadius: theme.card.borderRadius, // 16 → theme value
		borderTopRightRadius: theme.card.borderRadius,
		backgroundColor: theme.colors.background.default, // Themed background
		shadowColor: theme.card.shadow.color, // Themed shadow
		shadowRadius: theme.card.shadow.blur,
		shadowOffset: {
			width: theme.card.shadow.x,
			height: theme.card.shadow.y,
		},
	},

	topInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		alignSelf: "stretch",
		height: 48, // Keep Figma value
	},

	points: {
		flexDirection: "column",
		alignItems: "flex-start",
		rowGap: theme.spacing.sm, // 8 → theme value
		columnGap: theme.spacing.sm,
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: 0,
	},

	pointsCurvedBottomTrueEditTrue: {
		height: 24,
	},

	getPoints: {
		flexDirection: "column",
		alignItems: "flex-end",
		rowGap: theme.spacing.sm, // 8 → theme value
		columnGap: theme.spacing.sm,
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: 0,
	},

	getPointsCurvedBottomTrueEditTrue: {
		height: 24,
	},

	gusSlomecki: {
		alignSelf: "stretch",
		color: theme.colors.text.default, // Themed text color
		textAlign: "center",
		fontFamily: theme.typography.fontFamily, // Themed font
		fontSize: theme.typography.fontSize.base, // 16 → theme value
		fontWeight: theme.typography.fontWeight.bold, // 700 → theme value
	},

	earthHero: {
		color: theme.colors.successDark, // Themed success color
		textAlign: "center",
		fontFamily: theme.typography.fontFamily, // Themed font
		fontSize: theme.typography.fontSize.sm, // 14 → theme value
		fontWeight: theme.typography.fontWeight.regular, // 600 → closest theme value
		letterSpacing: theme.typography.letterSpacing.default, // 0.28 → theme value
	},

	participantName: {
		paddingTop: theme.spacing.sm, // 8 → theme value
		paddingBottom: theme.spacing.lg, // 16 → theme value
		flexDirection: "column",
		alignItems: "center",
		alignSelf: "stretch",
	},

	participantNameCurvedBottomTrueEditTrue: {
		rowGap: theme.spacing.xl, // 24 → theme value
		columnGap: theme.spacing.xl,
	},

	bottomCircle: {
		flexDirection: "row",
		width: 278, // Keep Figma value for now
		height: 32,
		justifyContent: "center",
		alignItems: "flex-start",
		rowGap: theme.spacing.sm, // 8 → theme value
		columnGap: theme.spacing.sm,
		position: "absolute",
		left: 41,
		bottom: -32, // Use Figma value
		overflow: "hidden",
	},

	bottomCircleCurvedBottomTrueEditFalse: {
		paddingBottom: theme.spacing.sm, // 8 → theme value
		justifyContent: "space-between",
		alignItems: "flex-end",
		alignSelf: "stretch",
	},

	bottomCircleCurvedBottomTrueEditTrue: {
		paddingBottom: theme.spacing.sm, // 8 → theme value
		justifyContent: "space-between",
		alignItems: "flex-end",
		flexShrink: 0,
		alignSelf: "stretch",
	},

	bottomCircle2: {
		width: 278, // Keep Figma value for now
		height: 278,
		aspectRatio: 1,
		position: "absolute",
		top: -255, // Keep Figma calculation
		borderRadius: 278, // Keep as circle
		backgroundColor: theme.colors.background.default, // Themed background
		shadowColor: theme.card.shadow.color, // Themed shadow
		shadowRadius: theme.card.shadow.blur,
		shadowOffset: {
			width: theme.card.shadow.x,
			height: theme.card.shadow.y,
		},
	},

	bottomCircle2CurvedBottomTrueEditFalse: {
		padding: theme.spacing.sm, // 8 → theme value
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center",
		rowGap: theme.spacing.sm,
		columnGap: theme.spacing.sm,
	},

	bottomCircle2CurvedBottomTrueEditTrue: {
		padding: theme.spacing.sm, // 8 → theme value
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center",
		rowGap: theme.spacing.sm,
		columnGap: theme.spacing.sm,
	},

	editButtonWrapper: {
		position: "absolute",
		bottom: theme.spacing.md, // Position from theme
		right: theme.spacing.md,
		zIndex: 20,
	},
}));
