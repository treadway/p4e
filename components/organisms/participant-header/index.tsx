// components/organisms/participant-header/index.tsx
import React, { useState, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Animated,
	Image,
} from "react-native";
import { useStyles, createStyleSheet } from "styles";
import { useVariants } from "@/utils/useVariants";
import { Button } from "components/atoms/button";
import EditIcon from "@/assets/icons/pencil-fill.svg";
import PlusIcon from "@/assets/icons/plus-circle.svg";
import { Icon } from "components/atoms/icon";

// Import these only if they exist, otherwise we'll create fallbacks
// import { BadgeParticipant } from "components/atoms/badge-participant";
// import { DataDisplay } from "components/atoms/data-display";
// import { ParticipantImage } from "components/atoms/participant-image";

interface ParticipantData {
	name: string;
	title: string;
	points: number;
	avatar: string;
}

export interface ParticipantHeaderProps {
	participant: ParticipantData;
	onSave: (data: Partial<ParticipantData>) => void;
	onImageUpload: () => void;
	curvedBottom?: (typeof ParticipantHeaderVariants.curvedBottom)[number];
	edit?: (typeof ParticipantHeaderVariants.edit)[number];
	animationSpeed?: number;
	testID?: string;
}

export const ParticipantHeaderVariants = {
	curvedBottom: ["False", "True"],
	edit: ["False", "True"],
} as const;

// Fallback components for missing ones
const FallbackBadge = ({ testID }: { testID?: string }) => (
	<View
		testID={testID}
		style={{
			width: 32,
			height: 32,
			backgroundColor: "#22C55E",
			borderRadius: 16,
			justifyContent: "center",
			alignItems: "center",
		}}
	>
		<Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>⭐</Text>
	</View>
);

const FallbackDataDisplay = ({ testID }: { testID?: string }) => (
	<View
		testID={testID}
		style={{
			backgroundColor: "#22C55E",
			paddingHorizontal: 12,
			paddingVertical: 6,
			borderRadius: 16,
			flexDirection: "row",
			alignItems: "center",
			gap: 4,
		}}
	>
		<Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
			🔺 {55000}
		</Text>
	</View>
);

const FallbackParticipantImage = ({
	uri,
	testID,
}: {
	uri: any;
	testID?: string;
}) => (
	<Image
		testID={testID}
		source={typeof uri === "string" ? { uri } : uri}
		style={{
			width: 128,
			height: 128,
			borderRadius: 64,
			backgroundColor: "#E5E5E5",
		}}
	/>
);

