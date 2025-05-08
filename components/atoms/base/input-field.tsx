import { useStyles, createStyleSheet } from "styles";
import { View, TextInput } from "react-native";
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

	return (
		<View style={styles.root} testID={testID ?? "529:19375"}>
			{label && <Label text={label} testID="label" />}
			<View
				style={[styles.textField, multiline && styles.textFieldMultiline]}
				testID="529:19370"
			>
				<TextInput
					style={[styles.input, multiline && styles.inputMultiline]}
					placeholder={placeholder}
					value={value}
					onChangeText={onChangeText}
					secureTextEntry={password}
					multiline={multiline}
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
		alignItems: "center",
		alignSelf: "stretch",
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "rgba(197, 197, 197, 1)",
		backgroundColor: "white",
		shadowColor: "rgba(0, 0, 0, 0.2)",
		shadowRadius: 2,
		shadowOffset: { width: 1, height: 2 },
	},
	textFieldMultiline: {
		height: 100,
		alignItems: "flex-start",
		paddingVertical: 8,
	},
	input: {
		flex: 1,
		color: "#000",
		fontFamily: "Work Sans",
		fontSize: 16,
		fontWeight: "600",
	},
	inputMultiline: {
		textAlignVertical: "top", // Ensures text starts at the top-left
	},
}));
