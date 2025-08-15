import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import { Toaster as ToastToaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
	title: "Pedro Arenas | Senior Frontend Engineer",
	description:
		"Senior Frontend/Full‑Stack Engineer. −45% page‑load, −30% AWS costs, 500k+ monthly visitors. Available Remote (EU).",
	metadataBase: new URL("https://pedroarenas.dev"),
	alternates: { canonical: "/" },
	authors: [
		{
			name: "Pedro Arenas",
			url: "https://pedroarenas.dev",
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
		title: "Pedro Arenas — Senior Frontend Engineer",
		description:
			"I build fast, scalable web apps that move metrics: −45% page‑load, −30% AWS costs, 500k+ monthly visitors.",
		url: "https://pedroarenas.dev",
		siteName: "Pedro Arenas Portfolio",
		images: [
			{
				url: "/social-photo.webp",
				width: 1200,
				height: 630,
				alt: "Pedro Arenas",
			},
		],
		type: "website",
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: "Pedro Arenas — Senior Frontend Engineer",
		description:
			"I build fast, scalable web apps that move metrics: −45% page‑load, −30% AWS costs, 500k+ monthly visitors.",
		images: ["/social-photo.webp"],
		creator: "@pedroarenas",
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
					<ScrollToTop />
					<ToastToaster />
					<SpeedInsights />
					<Analytics />
				</ThemeProvider>
			</body>
		</html>
	);
}
