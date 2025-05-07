import { useStyles, createStyleSheet } from "styles";
import { View } from "react-native";
import { BaseView } from "components/atoms/base/base-view";
import { GetPointsVerificationForm } from "components/common/base/get-points-verification-form";
import { AlertModal } from "components/organisms/base/alert-modal";
import { NavBar } from "components/organisms/base/nav-bar";

export interface ScreenGetPointsCardModalProps {
	/** Used to locate this view in end-to-end tests. */
	testID?: string;
}

export function ScreenGetPointsCardModal(props: ScreenGetPointsCardModalProps) {
	const { styles } = useStyles(stylesheet);

	return (
		<View style={styles.root} testID={props.testID ?? "513:66426"}>
			<BaseView testID="297:18494" imagePosition="top" />
			<NavBar testID="297:18495" property1="Default" />
			<GetPointsVerificationForm testID="297:18496" />
			<AlertModal testID="297:22325" />
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		flexDirection: "row",
		width: 360,
		minHeight: 640,
		alignItems: "flex-start",
	},
}));
