import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${GeistSans.variable} ${GeistMono.variable}`}
		>
			<body className="min-h-screen bg-background">
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
