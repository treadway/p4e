// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { useStyles, createStyleSheet } from "styles";
import { useVariants } from "@/utils/useVariants";
import { View } from "react-native";
import { P4EBackground } from "components/atoms/p-4-e-background"; // Fixed import path

export interface BaseLayoutProps {
	imagePosition: (typeof BaseLayoutVariants.imagePosition)[number];
	children?: React.ReactNode;
	testID?: string;
}

export const BaseLayoutVariants = {
	imagePosition: ["Bottom", "Top"],
} as const;

function BaseLayoutWrapper({
	children,
	imagePosition,
	testID,
}: BaseLayoutProps) {
	const { styles } = useStyles(stylesheet);
	const { vstyles } = useVariants(
		BaseLayoutVariants,
		{ imagePosition },
		styles
	);

	return (
		<View testID={testID ?? "BaseLayoutWrapper"} style={[vstyles.root()]}>
			{/* Enhanced P4E Background - handles its own positioning */}
			<P4EBackground
				position={imagePosition}
				section="Transportation" // TODO: Make this dynamic based on current tab
				imageVariant="1"
				testID={`BaseLayoutWrapper-background-${imagePosition.toLowerCase()}`}
			/>

			{/* Main content area where tabs will render */}
			<View
				testID="BaseLayoutWrapper-content-area"
				style={vstyles.contentArea()}
			>
				{children}
			</View>
		</View>
	);
}

export default function TabsLayout() {
	return (
		<BaseLayoutWrapper imagePosition="Bottom" testID="(tabs)/_layout">
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
						backgroundColor: "white",
						borderTopWidth: 1,
						borderTopColor: "#E5E5E5",
						paddingBottom: 20, // Account for safe area
						height: 80,
						shadowColor: "#000",
						shadowOffset: { width: 0, height: -2 },
						shadowOpacity: 0.1,
						shadowRadius: 8,
						elevation: 5,
					},
					tabBarActiveTintColor: "#22C55E", // Your green theme
					tabBarInactiveTintColor: "#6B7280",
					tabBarLabelStyle: {
						fontSize: 12,
						fontWeight: "500",
					},
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Transportation",
						tabBarIcon: ({ color, size }) => (
							<View
								testID="(tabs)/_layout-transportation-icon"
								style={{
									width: size,
									height: size,
									backgroundColor: color,
									borderRadius: size / 2,
								}}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="rewards"
					options={{
						title: "Rewards",
						tabBarIcon: ({ color, size }) => (
							<View
								testID="(tabs)/_layout-rewards-icon"
								style={{
									width: size,
									height: size,
									backgroundColor: color,
									borderRadius: size / 2,
								}}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="coming-soon"
					options={{
						title: "Coming Soon",
						tabBarIcon: ({ color, size }) => (
							<View
								testID="(tabs)/_layout-coming-soon-icon"
								style={{
									width: size,
									height: size,
									backgroundColor: color,
									borderRadius: size / 2,
								}}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="about"
					options={{
						title: "About",
						tabBarIcon: ({ color, size }) => (
							<View
								testID="(tabs)/_layout-about-icon"
								style={{
									width: size,
									height: size,
									backgroundColor: color,
									borderRadius: size / 2,
								}}
							/>
						),
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
		zIndex: 10, // Much higher z-index to ensure it's above background
		paddingBottom: theme.spacing.navBottom, // Account for tab bar
		elevation: 10, // Android elevation
	},

	// Variant styles - no longer needed since P4EBackground handles positioning
	rootImagePositionTop: {
		// Any specific adjustments when background is at top
	},

	rootImagePositionBottom: {
		// Any specific adjustments when background is at bottom
	},
}));
