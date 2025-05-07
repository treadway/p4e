import { useStyles, createStyleSheet } from "styles";
// import { useVariants } from "react-exo";
import { useVariants } from "@/utils/useVariants"; // or "@/utils/useVariants" if path alias is set
import { View, Text } from "react-native";

export interface TextFieldProps {
	label: (typeof TextFieldVariants.label)[number];
	multiline: (typeof TextFieldVariants.multiline)[number];
	password: (typeof TextFieldVariants.password)[number];
	placeholder: (typeof TextFieldVariants.placeholder)[number];
	/** Used to locate this view in end-to-end tests. */
	testID?: string;
}

export const TextFieldVariants = {
	label: ["False", "True"],
	multiline: ["False", "True"],
	password: ["False", "True"],
	placeholder: ["False", "True"],
} as const;

export function TextField(props: TextFieldProps) {
	const { placeholder, password, label, multiline } = props;
	const { styles } = useStyles(
		createStyleSheet((theme) => ({
			root: {
				width: 311,
				height: 40,
				paddingTop: 0,
				paddingLeft: 16,
				paddingBottom: 0,
				paddingRight: 16,
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "flex-start",
				flexShrink: 0,
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
			rootPlaceholderFalsePasswordFalseLabelTrueMultilineFalse: {
				height: "unset" as any,
				paddingLeft: "unset" as any,
				paddingBottom: "unset" as any,
				paddingRight: "unset" as any,
				flexShrink: "unset" as any,
				borderBottomLeftRadius: "unset" as any,
				borderBottomRightRadius: "unset" as any,
				borderTopLeftRadius: "unset" as any,
				borderTopRightRadius: "unset" as any,
				borderWidth: "unset" as any,
				borderStyle: "unset" as any,
				borderColor: "unset" as any,
				backgroundColor: "unset" as any,
				shadowColor: "unset" as any,
				shadowRadius: "unset" as any,
				shadowOffset: "unset" as any,
				paddingTop: 8,
				rowGap: 8,
				columnGap: 8,
			},
			rootPlaceholderFalsePasswordTrueLabelTrueMultilineFalse: {
				height: "unset" as any,
				paddingLeft: "unset" as any,
				paddingBottom: "unset" as any,
				paddingRight: "unset" as any,
				flexShrink: "unset" as any,
				borderBottomLeftRadius: "unset" as any,
				borderBottomRightRadius: "unset" as any,
				borderTopLeftRadius: "unset" as any,
				borderTopRightRadius: "unset" as any,
				borderWidth: "unset" as any,
				borderStyle: "unset" as any,
				borderColor: "unset" as any,
				backgroundColor: "unset" as any,
				shadowColor: "unset" as any,
				shadowRadius: "unset" as any,
				shadowOffset: "unset" as any,
				paddingTop: 8,
				rowGap: 8,
				columnGap: 8,
			},
			rootPlaceholderTruePasswordFalseLabelTrueMultilineFalse: {
				height: "unset" as any,
				paddingLeft: "unset" as any,
				paddingBottom: "unset" as any,
				paddingRight: "unset" as any,
				flexShrink: "unset" as any,
				borderBottomLeftRadius: "unset" as any,
				borderBottomRightRadius: "unset" as any,
				borderTopLeftRadius: "unset" as any,
				borderTopRightRadius: "unset" as any,
				borderWidth: "unset" as any,
				borderStyle: "unset" as any,
				borderColor: "unset" as any,
				backgroundColor: "unset" as any,
				shadowColor: "unset" as any,
				shadowRadius: "unset" as any,
				shadowOffset: "unset" as any,
				paddingTop: 8,
				rowGap: 8,
				columnGap: 8,
			},
			rootPlaceholderFalsePasswordFalseLabelTrueMultilineTrue: {
				height: "unset" as any,
				paddingLeft: "unset" as any,
				paddingBottom: "unset" as any,
				paddingRight: "unset" as any,
				flexShrink: "unset" as any,
				borderBottomLeftRadius: "unset" as any,
				borderBottomRightRadius: "unset" as any,
				borderTopLeftRadius: "unset" as any,
				borderTopRightRadius: "unset" as any,
				borderWidth: "unset" as any,
				borderStyle: "unset" as any,
				borderColor: "unset" as any,
				backgroundColor: "unset" as any,
				shadowColor: "unset" as any,
				shadowRadius: "unset" as any,
				shadowOffset: "unset" as any,
				paddingTop: 8,
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
			fieldTextPlaceholderTruePasswordFalseLabelFalseMultilineFalse: {
				color: "rgba(197, 197, 197, 1)",
			},
			fieldTextPlaceholderTruePasswordFalseLabelTrueMultilineFalse: {
				color: "rgba(142, 142, 142, 1)",
			},
			fieldText2: {
				flexDirection: "row",
				alignItems: "center",
				alignSelf: "stretch",
			},
		}))
	);
	const { vstyles } = useVariants(
		TextFieldVariants,
		{ placeholder, password, label, multiline },
		styles
	);

	return (
		<View style={vstyles.root()} testID={props.testID ?? "29:7016"}>
			<View style={vstyles.fieldText2()} testID="29:7020">
				<Text style={vstyles.fieldText()} testID="29:7021">
					{`Field Text`}
				</Text>
			</View>
		</View>
	);
}
