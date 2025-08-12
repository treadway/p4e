// app/(tabs)/_layout.tsx (renamed from base-view, this becomes your main layout)
import { Tabs } from "expo-router";
import { useStyles, createStyleSheet } from "styles";
import { useVariants } from "@/utils/useVariants";
import { View } from "react-native";
import { P4EBackground } from "components/atoms/p-4-e-background"; // Fixed import

export interface BaseLayoutProps {
	imagePosition: (typeof BaseLayoutVariants.imagePosition)[number];
	children?: React.ReactNode;
	testID?: string;
}

export const BaseLayoutVariants = {
	imagePosition: ["Bottom", "Top"],
} as const;

function BaseLayoutWrapper({ children, ...props }: BaseLayoutProps) {
	const { imagePosition } = props;
	const { styles } = useStyles(stylesheet);
	const { vstyles } = useVariants(
		BaseLayoutVariants,
		{ imagePosition },
		styles
	);

	return (
		<View testID={props.testID ?? "base-layout"} style={[vstyles.root()]}>
			{/* Background component - only show if imagePosition is Bottom */}
			{imagePosition === "Bottom" && (
				<P4EBackground testID="background-bottom" />
			)}

			{/* Main content area */}
			<View style={vstyles.contentArea()}>{children}</View>

			{/* Top background if needed */}
			{imagePosition === "Top" && <P4EBackground testID="background-top" />}
		</View>
	);
}

export default function TabsLayout() {
	return (
		<BaseLayoutWrapper imagePosition="Bottom">
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						// Add your tab bar styling here from themes
					},
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Transportation",
						// Add tab icon here
					}}
				/>
				<Tabs.Screen
					name="rewards"
					options={{
						title: "Rewards",
						// Add tab icon here
					}}
				/>
				<Tabs.Screen
					name="coming-soon"
					options={{
						title: "Coming Soon",
						// Add tab icon here
					}}
				/>
				<Tabs.Screen
					name="about"
					options={{
						title: "About",
						// Add tab icon here
					}}
				/>
			</Tabs>
		</BaseLayoutWrapper>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	root: {
		flex: 1,
		width: theme.page.width,
		backgroundColor: theme.page.background,
		position: "relative",
	},
	contentArea: {
		flex: 1,
		zIndex: 1, // Ensure content is above background
	},
	// Variants for image positioning
	rootImagePositionTop: {
		// Any specific styles for top positioning
	},
	rootImagePositionBottom: {
		// Any specific styles for bottom positioning
	},
}));
