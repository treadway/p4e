// components/ErrorBoundary.tsx
import React, { Component, ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: any) {
		console.log("Error caught by boundary:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<View style={styles.container}>
					<Text style={styles.title}>Something went wrong</Text>
					<Text style={styles.message}>
						The app encountered an error. Please restart the app.
					</Text>
				</View>
			);
		}

		return this.props.children;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	message: {
		fontSize: 16,
		textAlign: "center",
		color: "#666",
	},
});

// app/_layout.tsx usage:
import { ErrorBoundary } from "@/components/ErrorBoundary";

return (
	<ErrorBoundary>
		<ThemeProvider>
			<Slot />
			<StatusBar style="auto" />
		</ThemeProvider>
	</ErrorBoundary>
);
