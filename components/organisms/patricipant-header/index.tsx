// ===================================
// components/organisms/participant-header/index.tsx
// ===================================

import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	Animated,
	Dimensions,
} from "react-native";
import { useStyles, createStyleSheet } from "styles";
import { useAnimations } from "@/utils/animations";

interface ParticipantData {
	name: string;
	title: string;
	points: number;
	avatar: string;
}

interface ParticipantHeaderProps {
	participant: ParticipantData;
	onSave: (data: Partial<ParticipantData>) => void;
	onImageUpload: () => void;
	animationSpeed?: number; // Override for this component's animations
	testID?: string;
}

export function ParticipantHeader({
	participant,
	onSave,
	onImageUpload,
	animationSpeed,
	testID = "participant-header",
}: ParticipantHeaderProps) {
	const { styles } = useStyles(stylesheet);
	const animations = useAnimations(animationSpeed);

	const [isEditing, setIsEditing] = useState(false);
	const [editName, setEditName] = useState(participant.name);

	// Animation values
	const containerHeight = useRef(new Animated.Value(200)).current; // Default height
	const contentSlideY = useRef(new Animated.Value(0)).current;
	const editSlideY = useRef(new Animated.Value(100)).current; // Start below
	const contentOpacity = useRef(new Animated.Value(1)).current;
	const editOpacity = useRef(new Animated.Value(0)).current;

	const enterEditMode = () => {
		setIsEditing(true);

		// Sequence of animations
		Animated.sequence([
			// 1. Expand container height
			Animated.timing(containerHeight, {
				toValue: 350, // Expanded height
				...animations.sineInOut,
				useNativeDriver: false,
			}),

			// 2. Slide out default content (with elastic pull-down effect)
			Animated.parallel([
				Animated.timing(contentSlideY, {
					toValue: -50, // Pull down slightly first
					duration: animations.elasticOut.duration * 0.3,
					easing: animations.elasticOut.easing,
					useNativeDriver: true,
				}),
				Animated.timing(contentOpacity, {
					toValue: 0,
					duration: animations.elasticOut.duration * 0.5,
					useNativeDriver: true,
				}),
			]),
		]).start();

		// 3. Slide in edit content after a slight delay
		setTimeout(() => {
			Animated.parallel([
				Animated.timing(editSlideY, {
					toValue: 0,
					...animations.elasticOut,
					useNativeDriver: true,
				}),
				Animated.timing(editOpacity, {
					toValue: 1,
					...animations.elasticOut,
					useNativeDriver: true,
				}),
			]).start();
		}, animations.elasticOut.duration * 0.3);
	};

	const exitEditMode = (shouldSave: boolean = false) => {
		if (shouldSave) {
			onSave({ name: editName });
		} else {
			setEditName(participant.name); // Reset to original
		}

		// Reverse the animations
		Animated.sequence([
			// 1. Slide out edit content
			Animated.parallel([
				Animated.timing(editSlideY, {
					toValue: 100,
					...animations.elasticIn,
					useNativeDriver: true,
				}),
				Animated.timing(editOpacity, {
					toValue: 0,
					...animations.elasticIn,
					useNativeDriver: true,
				}),
			]),

			// 2. Slide in default content
			Animated.parallel([
				Animated.timing(contentSlideY, {
					toValue: 0,
					...animations.elasticOut,
					useNativeDriver: true,
				}),
				Animated.timing(contentOpacity, {
					toValue: 1,
					...animations.elasticOut,
					useNativeDriver: true,
				}),
			]),

			// 3. Contract container height
			Animated.timing(containerHeight, {
				toValue: 200,
				...animations.sineInOut,
				useNativeDriver: false,
			}),
		]).start(() => {
			setIsEditing(false);
		});
	};

	return (
		<Animated.View
			testID={testID ?? "participant-header/index"}
			style={[styles.container, { height: containerHeight }]}
		>
			{/* Avatar - Always visible */}
			<View style={styles.avatarContainer}>
				<Image source={{ uri: participant.avatar }} style={styles.avatar} />
				<View style={styles.badge} />
				<TouchableOpacity
					style={styles.editButton}
					onPress={enterEditMode}
					testID={`${testID}-edit-button`}
				>
					<Text style={styles.editIcon}>✏️</Text>
				</TouchableOpacity>
			</View>

			{/* Default State Content */}
			<Animated.View
				style={[
					styles.defaultContent,
					{
						transform: [{ translateY: contentSlideY }],
						opacity: contentOpacity,
					},
				]}
				pointerEvents={isEditing ? "none" : "auto"}
			>
				<View style={styles.pointsContainer}>
					<Text style={styles.pointsText}>
						🔺 {participant.points.toLocaleString()}
					</Text>
					<TouchableOpacity style={styles.getPointsButton}>
						<Text style={styles.getPointsText}>⭕ Get Points!</Text>
					</TouchableOpacity>
				</View>

				<Text style={styles.name}>{participant.name}</Text>
				<Text style={styles.title}>{participant.title}</Text>
			</Animated.View>

			{/* Edit State Content */}
			<Animated.View
				style={[
					styles.editContent,
					{
						transform: [{ translateY: editSlideY }],
						opacity: editOpacity,
					},
				]}
				pointerEvents={isEditing ? "auto" : "none"}
			>
				<Text style={styles.screenNameLabel}>Screen Name</Text>
				<TextInput
					style={styles.nameInput}
					value={editName}
					onChangeText={setEditName}
					placeholder="Enter name..."
					testID={`${testID}-name-input`}
				/>

				<TouchableOpacity
					style={styles.uploadButton}
					onPress={onImageUpload}
					testID={`${testID}-upload-button`}
				>
					<Text style={styles.uploadText}>☁️ Upload Image</Text>
				</TouchableOpacity>

				<View style={styles.buttonRow}>
					<TouchableOpacity
						style={[styles.actionButton, styles.saveButton]}
						onPress={() => exitEditMode(true)}
						testID={`${testID}-save-button`}
					>
						<Text style={styles.saveText}>✅ Save</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.actionButton, styles.cancelButton]}
						onPress={() => exitEditMode(false)}
						testID={`${testID}-cancel-button`}
					>
						<Text style={styles.cancelText}>❌ Cancel</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</Animated.View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	container: {
		backgroundColor: "white",
		borderRadius: 16,
		padding: theme.spacing.md,
		marginHorizontal: theme.spacing.md,
		marginVertical: theme.spacing.sm,
		shadowColor: theme.card.shadow.color,
		shadowOffset: { width: theme.card.shadow.x, height: theme.card.shadow.y },
		shadowOpacity: 0.1,
		shadowRadius: theme.card.shadow.blur,
		elevation: 3,
		overflow: "hidden", // For clipping animations
	},

	avatarContainer: {
		alignSelf: "center",
		position: "relative",
		marginBottom: theme.spacing.md,
	},

	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: theme.colors.neutral.grayLight,
	},

	badge: {
		position: "absolute",
		bottom: 5,
		right: 5,
		width: 24,
		height: 24,
		backgroundColor: theme.colors.success,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: "white",
	},

	editButton: {
		position: "absolute",
		top: -5,
		right: -5,
		width: 28,
		height: 28,
		backgroundColor: theme.colors.info,
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
	},

	editIcon: {
		fontSize: 12,
	},

	defaultContent: {
		alignItems: "center",
	},

	pointsContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: theme.spacing.md,
	},

	pointsText: {
		backgroundColor: theme.colors.success,
		color: "white",
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.xs,
		borderRadius: 20,
		fontSize: theme.typography.fontSize.sm,
		fontWeight: theme.typography.fontWeight.semibold,
	},

	getPointsButton: {
		backgroundColor: theme.colors.success,
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.xs,
		borderRadius: 20,
	},

	getPointsText: {
		color: "white",
		fontSize: theme.typography.fontSize.sm,
		fontWeight: theme.typography.fontWeight.semibold,
	},

	name: {
		fontSize: theme.typography.fontSize.xl,
		fontWeight: theme.typography.fontWeight.bold,
		color: theme.colors.text.default,
		marginBottom: theme.spacing.xs,
	},

	title: {
		fontSize: theme.typography.fontSize.base,
		color: theme.colors.success,
		fontWeight: theme.typography.fontWeight.semibold,
	},

	editContent: {
		width: "100%",
	},

	screenNameLabel: {
		fontSize: theme.typography.fontSize.sm,
		color: theme.colors.neutral.grayDark,
		marginBottom: theme.spacing.xs,
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
	},

	cancelText: {
		color: "white",
		fontWeight: theme.typography.fontWeight.semibold,
	},
}));
