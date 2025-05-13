import React, { useState } from "react";
import { useStyles, createStyleSheet } from "styles";
import { View, TextInput, Platform } from "react-native";
import { Label } from "components/atoms/base/label";

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
			{label && <Label text={label} testID="label" />}
			<View
				style={[
					styles.shadowWrapper,
					multiline && styles.textFieldMultiline,
					focused && styles.textFieldFocused,
				]}
				testID="529:19370"
			>
				{/* Web-only inner shadow */}
				{Platform.OS === "web" && (
					<View style={styles.shadowOverlay} pointerEvents="none" />
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
		alignItems: "stretch", // or "flex-start" if needed
		alignSelf: "stretch", // for full width
		alignItems: "center",
		alignSelf: "stretch",
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "rgba(197, 197, 197, 1)",
		backgroundColor: "white",
		// shadowColor: "rgba(0, 0, 0, 0.2)",
		// shadowRadius: 2,
		// shadowOffset: { width: 1, height: 2 },
	},
	textFieldFocused: {
		borderColor: "#0099CC",
	},
	textFieldMultiline: {
		height: 100,
		alignItems: "flex-start",
		// paddingVertical: 8,
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
		borderWidth: 1,
		borderColor: "rgba(197, 197, 197, 1)",
		backgroundColor: "white",
		overflow: "hidden",
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
}));
