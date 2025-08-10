"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAnimeInView } from "@/hooks/use-anime-in-view";

type SectionId = "about" | "projects" | "skills" | "contact";

export default function Navigation() {
	const navRef = useRef<HTMLElement | null>(null);
	const [navHeight, setNavHeight] = useState<number>(64);
	const [activeSection, setActiveSection] = useState<SectionId>("about");
	const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
	const lastScrollRef = useRef<number>(0);
	const brandRef = useRef<HTMLHeadingElement | null>(null);
	const linksRef = useRef<HTMLDivElement | null>(null);

	const sections: SectionId[] = useMemo(
		() => ["about", "projects", "skills", "contact"],
		[]
	);

	// Initialize active section from URL hash on first mount
	useEffect(() => {
		const fromHash = (window.location.hash || "#about").replace("#", "");
		if ((sections as string[]).includes(fromHash)) {
			setActiveSection(fromHash as SectionId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// Measure nav height
		const measure = () => {
			const h = navRef.current?.offsetHeight ?? 64;
			setNavHeight(h);
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, []);

	useEffect(() => {
		// Scroll direction + scrollspy
		let ticking = false;
		let sectionOffsets: Record<SectionId, number> = {
			about: 0,
			projects: 0,
			skills: 0,
			contact: 0,
		};

		const computeOffsets = () => {
			sections.forEach((id) => {
				const el = document.getElementById(id);
				if (el) {
					const rect = el.getBoundingClientRect();
					// Align scrollspy with browser anchor scroll which respects scroll-margin-top
					const scrollMarginTopPx = parseFloat(
						getComputedStyle(el).scrollMarginTop || "0"
					);
					sectionOffsets[id] = Math.max(
						0,
						rect.top +
							window.scrollY -
							(isNaN(scrollMarginTopPx) ? 0 : scrollMarginTopPx)
					);
				}
			});
		};

		const onScroll = () => {
			const currentY = window.scrollY;
			if (ticking) return;

			window.requestAnimationFrame(() => {
				// Show mobile secondary menu when scrolling down and not at very top
				const lastY = lastScrollRef.current;
				const isScrollingDown = currentY > lastY;
				const beyondTop = currentY > 8;
				setShowMobileMenu(isScrollingDown && beyondTop);
				lastScrollRef.current = currentY;

				// Scrollspy: find last section whose offset is above current position + nav offset
				const offset = currentY + navHeight + 12; // small gap
				let current: SectionId = sections[0];
				for (const id of sections) {
					const top = sectionOffsets[id] ?? 0;
					if (top <= offset) current = id;
				}
				if (current !== activeSection) setActiveSection(current);

				ticking = false;
			});
			ticking = true;
		};

		computeOffsets();
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", computeOffsets);
		window.addEventListener("load", computeOffsets);
		// Sync active link immediately on hash changes (e.g., clicking a nav link)
		const onHashChange = () => {
			const id = (window.location.hash || "#about").replace("#", "");
			if ((sections as string[]).includes(id)) {
				setActiveSection(id as SectionId);
				computeOffsets();
				onScroll();
			}
		};
		window.addEventListener("hashchange", onHashChange);
		window.addEventListener("orientationchange", computeOffsets);
		return () => {
			window.removeEventListener("scroll", onScroll as EventListener);
			window.removeEventListener("resize", computeOffsets);
			window.removeEventListener("load", computeOffsets);
			window.removeEventListener("hashchange", onHashChange);
			window.removeEventListener("orientationchange", computeOffsets);
		};
	}, [activeSection, navHeight, sections]);

	// Entrance animation for brand and links
	useAnimeInView(
		brandRef,
		(anime, el) => {
			const { animate } = anime;
			animate(el, {
				translateY: [-10, 0],
				opacity: [0, 1],
				easing: "easeOutExpo",
				duration: 600,
			});
		},
		{ threshold: 0.9 }
	);

	useAnimeInView(
		linksRef,
		(anime, el) => {
			const items = el.querySelectorAll("a");
			const { animate, stagger } = anime;
			animate(items, {
				translateY: [-12, 0],
				opacity: [0, 1],
				easing: "easeOutExpo",
				duration: 550,
				delay: stagger(70),
			});
		},
		{ threshold: 0.9 }
	);

	const linkBase =
		"text-sm font-semibold uppercase tracking-[0.02em] transition-colors whitespace-nowrap";

	const renderLink = (id: SectionId, label: string) => (
		<a
			key={id}
			href={`#${id}`}
			onClick={() => setActiveSection(id)}
			className={
				activeSection === id
					? `${linkBase} text-primary border-b-2 border-primary pb-1`
					: `${linkBase} hover:text-primary text-foreground/80`
			}
		>
			{label}
		</a>
	);

	return (
		<>
			<nav
				ref={navRef}
				className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50"
			>
				<div className="container mx-auto px-4 py-4">
					<div className="flex justify-between items-center">
						<h1
							ref={brandRef}
							className="text-2xl font-bold tracking-tight flex items-center space-x-2"
						>
							<img
								src="/logo.svg"
								alt="Pedro Arenas"
								width={40}
								height={30}
							/>
							<span>Pedro Arenas</span>
						</h1>
						<div
							ref={linksRef}
							className="hidden md:flex space-x-6"
						>
							{renderLink("about", "About")}
							{renderLink("projects", "Projects")}
							{renderLink("skills", "Skills")}
							{renderLink("contact", "Contact")}
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile-only secondary menu that slides in when scrolling down */}
			<div
				style={{ top: navHeight }}
				className={
					"fixed left-0 right-0 z-40 md:hidden transition-transform duration-600 ease-in-out " +
					(showMobileMenu ? "translate-y-0" : "-translate-y-full")
				}
			>
				<div className="bg-background/95 backdrop-blur-sm border-b">
					<div className="container mx-auto px-4">
						<div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-3">
							{renderLink("about", "About")}
							{renderLink("projects", "Projects")}
							{renderLink("skills", "Skills")}
							{renderLink("contact", "Contact")}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
