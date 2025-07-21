// app/_layout.tsx
import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ThemeProvider } from "styles";
import { ErrorBoundary } from "react-error-boundary";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		WorkSans: require("../assets/fonts/WorkSans-Regular.ttf"),
		Satoshi: require("../assets/fonts/Satoshi-Regular.ttf"),
	});

	useEffect(() => {
		if (fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded]);

	if (!fontsLoaded) return null;

	return (
		<ErrorBoundary fallback={<ErrorFallback />}>
			<ThemeProvider>
				<Slot /> <StatusBar style="auto" />
			</ThemeProvider>
		</ErrorBoundary>
	);
}
