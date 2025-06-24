// app/(tabs)/_layout.tsx
import React from "react";
import { Platform } from "react-native";
import { Tabs } from "expo-router";
import { useTheme } from "styles"; // ← make sure this points at your theme hook
import { IconSymbol } from "@/components/ui/IconSymbol";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";

export default function TabLayout() {
	const { theme } = useTheme();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarActiveTintColor: theme.colors.success, // ← use your theme’s success color
				tabBarStyle: Platform.select({
					ios: { position: "absolute" },
					default: {},
				}),
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<IconSymbol name="house.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
					tabBarIcon: ({ color }) => (
						<IconSymbol name="paperplane.fill" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
