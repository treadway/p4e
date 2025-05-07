import { useCallback, useMemo, useRef } from "react";
import {
	Platform,
	PressableStateCallbackType,
	StyleProp,
	ViewStyle,
	TextStyle,
} from "react-native";

type VariantConfig = Record<string, readonly string[]>;
type VariantProps = Record<string, string>;
type NamedStyles = Record<string, StyleProp<ViewStyle | TextStyle>>;
type Condition = (e?: PressableStateCallbackType) => boolean;

export function useVariants(
	variants: VariantConfig,
	props: VariantProps = {},
	styles: NamedStyles = {}
) {
	const statesRef = useRef(props);
	statesRef.current = props;

	const isVState = useCallback(
		(key: string) => key.toLowerCase() === "state",
		[]
	);

	const buildStyles = useCallback(
		(slug: string, allStyles: NamedStyles) => {
			const result: [Condition | null, StyleProp<any>][] = [
				[null, allStyles[slug]],
			];
			const entries = Object.entries(variants).sort(([a], [b]) =>
				a.localeCompare(b)
			);

			for (const [v1, values1] of entries) {
				if (entries.length === 1) {
					for (const val1 of values1) {
						const key = `${slug}${capitalize(v1)}${val1}`;
						const style = allStyles[key];
						if (!style) continue;

						const cond: Condition = (e) =>
							statesRef.current[v1] === val1 ||
							(isVState(v1) ? e?.[val1.toLowerCase()] ?? false : false);

						result.push([cond, style]);
					}
				} else {
					if (isVState(v1)) continue;

					for (const val1 of values1) {
						for (const [v2, values2] of entries) {
							if (v1 === v2) continue;

							for (const val2 of values2) {
								const key = `${slug}${capitalize(v1)}${val1}${capitalize(
									v2
								)}${val2}`;
								const style = allStyles[key];
								if (!style) continue;

								const cond: Condition = (e) =>
									(statesRef.current[v1] === val1 ||
										(isVState(v1)
											? e?.[val1.toLowerCase()] ?? false
											: false)) &&
									(statesRef.current[v2] === val2 ||
										(isVState(v2) ? e?.[val2.toLowerCase()] ?? false : false));

								result.push([cond, style]);
							}
						}
					}
				}
			}

			return result;
		},
		[variants, isVState]
	);

	const proxyStyles = useCallback(
		(stylesObj: NamedStyles) => {
			const cache = new Map<string, [Condition | null, StyleProp<any>][]>();
			const result: Record<
				string,
				(e?: PressableStateCallbackType) => StyleProp<any>[]
			> = {};

			for (const key in stylesObj) {
				result[key] = (e?: PressableStateCallbackType) => {
					let cached = cache.get(key);
					if (!cached) {
						cached = buildStyles(key, stylesObj);
						cache.set(key, cached);
					}

					return cached
						.filter(([cond]) => cond === null || cond(e))
						.map(([, style]) => style);
				};
			}

			return result;
		},
		[buildStyles]
	);

	const vstyles = useMemo(() => proxyStyles(styles), [styles, proxyStyles]);

	return { vstyles };
}

// Helper
function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
