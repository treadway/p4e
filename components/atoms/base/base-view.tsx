import { useStyles, createStyleSheet } from "styles";
// import { useVariants } from "react-exo/utils";
import { useVariants } from "@/utils/useVariants"; // or "@/utils/useVariants" if path alias is set
import { View } from "react-native";
// import { EmptyContent } from "components/atoms/base/empty-content";
import { P4EBottomBackground } from "components/atoms/base/p-4-e-bottom-background";

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
		<View style={vstyles.root()} testID={props.testID ?? "29:6703"}>
			<P4EBottomBackground testID="33:5266" />
			<EmptyContent testID="33:2052" />
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		width: 360,
		minHeight: 640,
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 1)",
	},
}));
