import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import { Toaster as ToastToaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
	title: "Pedro Arenas | Software Developer",
	description: "Portfolio",
	authors: [
		{
			name: "Pedro Arenas",
			url: "https://www.pedroarenas.com",
		},
	],
	creator: "Pedro Arenas",
	publisher: "Pedro Arenas",
	robots: { index: true, follow: true },
	icons: {
		icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
	},
	manifest: "/site.webmanifest",
	openGraph: {
		title: "Portfolio",
		description: "Portfolio",
	},
};

const plusJakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
	weight: "variable",
});

const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	display: "swap",
	weight: "variable",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${plusJakarta.variable} ${jetBrainsMono.variable}`}
		>
			<head>
				<link rel="icon" href="/logo.svg" type="image/svg+xml" />
			</head>
			<body className="min-h-screen bg-background font-sans antialiased">
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem={false}
					disableTransitionOnChange
				>
					<Navigation />
					<main>{children}</main>
					<SiteFooter />
					<ToastToaster />
					<SpeedInsights />
					<Analytics />
				</ThemeProvider>
			</body>
		</html>
	);
}
