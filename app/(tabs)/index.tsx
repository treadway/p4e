import {
	Image,
	StyleSheet,
	// Platform,
	ScrollView,
	View,
	ImageBackground,
	Text,
} from "react-native";

// import { HelloWave } from "@/components/HelloWave";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TextField } from "@/components/TextField";

import * as React from "react";
// import { LinearGradient } from "react-native-linear-gradient";

export default function HomeScreen() {
	return (
		<ThemedView>
			<ScrollView
				style={styles.imagePositionbottom}
				contentContainerStyle={styles.imagePositionbottomContainerContent}
			>
				<ImageBackground
					style={styles.p4ePosition}
					resizeMode="cover"
					source={require("@/assets/images/content/bottom-background-1.png")}
				>
					{/* <LinearGradient
							style={[styles.gradient, styles.gradientLayout]}
							locations={[0.09, 0.75]}
							colors={["rgba(248, 251, 236, 0)", "rgba(248, 251, 236, 0.87)"]}
							useAngle={true}
							angle={180}
						/> */}
				</ImageBackground>
				<View style={styles.emptyContent}>
					<TextField>Text Field</TextField>
				</View>
			</ScrollView>
			<ScrollView
				style={styles.imagePositionbottom}
				contentContainerStyle={styles.imagePositiontopContainerContent}
			>
				<View style={[styles.p4eTopBackground, styles.p4ePosition]}>
					<Image
						style={styles.imageIcon}
						resizeMode="cover"
						source={require("@/assets/images/content/bottom-background-1.png")}
					/>
					{/* <LinearGradient
							style={[styles.gradient1, styles.gradientLayout]}
							locations={[0.13, 0.31]}
							colors={["rgba(216, 235, 223, 0)", "#d8ebdf"]}
							useAngle={true}
							angle={180}
						/> */}
				</View>
				<View style={styles.emptyContent}>
					<Text style={styles.emptyContent1}>Empty Content</Text>
				</View>
			</ScrollView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},

	imagePositionbottomContainerContent: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	imagePositiontopContainerContent: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	gradientLayout: {
		backgroundColor: "transparent",
		width: 375,
		height: 780,
		position: "absolute",
	},
	p4ePosition: {
		zIndex: 0,
		width: 374,
		bottom: 0,
		position: "absolute",
		height: 780,
		left: 0,
		overflow: "hidden",
	},
	gradient: {
		top: 648,
		left: 375,
		transform: [
			{
				rotate: "-180deg",
			},
		],
	},
	emptyContent1: {
		fontSize: 16,
		letterSpacing: 0,
		lineHeight: 20,
		fontWeight: "700",
		fontFamily: "WorkSans-Bold",
		color: "#00c851",
		textAlign: "center",
	},
	emptyContent: {
		alignSelf: "stretch",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 1,
		height: 780,
	},
	imagePositionbottom: {
		backgroundColor: "#fff",
		width: 360,
		minHeight: 640,
		flex: 1,
		maxWidth: 360,
	},
	imageIcon: {
		top: -273,
		height: 671,
		width: 375,
		left: 0,
		position: "absolute",
	},
	gradient1: {
		top: 0,
		left: 0,
		backgroundColor: "transparent",
	},
	p4eTopBackground: {
		backgroundColor: "#f2f2f7",
	},
	baseview: {
		borderRadius: 5,
		borderStyle: "dashed",
		borderColor: "#9747ff",
		borderWidth: 1,
		width: "100%",
		padding: 16,
		gap: 32,
		overflow: "hidden",
	},
});
