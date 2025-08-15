"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const aboutSection = document.getElementById("about");

		// If we have a clear first section, use IntersectionObserver to toggle visibility
		if (aboutSection && "IntersectionObserver" in window) {
			const observer = new IntersectionObserver(
				(entries) => {
					const entry = entries[0];
					// Hide while first section is on screen; show when it's out of view
					setIsVisible(!entry.isIntersecting);
				},
				{
					root: null,
					threshold: 0.05,
				}
			);
			observer.observe(aboutSection);
			return () => observer.disconnect();
		}

		// Fallback: show after user scrolls a bit
		const onScroll = () => {
			setIsVisible(window.scrollY > 400);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const handleClick = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div
			className={
				`fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50 transition-all duration-300 ${
					isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
				}`
			}
			aria-hidden={!isVisible}
		>
			<Button
				onClick={handleClick}
				variant="secondary"
				size="icon"
				className="h-12 w-12 rounded-full shadow-lg bg-background/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur hover:bg-background"
				aria-label="Back to top"
			>
				<ArrowUp className="h-5 w-5" />
			</Button>
		</div>
	);
}


