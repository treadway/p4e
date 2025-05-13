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
	label = "Label",
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
		<View style={styles.root} testID={testID ?? "529:19375"}>
			<View
				style={[
					styles.shadowWrapper,
					multiline && styles.textFieldMultiline,
					focused && styles.textFieldFocused,
				]}
				testID="529:19370"
			>
				{Platform.OS === "web" && (
					<View style={styles.shadowOverlay} pointerEvents="none" />
				)}

				{/* 🟦 Floating Label */}
				{label && (
					<View style={styles.labelWrapper}>
						<Label text={label} testID="label" />
					</View>
				)}

				<TextInput
					style={[styles.input, multiline && styles.inputMultiline]}
					placeholder={placeholder}
					value={value}
					onChangeText={onChangeText}
					secureTextEntry={password}
					multiline={multiline}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					underlineColorAndroid="transparent"
					disableFullscreenUI={true}
					importantForAccessibility="no"
					testID="input"
				/>
			</View>
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		width: 311,
		paddingTop: 8,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
		rowGap: 8,
		columnGap: 8,
	},
	textField: {
		height: 40,
		paddingHorizontal: 16,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "stretch",
		alignSelf: "stretch",
		alignItems: "center",
		alignSelf: "stretch",
		borderRadius: 16,
		borderWidth: 2,
		borderColor: "rgba(197, 197, 197, 1)",
		backgroundColor: "white",
	},
	textFieldFocused: {
		borderColor: "#0099CC",
	},
	textFieldMultiline: {
		height: 100,
		alignItems: "flex-start",
		paddingVertical: 8,
	},
	input: {
		flex: 1,
		width: "100%",
		height: "100%",
		color: "#000",
		fontFamily: "Work Sans",
		fontSize: 16,
		fontWeight: "600",

		...Platform.select({
			web: {
				outlineStyle: "none",
			},
		}),
	},
	inputMultiline: {
		textAlignVertical: "top",
	},
	shadowWrapper: {
		position: "relative",
		height: 40,
		borderRadius: 16,
		borderWidth: 2,
		borderColor: "rgba(197, 197, 197, 1)",
		backgroundColor: "white",
		paddingHorizontal: 16,
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "stretch",
	},

	shadowOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		pointerEvents: "none",
		borderRadius: 16,
		...Platform.select({
			web: {
				boxShadow: "inset 0 2px 5px rgba(0,0,0,0.15)",
			},
		}),
	},
	labelWrapper: {
		position: "absolute",
		top: -23,
		left: 0,
		zIndex: 10,
	},
}));
