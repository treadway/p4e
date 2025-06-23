import { ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import { useTheme } from "styles";

export interface IconProps {
	svg: React.FC<SvgProps>;
	color?: string;
	stroke?: string;
	size?: number;
	style?: ViewStyle;
}

export function Icon({ svg: Svg, color, stroke, size = 24, style }: IconProps) {
	const theme = useTheme();

	return (
		<Svg
			width={size}
			height={size}
			fill={color ?? theme.colors.success}
			stroke={stroke}
			style={style}
		/>
	);
}
