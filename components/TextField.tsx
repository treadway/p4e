import { useStyles, createStyleSheet } from "styles";
import { View, Text } from "react-native";
import { Label } from "components/atoms/base/label";

export interface InputFieldProps {
	/** Used to locate this view in end-to-end tests. */
	testID?: string;
}

export function InputField(props: InputFieldProps) {
	const { styles } = useStyles(stylesheet);

	return (
		<View
			data-comp="text-field"
			style={styles.root}
			testID={props.testID ?? "529:19375"}
		>
			<View style={styles.textField} testID="529:19370">
				<View style={styles.fieldText2} testID="529:19371">
					<Text style={styles.fieldText} testID="529:19372">
						{`Field Text`}
					</Text>
				</View>
			</View>
			<Label testID="529:19373" />
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
	fieldText: {
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: 0,
		color: "rgba(0, 0, 0, 1)",
		fontFamily: "Work Sans",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "600",
	},
	textField: {
		height: 40,
		paddingTop: 0,
		paddingLeft: 16,
		paddingBottom: 0,
		paddingRight: 16,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
		alignSelf: "stretch",
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "rgba(197, 197, 197, 1)",
		backgroundColor: "rgba(255, 255, 255, 1)",
		shadowColor: "rgba(0, 0, 0, 0.20000000298023224)",
		shadowRadius: 2,
		shadowOffset: { width: 1, height: 2 },
	},
	fieldText2: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "stretch",
	},
}));
