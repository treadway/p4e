import { useStyles, createStyleSheet } from "styles";
// import { useVariants } from "react-exo/utils";
import { useVariants } from "@/utils/useVariants";
import { View, Text } from "react-native";
import { Icon } from "components/atoms/icon";
import CheckSvg from "assets/icons/tree-fill.svg";

export interface DataDisplayProps {
	iconPosition: (typeof DataDisplayVariants.iconPosition)[number];
	size: (typeof DataDisplayVariants.size)[number];
	/** Used to locate this view in end-to-end tests. */
	testID?: string;
}

export const DataDisplayVariants = {
	iconPosition: ["Left", "Right"],
	size: ["Small", "Large"],
} as const;

export function DataDisplay(props: DataDisplayProps) {
	const { iconPosition, size } = props;
	const { styles } = useStyles(stylesheet);
	const { vstyles } = useVariants(
		DataDisplayVariants,
		{ iconPosition, size },
		styles
	);

	return (
		<View style={vstyles.root()} testID={props.testID ?? "data-display"}>
			<Icon svg={CheckSvg} size={16} color="#00C851" stroke="#00C851" />

			<Text style={vstyles.info()} testID="67:12757">
				{`Data`}
			</Text>
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		flexDirection: "row",
		paddingTop: 4,
		paddingLeft: 12,
		paddingBottom: 4,
		paddingRight: 12,
		alignItems: "center",
		rowGap: 4,
		columnGap: 4,
		borderBottomLeftRadius: 54,
		borderBottomRightRadius: 54,
		borderTopLeftRadius: 54,
		borderTopRightRadius: 54,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "rgba(0, 200, 81, 1)",
		backgroundColor: "rgba(241, 246, 217, 1)",
	},
	rootIconPositionRightSizeLarge: {
		justifyContent: "flex-end",
	},
	rootIconPositionLeftSizeSmall: {
		height: 24,
		paddingLeft: 8,
		paddingRight: 8,
		flexShrink: 0,
	},
	rootIconPositionRightSizeSmall: {
		height: 24,
		paddingLeft: 8,
		paddingRight: 8,
		justifyContent: "flex-end",
		flexShrink: 0,
	},
	info: {
		color: "Neutral.Gray.100",
		fontFamily: "Work Sans",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "700",
	},
	infoIconPositionLeftSizeSmall: {
		fontSize: 12,
	},
	infoIconPositionRightSizeSmall: {
		fontSize: 12,
	},
}));