export function ParticipantHeader({
	participant,
	onSave,
	onImageUpload,
	curvedBottom = "True",
	edit = "True",
	animationSpeed = 1,
	testID = "ParticipantHeader",
}: ParticipantHeaderProps) {
	const { styles } = useStyles(stylesheet);
	const { vstyles } = useVariants(
		ParticipantHeaderVariants,
		{ curvedBottom, edit },
		styles
	);

	const [isEditing, setIsEditing] = useState(false);
	const [editName, setEditName] = useState(participant.name);

	// Animation values
	const containerHeight = useRef(new Animated.Value(384)).current;
	const contentSlideY = useRef(new Animated.Value(0)).current;
	const editSlideY = useRef(new Animated.Value(100)).current;
	const contentOpacity = useRef(new Animated.Value(1)).current;
	const editOpacity = useRef(new Animated.Value(0)).current;

	const baseDuration = 400 / animationSpeed;

	const enterEditMode = () => {
		setIsEditing(true);

		Animated.sequence([
			Animated.timing(containerHeight, {
				toValue: 450,
				duration: baseDuration,
				useNativeDriver: false,
			}),
			Animated.parallel([
				Animated.timing(contentSlideY, {
					toValue: -50,
					duration: baseDuration * 0.3,
					useNativeDriver: true,
				}),
				Animated.timing(contentOpacity, {
					toValue: 0,
					duration: baseDuration * 0.5,
					useNativeDriver: true,
				}),
			]),
		]).start();

		setTimeout(() => {
			Animated.parallel([
				Animated.timing(editSlideY, {
					toValue: 0,
					duration: baseDuration,
					useNativeDriver: true,
				}),
				Animated.timing(editOpacity, {
					toValue: 1,
					duration: baseDuration,
					useNativeDriver: true,
				}),
			]).start();
		}, baseDuration * 0.3);
	};

	const exitEditMode = (shouldSave: boolean = false) => {
		if (shouldSave) {
			onSave({ name: editName });
		} else {
			setEditName(participant.name);
		}

		Animated.sequence([
			Animated.parallel([
				Animated.timing(editSlideY, {
					toValue: 100,
					duration: baseDuration,
					useNativeDriver: true,
				}),
				Animated.timing(editOpacity, {
					toValue: 0,
					duration: baseDuration,
					useNativeDriver: true,
				}),
			]),
			Animated.parallel([
				Animated.timing(contentSlideY, {
					toValue: 0,
					duration: baseDuration,
					useNativeDriver: true,
				}),
				Animated.timing(contentOpacity, {
					toValue: 1,
					duration: baseDuration,
					useNativeDriver: true,
				}),
			]),
			Animated.timing(containerHeight, {
				toValue: 384,
				duration: baseDuration,
				useNativeDriver: false,
			}),
		]).start(() => {
			setIsEditing(false);
		});
	};

	return (
		<Animated.View
			testID={testID}
			style={[vstyles.root(), { height: containerHeight }]}
		>
			{/* Top circle with participant image + badge */}
			<View style={vstyles.participant()} testID={`${testID}-participant`}>
				<View
					style={vstyles.imageAndBadge()}
					testID={`${testID}-imageAndBadge`}
				>
					<FallbackParticipantImage
						uri={
							participant.avatar ||
							require("assets/images/content/running-city-park.png")
						}
						testID={`${testID}-participantImage`}
					/>
					<View style={vstyles.levelBadge()} testID={`${testID}-levelBadge`}>
						<FallbackBadge testID={`${testID}-badgeParticipant`} />
					</View>
				</View>
			</View>

			{/* Default State Content */}
			<Animated.View
				style={[
					vstyles.participantInfo(),
					{
						transform: [{ translateY: contentSlideY }],
						opacity: contentOpacity,
						pointerEvents: isEditing ? "none" : "auto",
					},
				]}
				testID={`${testID}-participantInfo`}
			>
				<View style={vstyles.topInfo()} testID={`${testID}-topInfo`}>
					<View style={vstyles.points()} testID={`${testID}-points`}>
						<FallbackDataDisplay testID={`${testID}-dataDisplay`} />
					</View>
					<View style={vstyles.getPoints()} testID={`${testID}-getPoints`}>
						<Button
							background="On"
							icon="Left"
							size="Small"
							state="Active"
							text="On"
							label="Get Points!"
							iconNode={<Icon svg={PlusIcon} size={14} />}
							testID={`${testID}-getPointsButton`}
						/>
					</View>
				</View>

				<View
					style={vstyles.participantName()}
					testID={`${testID}-participantName`}
				>
					<Text style={vstyles.gusSlomecki()} testID={`${testID}-nameText`}>
						{participant.name}
					</Text>
					<Text style={vstyles.earthHero()} testID={`${testID}-subtitleText`}>
						{participant.title}
					</Text>
				</View>
			</Animated.View>

			{/* Edit State Content */}
			<Animated.View
				style={[
					vstyles.editContent(),
					{
						transform: [{ translateY: editSlideY }],
						opacity: editOpacity,
						pointerEvents: isEditing ? "auto" : "none",
					},
				]}
				testID={`${testID}-editContent`}
			>
				<Text
					style={vstyles.screenNameLabel()}
					testID={`${testID}-screenNameLabel`}
				>
					Screen Name
				</Text>
				<TextInput
					style={vstyles.nameInput()}
					value={editName}
					onChangeText={setEditName}
					placeholder="Enter name..."
					testID={`${testID}-nameInput`}
				/>

				<TouchableOpacity
					style={vstyles.uploadButton()}
					onPress={onImageUpload}
					testID={`${testID}-uploadButton`}
				>
					<Text style={vstyles.uploadText()}>☁️ Upload Image</Text>
				</TouchableOpacity>

				<View style={vstyles.buttonRow()}>
					<TouchableOpacity
						style={[vstyles.actionButton(), vstyles.saveButton()]}
						onPress={() => exitEditMode(true)}
						testID={`${testID}-saveButton`}
					>
						<Text style={vstyles.saveText()}>✅ Save</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[vstyles.actionButton(), vstyles.cancelButton()]}
						onPress={() => exitEditMode(false)}
						testID={`${testID}-cancelButton`}
					>
						<Text style={vstyles.cancelText()}>❌ Cancel</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>

			{/* Bottom decorative circle */}
			<View style={vstyles.bottomCircle()} testID={`${testID}-bottomCircle`}>
				<View
					style={vstyles.bottomCircle2()}
					testID={`${testID}-bottomCircle2`}
				/>
			</View>

			{/* Floating edit button */}
			<View
				style={vstyles.editButtonWrapper()}
				testID={`${testID}-editButtonWrapper`}
			>
				<Button
					background="Off"
					icon="Only"
					size="Small"
					state="Active"
					text="Off"
					iconNode={<Icon svg={EditIcon} size={14} />}
					onPress={enterEditMode}
					testID={`${testID}-editButton`}
				/>
			</View>
		</Animated.View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		width: theme.participantHeader.width,
		paddingTop: theme.spacing.xxl,
		flexDirection: "column",
		alignItems: "center",
		overflow: "hidden",
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
		zIndex: 2,
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
		width: theme.badge.size,
		height: theme.badge.size,
		justifyContent: "center",
		alignItems: "center",
	},

	participantInfo: {
		paddingHorizontal: theme.spacing.md,
		flexDirection: "column",
		alignItems: "center",
		alignSelf: "stretch",
		borderTopLeftRadius: theme.card.borderRadius,
		borderTopRightRadius: theme.card.borderRadius,
		backgroundColor: theme.colors.background.default,
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
		fontSize: theme.typography.fontSize.base,
		fontWeight: theme.typography.fontWeight.bold,
	},

	earthHero: {
		color: theme.colors.successDark,
		textAlign: "center",
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.fontSize.sm,
		fontWeight: theme.typography.fontWeight.regular,
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
		bottom: -32,
		overflow: "hidden",
	},

	bottomCircleCurvedBottomTrueEditFalse: {
		paddingBottom: theme.spacing.sm,
		justifyContent: "space-between",
		alignItems: "flex-end",
		alignSelf: "stretch",
	},

	bottomCircleCurvedBottomTrueEditTrue: {
		paddingBottom: theme.spacing.sm,
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
		backgroundColor: theme.colors.background.default,
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

	editButtonWrapper: {
		position: "absolute",
		bottom: theme.spacing.md,
		right: theme.spacing.md,
		zIndex: 20,
	},

	editContent: {
		position: "absolute",
		top: 100,
		left: theme.spacing.md,
		right: theme.spacing.md,
		backgroundColor: theme.colors.background.default,
		borderRadius: theme.card.borderRadius,
		padding: theme.spacing.lg,
		shadowColor: theme.card.shadow.color,
		shadowRadius: theme.card.shadow.blur,
		shadowOffset: {
			width: theme.card.shadow.x,
			height: theme.card.shadow.y,
		},
		elevation: 5,
	},

	screenNameLabel: {
		fontSize: theme.typography.fontSize.sm,
		color: theme.colors.neutral.grayDark,
		marginBottom: theme.spacing.xs,
		fontFamily: theme.typography.fontFamily,
	},

	nameInput: {
		borderWidth: 1,
		borderColor: theme.colors.neutral.grayLight,
		borderRadius: theme.button.radii,
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.sm,
		fontSize: theme.typography.fontSize.base,
		marginBottom: theme.spacing.md,
		backgroundColor: "white",
		fontFamily: theme.typography.fontFamily,
	},

	uploadButton: {
		backgroundColor: theme.colors.success,
		paddingVertical: theme.spacing.md,
		borderRadius: theme.button.radii,
		alignItems: "center",
		marginBottom: theme.spacing.md,
	},

	uploadText: {
		color: "white",
		fontSize: theme.typography.fontSize.base,
		fontWeight: theme.typography.fontWeight.semibold,
		fontFamily: theme.typography.fontFamily,
	},

	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: theme.spacing.md,
	},

	actionButton: {
		flex: 1,
		paddingVertical: theme.spacing.md,
		borderRadius: theme.button.radii,
		alignItems: "center",
	},

	saveButton: {
		backgroundColor: theme.colors.success,
	},

	cancelButton: {
		backgroundColor: theme.colors.danger,
	},

	saveText: {
		color: "white",
		fontWeight: theme.typography.fontWeight.semibold,
		fontFamily: theme.typography.fontFamily,
	},

	cancelText: {
		color: "white",
		fontWeight: theme.typography.fontWeight.semibold,
		fontFamily: theme.typography.fontFamily,
	},
}));
