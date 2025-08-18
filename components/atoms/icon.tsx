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
 * AGGRESSIVE color override - forces colors on ALL SVG elements
 */
function forceColorOverride(
	node: ReactNode,
	fillColor: string | undefined,
	strokeColor: string | undefined
): ReactNode {
	if (!isValidElement(node)) return node;

	const elementType = typeof node.type === "string" ? node.type : "";

	// SVG elements that can have fill/stroke
	const svgElements = [
		"path",
		"g",
		"circle",
		"rect",
		"ellipse",
		"line",
		"polyline",
		"polygon",
		"svg",
	];

	if (svgElements.includes(elementType)) {
		const props: any = { ...node.props };

		// FORCE fill color on elements that typically use fill
		if (
			fillColor &&
			["path", "circle", "rect", "ellipse", "polygon"].includes(elementType)
		) {
			props.fill = fillColor;
			// Also remove any existing fill from style
			if (props.style) {
				props.style = { ...props.style, fill: fillColor };
			}
		}

		// FORCE stroke color if specified
		if (strokeColor) {
			props.stroke = strokeColor;
			if (props.style) {
				props.style = { ...props.style, stroke: strokeColor };
			}
		}

		// Recursively apply to children
		const children = React.Children.map(node.props.children, (child) =>
			forceColorOverride(child, fillColor, strokeColor)
		);

		return cloneElement(node, props, children);
	}

	// For non-SVG elements, just recurse through children
	const children = React.Children.map(node.props.children, (child) =>
		forceColorOverride(child, fillColor, strokeColor)
	);

	return cloneElement(node, node.props, children);
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

	// Create the SVG with forced colors
	const svgElement = (
		<Svg
			width={size}
			height={size}
			fill={fillColor}
			stroke={strokeColor}
			// Additional style override
			style={{ fill: fillColor, stroke: strokeColor } as any}
		/>
	);

	// Apply aggressive color override
	const coloredSvg = forceColorOverride(
		svgElement,
		fillColor,
		strokeColor
	) as ReactElement;

	return (
		<View
			style={[{ width: size, height: size }, style]}
			testID={testID ?? "Icon"}
		>
			{coloredSvg}
		</View>
	);
}
