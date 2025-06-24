// styles/providers.tsx
import React from "react";
import { ThemeProvider } from "./index"; // re-exported from theme-context/index

export function Providers({ children }: { children: React.ReactNode }) {
	return <ThemeProvider>{children}</ThemeProvider>;
}
