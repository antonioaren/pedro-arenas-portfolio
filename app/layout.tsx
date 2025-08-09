import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
	title: "Portfolio",
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
				</ThemeProvider>
			</body>
		</html>
	);
}
