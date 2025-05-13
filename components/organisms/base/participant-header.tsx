import { useStyles, createStyleSheet } from "styles";
import { useVariants } from "react-exo/utils";
import { View, Text } from "react-native";
import { BadgeParticipant } from "components/atoms/badge-participant";
import { Button } from "components/atoms/button";
import { DataDisplay } from "components/atoms/data-display";
import { ParticipantImage } from "components/atoms/participant-image";

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
	const { vstyles } = useVariants(
		ParticipantHeaderVariants,
		{ curvedBottom, edit },
		styles
	);

	return (
		<View style={vstyles.root()} testID={props.testID ?? "77:34880"}>
			<View style={vstyles.participant()} testID="68:12858">
				<View style={vstyles.imageAndBadge()} testID="68:12850">
					<ParticipantImage testID="68:12851" />
					<BadgeParticipant testID="68:12852" />
				</View>
			</View>
			<View style={vstyles.participantInfo()} testID="68:12932">
				<View style={vstyles.topInfo()} testID="68:12933">
					<View style={vstyles.points()} testID="70:13824">
						<DataDisplay testID="68:12934" iconPosition="Left" size="Small" />
					</View>
					<View style={vstyles.imageAndBadgeCont()} testID="68:12988">
						<View style={vstyles.imageAndBadge2()} testID="68:12990">
							<ParticipantImage testID="68:12991" />
							<View style={vstyles.editBadge()} testID="114:188857">
								<BadgeParticipant testID="114:188858" />
							</View>
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
				testID="114:188479"
				background="Off"
				icon="Only"
				size="Small"
				state="Active"
				text="Off"
			/>
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		width: 360,
		paddingTop: 32,
		flexDirection: "column",
		alignItems: "center",
	},
	rootCurvedBottomTrueEditTrue: {
		height: 384,
		flexShrink: 0,
	},
	participant: {
		flexDirection: "row",
		width: 128,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "rgba(0, 0, 0, 0.250980406999588)",
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 0 },
	},
	imageAndBadge: {
		width: 128,
		height: 128,
		flexShrink: 0,
	},
	participantInfo: {
		paddingTop: 0,
		paddingLeft: 12,
		paddingBottom: 0,
		paddingRight: 12,
		flexDirection: "column",
		alignItems: "center",
		alignSelf: "stretch",
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		backgroundColor: "rgba(255, 255, 255, 1)",
		shadowColor: "rgba(0, 0, 0, 0.250980406999588)",
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 0 },
	},
	topInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		alignSelf: "stretch",
	},
	points: {
		flexDirection: "column",
		alignItems: "flex-start",
		rowGap: 8,
		columnGap: 8,
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: 0,
	},
	pointsCurvedBottomTrueEditTrue: {
		height: 24,
	},
	imageAndBadgeCont: {
		width: 128,
		flexDirection: "column",
		alignItems: "flex-start",
		rowGap: 8,
		columnGap: 8,
	},
	imageAndBadge2: {
		width: 128,
		height: 128,
		position: "absolute",
		top: -64,
	},
	editBadge: {
		flexDirection: "row",
		width: 112,
		height: 32,
		paddingLeft: 80,
		justifyContent: "flex-end",
		alignItems: "center",
		flexShrink: 0,
	},
	getPoints: {
		flexDirection: "column",
		alignItems: "flex-end",
		rowGap: 8,
		columnGap: 8,
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: 0,
	},
	getPointsCurvedBottomTrueEditTrue: {
		height: 24,
	},
	gusSlomecki: {
		alignSelf: "stretch",
		color: "Neutral.Gray.80",
		textAlign: "center",
		fontFamily: "Work Sans",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "700",
	},
	earthHero: {
		color: "rgba(0, 126, 51, 1)",
		textAlign: "center",
		fontFamily: "Work Sans",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "600",
		letterSpacing: 0.28,
	},
	participantName: {
		paddingTop: 8,
		paddingLeft: 0,
		paddingBottom: 16,
		paddingRight: 0,
		flexDirection: "column",
		alignItems: "center",
		alignSelf: "stretch",
	},
	participantNameCurvedBottomTrueEditTrue: {
		rowGap: 24,
		columnGap: 24,
	},
	bottomCircle: {
		flexDirection: "row",
		width: 278,
		height: 32,
		justifyContent: "center",
		alignItems: "flex-start",
		rowGap: 8,
		columnGap: 8,
		position: "absolute",
		left: 41,
		bottom: -32,
	},
	bottomCircleCurvedBottomTrueEditFalse: {
		width: "unset" as any,
		rowGap: "unset" as any,
		columnGap: "unset" as any,
		position: "unset" as any,
		left: "unset" as any,
		bottom: "unset" as any,
		paddingBottom: 8,
		justifyContent: "space-between",
		alignItems: "flex-end",
		alignSelf: "stretch",
	},
	bottomCircleCurvedBottomTrueEditTrue: {
		width: "unset" as any,
		rowGap: "unset" as any,
		columnGap: "unset" as any,
		position: "unset" as any,
		left: "unset" as any,
		bottom: "unset" as any,
		paddingBottom: 8,
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
		borderBottomLeftRadius: 278,
		borderBottomRightRadius: 278,
		borderTopLeftRadius: 278,
		borderTopRightRadius: 278,
		backgroundColor: "rgba(255, 255, 255, 1)",
		shadowColor: "rgba(0, 0, 0, 0.250980406999588)",
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 0 },
	},
	bottomCircle2CurvedBottomTrueEditFalse: {
		aspectRatio: "unset" as any,
		position: "unset" as any,
		top: "unset" as any,
		paddingTop: 8,
		paddingLeft: 8,
		paddingBottom: 8,
		paddingRight: 8,
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center",
		rowGap: 8,
		columnGap: 8,
	},
	bottomCircle2CurvedBottomTrueEditTrue: {
		aspectRatio: "unset" as any,
		position: "unset" as any,
		top: "unset" as any,
		paddingTop: 8,
		paddingLeft: 8,
		paddingBottom: 8,
		paddingRight: 8,
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center",
		rowGap: 8,
		columnGap: 8,
	},
}));
