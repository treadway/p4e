import { useStyles, createStyleSheet } from "styles";
import { View, Text } from "react-native";
import { Icon } from "components/atoms/icon";
import CheckSvg from "assets/icons/star-fill.svg";

export interface BadgeParticipantProps {
	/** Used to locate this view in end-to-end tests. */
	testID?: string;
}

export function BadgeParticipant(props: BadgeParticipantProps) {
	const { styles } = useStyles(stylesheet);
	const { styles: iconStyles } = useStyles((theme) => ({
		icon: {
			fill: theme.badge.color,
			stroke: theme.badge.color,
		},
	}));

	return (
		<View style={styles.root} testID={props.testID ?? "67:12691"}>
			<Icon
				svg={CheckSvg}
				size={32}
				fill={iconStyles.icon.fill}
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
		width: theme.badge.size,
		height: theme.badge.size,
		aspectRatio: 1,
		borderRadius: theme.badge.size,
		borderWidth: 2,
		borderStyle: "solid",
		borderColor: theme.badge.background,
		backgroundColor: theme.badge.stroke,
		justifyContent: "center",
		alignItems: "center",
		overflow: "visible",
	},

	labelText: {
		color: theme.colors.neutral.white,
		textAlign: "center",
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.fontSize.md,
		fontWeight: theme.typography.fontWeight.bold,
		lineHeight: 26,
		position: "absolute",
	},
	icon: {
		fill: theme.badge.color,
		stroke: theme.badge.color,
	},
}));
