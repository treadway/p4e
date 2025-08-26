// components/atoms/input-field/index.tsx
import React, { useState } from "react";
import { useStyles, createStyleSheet } from "styles";
import { View, TextInput, Platform } from "react-native";
import { Label } from "components/atoms/label";

export interface InputFieldProps {
	label?: string;
	placeholder?: string;
	password?: boolean;
	multiline?: boolean;
	value?: string;
	onChangeText?: (text: string) => void;
	testID?: string;
}

export function InputField({
	label,
	placeholder = "Enter text",
	password = false,
	multiline = false,
	value,
	onChangeText,
	testID,
}: InputFieldProps) {
	const { styles } = useStyles(stylesheet);
	const [focused, setFocused] = useState(false);

	return (
		<View style={styles.root} testID={testID ?? "InputField"}>
			{/* Floating Label */}
			{label && (
				<View style={styles.labelWrapper}>
					<Label text={label} testID={`${testID}-label`} />
				</View>
			)}

			{/* Input Field Container */}
			<View
				style={[
					styles.inputContainer,
					multiline && styles.inputContainerMultiline,
					focused && styles.inputContainerFocused,
				]}
				testID={`${testID}-container`}
			>
				{/* Web Shadow Overlay */}
				{Platform.OS === "web" && (
					<View style={styles.shadowOverlay} pointerEvents="none" />
				)}

				{/* Text Input */}
				<TextInput
					style={[styles.input, multiline && styles.inputMultiline]}
					placeholder={placeholder}
					placeholderTextColor={styles.placeholderColor.color}
					value={value}
					onChangeText={onChangeText}
					secureTextEntry={password}
					multiline={multiline}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					underlineColorAndroid="transparent"
					disableFullscreenUI={true}
					testID={`${testID}-input`}
				/>
			</View>
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		width: "100%", // Use full width, let parent control sizing
		height: theme.textField.size.defailt,
		paddingTop: theme.spacing.sm, // 8px from theme
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
		gap: theme.spacing.sm, // Use theme gap instead of rowGap/columnGap
	},

	labelWrapper: {
		position: "absolute",
		top: 2, // Adjust based on theme
		left: 20,
		zIndex: 10,
		backgroundColor: theme.colors.background.default, // Ensure label has background
		paddingHorizontal: theme.spacing.xs,
	},

	inputContainer: {
		height: theme.textField.size.default, // Use theme height (40px)
		paddingHorizontal: theme.spacing.md, // 16px from theme
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "stretch",
		borderRadius: theme.textField.borderRadius, // Use theme border radius
		borderWidth: 2,
		borderColor: theme.colors.neutral.grayLight, // Theme gray color
		backgroundColor: theme.colors.background.default, // Theme background
		shadowColor: theme.textField.shadow.color,
		shadowRadius: theme.textField.shadow.blur,
		shadowOffset: {
			width: theme.textField.shadow.x,
			height: theme.textField.shadow.y,
		},
		elevation: 2, // Android shadow
	},

	inputContainerFocused: {
		borderColor: theme.colors.info, // Use theme info color for focus
		shadowColor: theme.colors.info,
		shadowOpacity: 0.3,
	},

	inputContainerMultiline: {
		height: 100, // Fixed height for multiline
		alignItems: "flex-start",
		paddingVertical: theme.spacing.sm,
	},

	input: {
		flex: 1,
		width: "100%",
		height: "100%",
		color: theme.colors.text.default, // Theme text color
		fontFamily: theme.typography.fontFamily, // Theme font
		fontSize: theme.typography.fontSize.base, // Theme font size
		fontWeight: theme.typography.fontWeight.semibold, // Theme font weight
		...Platform.select({
			web: {
				outlineStyle: "none", // Remove web outline
			},
		}),
	},

	inputMultiline: {
		textAlignVertical: "top", // For Android multiline
	},

	placeholderColor: {
		color: theme.colors.neutral.gray, // Theme placeholder color
	},

	shadowOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		pointerEvents: "none",
		borderRadius: theme.card.borderRadius,
		...Platform.select({
			web: {
				boxShadow: `inset 0 ${theme.textField.shadow.y}px ${theme.textField.shadow.blur}px ${theme.textField.shadow.color}`,
			},
		}),
	},
}));
