// app/_layout.tsx
import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ThemeProvider } from "styles";

SplashScreen.preventAutoHideAsync();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		WorkSans: require("../assets/fonts/WorkSans-Regular.ttf"),
		Satoshi: require("../assets/fonts/Satoshi-Regular.ttf"),
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		// must return null so nothing tries to render before provider is up
		return null;
	}

	return (
		<ThemeProvider>
			{/*
						<Slot /> will render your next‐level layout:
						 • app/index.tsx
						 • app/(tabs)/_layout.tsx  (if you have a tabs folder)
					*/}
			<Slot />
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}
