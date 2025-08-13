import { useStyles, createStyleSheet } from "styles";
// import { useVariants } from "react-exo/utils";
import { useVariants } from "@/utils/useVariants";
import { View } from "react-native";
// import { EmptyContent } from "components/atoms/base/empty-content";
import { P4EBackground } from "components/atoms/p-4-e-background";

export interface BaseViewProps {
	imagePosition: (typeof BaseViewVariants.imagePosition)[number];
	/** Used to locate this view in end-to-end tests. */
	testID?: string;
}

export const BaseViewVariants = {
	imagePosition: ["Bottom", "Top"],
} as const;

export function BaseView(props: BaseViewProps) {
	const { imagePosition } = props;
	const { styles } = useStyles(stylesheet);
	const { vstyles } = useVariants(BaseViewVariants, { imagePosition }, styles);

	return (
		<View
			data-comp="base-view"
			testID={props.testID ?? "29:6703"}
			style={[vstyles.root(), props.style]}
		>
			<P4EBottomBackground testID="33:5266" />
			// <EmptyContent testID="33:2052" style={vstyles.emptyContent()} />
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		width: theme.page.width,
		// minHeight: 640,
		flexDirection: "column",
		alignItems: "center",
		// backgroundColor: "rgba(255, 255, 255, 1)",
	},
	emptyContent: {
		height: 780,
		alignSelf: "stretch",
	},
	emptyContentImagePositionTop: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
}));
