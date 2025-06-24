/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */
// styles/useThemeColor.ts
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

/**
 * A small helper to pick either an explicit override (light / dark)
 * or fall back to your tokenized Colors.light / Colors.dark palette.
 *
 * @param overrides  an object like { light?: string; dark?: string }
 * @param colorName  the key of your Colors.light & Colors.dark maps
 */
export function useThemeColor<
	K extends keyof typeof Colors.light & keyof typeof Colors.dark
>(overrides: { light?: string; dark?: string }, colorName: K): string {
	// are we in “light” or “dark” mode?
	const theme = useColorScheme() || "light";
	// did the caller pass an explicit override?
	const overrideColor = overrides[theme];
	if (overrideColor) {
		return overrideColor;
	}
	// otherwise pull from your token palette
	return Colors[theme][colorName];
}
