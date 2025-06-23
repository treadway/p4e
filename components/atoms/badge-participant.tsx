import { useStyles, createStyleSheet } from "styles";
import { View, Text } from "react-native";
import { Icon } from "components/atoms/icon";
import CheckSvg from "assets/icons/tree-fill.svg";

export interface BadgeParticipantProps {
	/** Used to locate this view in end-to-end tests. */
	testID?: string;
}

export function BadgeParticipant(props: BadgeParticipantProps) {
	const { styles } = useStyles(stylesheet);
	const { styles: iconStyles } = useStyles((theme) => ({
		icon: {
			color: theme.badge.color,
			stroke: theme.badge.color,
		},
	}));

	return (
		<View style={styles.root} testID={props.testID ?? "67:12691"}>
			<Icon
				svg={CheckSvg}
				size={16}
				color={iconStyles.icon.color}
				stroke={iconStyles.icon.stroke}
			/>
			<Text style={styles.labelText} testID="67:12698">
				{`2`}
			</Text>
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		width: 32,
		height: 32,
		aspectRatio: 1,
		borderRadius: 32,
		borderWidth: 2,
		borderStyle: "solid",
		borderColor: theme.colors.neutral.white["100"],
		backgroundColor: "rgba(255, 255, 255, 0.64)",
		justifyContent: "center",
		alignItems: "center",
	},

	labelText: {
		color: theme.colors.white,
		textAlign: "center",
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.fontSize.md,
		fontWeight: theme.typography.fontWeight.bold,
		lineHeight: 26,
	},
}));
