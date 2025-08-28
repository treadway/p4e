// components/organisms/participant-header/index.tsx
import React, { useState, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Animated,
} from "react-native";
import { useStyles, createStyleSheet } from "styles";
import { useVariants } from "@/utils/useVariants";
import { useAnimations } from "@/utils/animations";
import { InputField } from "components/atoms/input-field";
import { BadgeParticipant } from "components/atoms/badge-participant";
import { Button } from "components/atoms/button";
import { DataDisplay } from "components/atoms/data-display";
import { ParticipantImage } from "components/atoms/participant-image";
import EditIcon from "@/assets/icons/pencil-fill.svg";
import PlusIcon from "@/assets/icons/plus-circle.svg";
import CloudUploadIcon from "@/assets/icons/cloud-upload-fill.svg";
import CheckCircleIcon from "@/assets/icons/check-circle-fill.svg";
import XCircleIcon from "@/assets/icons/x-circle-fill.svg";
import { Icon } from "components/atoms/icon";
import { Divider } from "components/atoms/divider";

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

export function ParticipantHeader({
	participant,
	onSave,
	onImageUpload,
	curvedBottom = "True",
	edit = "True",
	animationSpeed,
	testID = "ParticipantHeader",
}: ParticipantHeaderProps) {
	const { styles } = useStyles(stylesheet);
	const { vstyles } = useVariants(
		ParticipantHeaderVariants,
		{ curvedBottom, edit },
		styles
	);
	const animations = useAnimations(animationSpeed);

	const [isEditing, setIsEditing] = useState(false);
	const [editName, setEditName] = useState(participant.name);

	// Animation values
	const containerHeight = useRef(new Animated.Value(384)).current;
	const contentSlideY = useRef(new Animated.Value(0)).current;
	const editSlideY = useRef(new Animated.Value(100)).current;
	const contentOpacity = useRef(new Animated.Value(1)).current;
	const editOpacity = useRef(new Animated.Value(0)).current;

	const enterEditMode = () => {
		setIsEditing(true);

		// 1. Expand container height with sine in/out ease
		Animated.timing(containerHeight, {
			toValue: 450,
			...animations.sineInOut,
			useNativeDriver: false,
		}).start();

		// 2. Default content slides UP and OUT (pulls down slightly first)
		Animated.sequence([
			// Pull down slightly first (elastic effect)
			Animated.timing(contentSlideY, {
				toValue: 15, // Pull DOWN first
				duration: animations.elasticIn.duration * 0.3,
				easing: animations.elasticIn.easing,
				useNativeDriver: true,
			}),
			// Then slide up and out of clipped area
			Animated.timing(contentSlideY, {
				toValue: -150, // Slide UP and out of clipped view
				...animations.elasticOut,
				useNativeDriver: true,
			}),
		]).start();

		// 3. Edit content slides IN from bottom with elastic ending
		editSlideY.setValue(100); // Start below clipped area

		setTimeout(() => {
			Animated.timing(editSlideY, {
				toValue: 0, // Final position with elastic overshoot
				...animations.elasticOut,
				useNativeDriver: true,
			}).start();
		}, animations.elasticOut.duration * 0.3);
	};

	const exitEditMode = (shouldSave: boolean = false) => {
		if (shouldSave) {
			onSave({ name: editName });
		} else {
			setEditName(participant.name);
		}

		// Reverse the animation sequence

		// 1. Edit content slides OUT to bottom
		Animated.timing(editSlideY, {
			toValue: 100, // Slide down and out of clipped area
			...animations.elasticIn,
			useNativeDriver: true,
		}).start();

		// 2. Default content slides IN from top with elastic ending
		setTimeout(() => {
			contentSlideY.setValue(-100); // Start from above

			Animated.timing(contentSlideY, {
				toValue: 0, // Final position with elastic bounce
				...animations.elasticOut,
				useNativeDriver: true,
			}).start();
		}, animations.elasticIn.duration * 0.2);

		// 3. Contract container height back to original
		setTimeout(() => {
			Animated.timing(containerHeight, {
				toValue: 384,
				...animations.sineInOut,
				useNativeDriver: false,
			}).start(() => {
				setIsEditing(false);
			});
		}, animations.elasticOut.duration * 0.4);
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
					<ParticipantImage
						uri={
							participant.avatar ||
							require("assets/images/content/running-city-park.png")
						}
						testID={`${testID}-participantImage`}
					/>
					<View style={vstyles.levelBadge()} testID={`${testID}-levelBadge`}>
						<BadgeParticipant testID={`${testID}-badgeParticipant`} />
					</View>
				</View>
			</View>

			{/* Content that switches between default and edit states */}
			<View
				style={vstyles.participantInfo()}
				testID={`${testID}-participantInfo`}
			>
				{/* Default State Content */}
				<Animated.View
					style={[
						{
							transform: [{ translateY: contentSlideY }],
							position: isEditing ? "absolute" : "relative",
							width: "100%",
							left: 0,
							right: 0,
						},
					]}
					pointerEvents={isEditing ? "none" : "auto"}
					testID={`${testID}-defaultContent`}
				>
					<View style={vstyles.topInfo()} testID={`${testID}-topInfo`}>
						<View style={vstyles.points()} testID={`${testID}-points`}>
							<DataDisplay
								iconPosition="Left"
								size="Small"
								value={participant.points}
								iconName="tree"
								style={{ width: "100%" }} // or flex: 1
								testID={`${testID}-pointsDisplay`}
							/>
						</View>
						<View
							style={vstyles.participant()}
							testID={`${testID}-participantSpacer`}
						></View>
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
						<Text style={vstyles.nameText()} testID={`${testID}-nameText`}>
							{participant.name}
						</Text>
						<Text style={vstyles.levelText()} testID={`${testID}-levelText`}>
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
							position: isEditing ? "relative" : "absolute",
							width: "100%",
							left: 0,
							right: 0,
						},
					]}
					pointerEvents={isEditing ? "auto" : "none"}
					testID={`${testID}-editContent`}
				>
					<InputField
						label="Screen Name"
						placeholder="Enter name..."
						value={editName}
						onChangeText={setEditName}
						testID={`${testID}-nameInput`}
					/>

					<Button
						background="On"
						icon="Left"
						size="Default"
						state="Active"
						text="On"
						variant="Secondary"
						label="Upload Image"
						iconNode={<Icon svg={CloudUploadIcon} size={16} />}
						onPress={onImageUpload}
						testID={`${testID}-uploadButton`}
					/>

					<Divider />

					<View style={vstyles.buttonRow()}>
						<Button
							background="On"
							icon="Left"
							size="Default"
							state="Active"
							text="On"
							variant="Primary"
							label="Save"
							iconNode={<Icon svg={CheckCircleIcon} size={16} />}
							onPress={() => exitEditMode(true)}
							testID={`${testID}-saveButton`}
						/>

						<Button
							background="On"
							icon="Left"
							size="Default"
							state="Active"
							text="On"
							variant="Secondary"
							label="Cancel"
							iconNode={<Icon svg={XCircleIcon} size={16} />}
							onPress={() => exitEditMode(false)}
							testID={`${testID}-cancelButton`}
						/>
					</View>
				</Animated.View>
			</View>

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
		paddingTop:
			theme.spacing.xxl + theme.participantHeader.participantImage.size / 2,
		flexDirection: "column",
		alignItems: "center",
		overflow: "hidden",
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
		overflow: "hidden",
		width: theme.participantHeader.width,
	},

	topInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		alignSelf: "stretch",
		height: 48,
	},

	points: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 0,
		// Ensure DataDisplay can expand to fill available space between image and button
		minWidth: 0, // Allows flex shrinking
	},

	pointsDisplay: {
		with: "100%",
		minWidth: 0, // Allows flex shrinking
	},

	participantSpacer: {
		width: theme.participantHeader.participantImage.size,
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

	participantName: {
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.lg,
		gap: 0,
		flexDirection: "column",
		alignItems: "center",
		alignSelf: "stretch",
	},

	nameText: {
		alignSelf: "stretch",
		color: theme.colors.text.default,
		textAlign: "center",
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.fontSize.base,
		fontWeight: theme.typography.fontWeight.bold,
	},

	levelText: {
		color: theme.colors.successDark,
		textAlign: "center",
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.fontSize.sm,
		fontWeight: theme.typography.fontWeight.regular,
		letterSpacing: theme.typography.letterSpacing.default,
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

	editButtonWrapper: {
		position: "absolute",
		bottom: theme.spacing.md,
		right: theme.spacing.md,
		zIndex: 20,
	},

	editContent: {
		rowGap: theme.spacing.xl,
		paddingHorizontal: theme.spacing.md,
		paddingTop: theme.participantHeader.participantImage.size / 2,
		paddingBottom: theme.spacing.lg,
		width: "100%",
	},

	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: theme.spacing.md,
	},
}));
