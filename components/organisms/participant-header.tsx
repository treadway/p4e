import { useStyles, createStyleSheet } from "styles";
// import { useVariants } from "react-exo/utils";
import { useVariants } from "@/utils/useVariants";
import { View, Text } from "react-native";
import { BadgeParticipant } from "components/atoms/badge-participant";
import { Button } from "components/atoms/button";
import { DataDisplay } from "components/atoms/data-display";
import { ParticipantImage } from "components/atoms/participant-image";
import EditIcon from "@/assets/icons/pencil-fill.svg";
import { Icon } from "@/components/atoms/icon";
import { useTheme } from "styles";

export interface ParticipantHeaderProps {
	curvedBottom: (typeof ParticipantHeaderVariants.curvedBottom)[number];
	edit: (typeof ParticipantHeaderVariants.edit)[number];
	/** Used to locate this view in end-to-end tests. */
	testID?: string;
}

export const ParticipantHeaderVariants = {
	curvedBottom: ["False", "True"],
	edit: ["False", "True"],
} as const;

export function ParticipantHeader(props: ParticipantHeaderProps) {
	const { curvedBottom, edit } = props;
	const { styles } = useStyles(stylesheet);
	const theme = useTheme();
	const { vstyles } = useVariants(
		ParticipantHeaderVariants,
		{ curvedBottom, edit },
		styles
	);

	return (
		<View style={vstyles.root()} testID={props.testID ?? "77:34880"}>
			<View style={vstyles.participant()} testID="68:12858"></View>
			<View style={vstyles.participantInfo()} testID="68:12932">
				<View style={vstyles.topInfo()} testID="68:12933">
					<View style={vstyles.points()} testID="70:13824">
						<DataDisplay testID="68:12934" iconPosition="Left" size="Small" />
					</View>
					<View style={vstyles.imageAndBadge()} testID="68:12988">
						<ParticipantImage
							uri={require("assets/images/content/running-city-park.png")}
							testID="68:12991"
						/>
						<View style={vstyles.levelBadge()} testID="114:188857">
							<BadgeParticipant testID="114:188858" />
						</View>
					</View>
					<View style={vstyles.getPoints()} testID="70:13787">
						<Button
							testID="68:12935"
							background="On"
							icon="Left"
							size="Small"
							state="Active"
							text="On"
						/>
					</View>
				</View>
				<View style={vstyles.participantName()} testID="68:12936">
					<Text style={vstyles.gusSlomecki()} testID="68:12937">
						{`Gus Slomecki`}
					</Text>
					<Text style={vstyles.earthHero()} testID="68:12938">
						{`Earth Hero`}
					</Text>
				</View>
			</View>
			<View style={vstyles.bottomCircle()} testID="70:24979">
				<View style={vstyles.bottomCircle2()} testID="70:24620"></View>
			</View>
			<Button
				background="Off"
				icon="Only"
				size="Small"
				state="Active"
				text="Off"
				iconNode={
					<Icon svg={EditIcon} color={theme.colors.success} size={14} />
				}
			/>
		</View>
	);
}

