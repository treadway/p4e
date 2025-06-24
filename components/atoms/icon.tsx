// components/atoms/icon.tsx
import React, {
	ReactElement,
	ReactNode,
	isValidElement,
	cloneElement,
} from "react";
import { View, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import { useTheme } from "styles";

export interface IconProps {
	/** The SVG component (from react-native-svg-transformer) */
	svg: React.FC<SvgProps>;
	/** Override fill color; defaults to theme.colors.success */
	color?: string;
	/** Optional stroke color */
	stroke?: string;
	/** Icon width & height */
	size?: number;
	/** Extra container styling */
	style?: ViewStyle;
	testID?: string;
}

/**
 * Recursively walk through a ReactNode tree,
 * remove any existing fill/stroke on elements,
 * and reapply the desired color.
 */
function applyColorDeep(
	node: ReactNode,
	fill: string | undefined,
	stroke: string | undefined
): ReactNode {
	if (!isValidElement(node)) return node;

	// Only care about SVG elements (path, g, etc.)
	const props: any = {};
	if (fill !== undefined && node.props.fill) {
		props.fill = fill;
	}
	if (stroke !== undefined && node.props.stroke) {
		props.stroke = stroke;
	}

	const children = React.Children.map(node.props.children, (c) =>
		applyColorDeep(c, fill, stroke)
	);

	return cloneElement(node, props, children);
}

export function Icon({
	svg: Svg,
	color,
	stroke,
	size = 24,
	style,
	testID,
}: IconProps) {
	const theme = useTheme();
	const fillColor = color ?? theme.colors.success;
	const strokeColor = stroke;

	// Instantiated SVG with our fill/stroke at the top level
	const rawSvg = (
		<Svg width={size} height={size} fill={fillColor} stroke={strokeColor} />
	);

	// Deep-override any nested fills/strokes
	const coloredSvg = applyColorDeep(
		rawSvg,
		fillColor,
		strokeColor
	) as ReactElement;

	return (
		<View style={[{ width: size, height: size }, style]} testID={testID}>
			{coloredSvg}
		</View>
	);
}