const { styles } = useStyles(
	createStyleSheet((theme) => ({
		root: {
			width: theme.participantHeader.width,
			paddingTop: theme.spacing.xl,
			flexDirection: "column",
			alignItems: "center",
		},

		rootCurvedBottomTrueEditTrue: {
			height: 384,
			flexShrink: 0,
		},

		participant: {
			flexDirection: "row",
			width: theme.participantHeader.participantImage.size,
			justifyContent: "center",
			alignItems: "center",
			shadowColor: theme.card.shadow.color,
			shadowRadius: theme.card.shadow.blur,
			shadowOffset: {
				width: theme.card.shadow.x,
				height: theme.card.shadow.y,
			},
		},

		imageAndBadge: {
			width: theme.participantHeader.participantImage.size,
			height: theme.participantHeader.participantImage.size,
			position: "absolute",
			top: -theme.participantHeader.participantImage.size / 2,
			zIndex: 10,
			alignItems: "center",
			justifyContent: "center",
		},

		levelBadge: {
			position: "absolute",
			bottom: 0,
			right: 0,
			width: theme.button.size.small,
			height: theme.button.size.small,
			justifyContent: "center",
			alignItems: "center",
		},

		participantInfo: {
			paddingHorizontal: theme.spacing.md,
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			alignSelf: "stretch",
			borderTopLeftRadius: theme.button.radii,
			borderTopRightRadius: theme.button.radii,
			backgroundColor: theme.colors.background,
			shadowColor: theme.card.shadow.color,
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
			justifyContent: "center",
			alignSelf: "stretch",
			height: 48,
		},

		points: {
			flexDirection: "column",
			alignItems: "flex-start",
			rowGap: theme.spacing.sm,
			columnGap: theme.spacing.sm,
			flexGrow: 1,
			flexShrink: 0,
			flexBasis: 0,
		},

		pointsCurvedBottomTrueEditTrue: {
			height: 24,
		},

		// editBadge: {
		// 	flexDirection: "row",
		// 	width: 112,
		// 	height: 32,
		// 	paddingLeft: 80,
		// 	justifyContent: "flex-end",
		// 	alignItems: "center",
		// 	flexShrink: 0,
		// },

		getPoints: {
			flexDirection: "column",
			alignItems: "flex-end",
			rowGap: theme.spacing.sm,
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
			color: theme.colors.text.default,
			textAlign: "center",
			fontFamily: theme.typography.fontFamily,
			fontSize: theme.typography.fontSize.default,
			fontWeight: theme.typography.fontWeight.bold,
		},

		earthHero: {
			color: theme.colors.success.default,
			textAlign: "center",
			fontFamily: theme.typography.fontFamily,
			fontSize: theme.typography.fontSize.sm,
			fontWeight: theme.typography.fontWeight.semibold,
			letterSpacing: theme.typography.letterSpacing.default,
		},

		participantName: {
			paddingTop: theme.spacing.sm,
			paddingBottom: theme.spacing.lg,
			flexDirection: "column",
			alignItems: "center",
			alignSelf: "stretch",
		},

		participantNameCurvedBottomTrueEditTrue: {
			rowGap: theme.spacing.xl,
			columnGap: theme.spacing.xl,
		},

		bottomCircle: {
			flexDirection: "row",
			width: 278,
			height: 32,
			justifyContent: "center",
			alignItems: "flex-start",
			rowGap: theme.spacing.sm,
			columnGap: theme.spacing.sm,
			position: "absolute",
			left: 41,
			bottom: -8,
			overflow: "hidden",
		},

		bottomCircleCurvedBottomTrueEditFalse: {
			paddingBottom: theme.spacing.md,
			justifyContent: "space-between",
			alignItems: "flex-end",
			alignSelf: "stretch",
		},

		bottomCircleCurvedBottomTrueEditTrue: {
			paddingBottom: theme.spacing.md,
			justifyContent: "space-between",
			alignItems: "flex-end",
			flexShrink: 0,
			alignSelf: "stretch",
		},

		bottomCircle2: {
			width: 278,
			height: 278,
			aspectRatio: 1,
			position: "absolute",
			top: -255,
			borderRadius: 278,
			backgroundColor: theme.colors.background,
			shadowColor: theme.card.shadow.color,
			shadowRadius: theme.card.shadow.blur,
			shadowOffset: {
				width: theme.card.shadow.x,
				height: theme.card.shadow.y,
			},
		},

		bottomCircle2CurvedBottomTrueEditFalse: {
			padding: theme.spacing.sm,
			flexDirection: "column",
			justifyContent: "flex-end",
			alignItems: "center",
			rowGap: theme.spacing.sm,
			columnGap: theme.spacing.sm,
		},

		bottomCircle2CurvedBottomTrueEditTrue: {
			padding: theme.spacing.sm,
			flexDirection: "column",
			justifyContent: "flex-end",
			alignItems: "center",
			rowGap: theme.spacing.sm,
			columnGap: theme.spacing.sm,
		},
	}))
);
