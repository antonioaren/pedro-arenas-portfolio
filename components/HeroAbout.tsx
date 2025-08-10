"use client";

import { useEffect, useRef } from "react";
import { loadAnime } from "@/lib/loadAnime";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import Aurora from "@/components/reactbits/backgrounds/Aurora/Aurora";

type SocialType = "github" | "linkedin" | "email";

const socialIconByType: Record<SocialType, typeof Github> = {
	github: Github,
	linkedin: Linkedin,
	email: Mail,
};

type AboutInfo = {
	titleMain: string;
	titleAccent: string;
	description: string;
	ctas: Array<{
		label: string;
		href: string;
		variant?: "default" | "outline";
		newTab?: boolean;
	}>;
	socials: Array<{
		type: SocialType;
		href: string;
		target?: "_blank" | "_self" | "_parent" | "_top";
	}>;
	image: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
	imageGradientFromTo: string;
};

const About: AboutInfo = {
	titleMain: "Hi! 👋",
	titleAccent: "I'm Software Developer",
	description:
		"I have been working as a Software Developer for 8+ years. I build scalable, cleanly‑architected web apps with JavaScript/TypeScript and Python/Django. I care about DX, performance, accessibility, and shipping business impact—turning complex problems into simple, maintainable systems.",
	ctas: [
		{ label: "Get In Touch", href: "#contact" },
		{
			label: "Download Resume",
			href: "/resume.pdf",
			variant: "outline",
			newTab: true,
		},
	],
	socials: [
		{
			type: "github",
			href: "https://github.com/antonioaren",
			target: "_blank",
		},
		{
			type: "linkedin",
			href: "https://linkedin.com/in/antonioaren",
			target: "_blank",
		},
		{
			type: "email",
			href: "mailto:antonioaren2@gmail.com",
			target: "_blank",
		},
	],
	image: {
		src: "/me.png",
		alt: "Antonio Arenas",
		width: 337,
		height: 337,
	},
	imageGradientFromTo: "from-primary/20 to-primary/5",
};

export default function HeroAbout() {
	const headingRef = useRef<HTMLHeadingElement | null>(null);
	const descriptionRef = useRef<HTMLParagraphElement | null>(null);
	const ctasRef = useRef<HTMLDivElement | null>(null);
	const socialsRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let disposed = false;
		const run = async () => {
			const { createTimeline, stagger } = await loadAnime();
			if (disposed) return;

			// Timeline for hero left column
			const tl = createTimeline({ autoplay: true });

			if (headingRef.current) {
				tl.add({
					targets: headingRef.current.childNodes,
					translateY: [24, 0],
					opacity: [0, 1],
					easing: "easeOutExpo",
					duration: 700,
					delay: stagger(60),
				});
			}

			if (descriptionRef.current) {
				tl.add(
					{
						targets: descriptionRef.current,
						translateY: [12, 0],
						opacity: [0, 1],
						easing: "easeOutExpo",
						duration: 600,
					},
					"-=300"
				);
			}

			if (ctasRef.current) {
				const buttons = ctasRef.current.querySelectorAll("a, button");
				tl.add(
					{
						targets: buttons,
						translateY: [16, 0],
						opacity: [0, 1],
						easing: "easeOutExpo",
						duration: 500,
						delay: stagger(80),
					},
					"-=200"
				);
			}

			if (socialsRef.current) {
				const icons = socialsRef.current.querySelectorAll("svg");
				tl.add(
					{
						targets: icons,
						scale: [0.8, 1],
						opacity: [0, 1],
						easing: "easeOutBack",
						duration: 500,
						delay: stagger(70),
					},
					"-=200"
				);
			}
		};
		run();
		return () => {
			disposed = true;
		};
	}, []);

	return (
		<section
			id="about"
			className="relative overflow-hidden scroll-mt-24 px-4 py-[8rem] min-h-[70vh]"
		>
			<div className="absolute inset-0 -z-10 pointer-events-none">
				<Aurora
					colorStops={["#0ea5e9", "#8b5cf6", "#10b981"]}
					amplitude={3}
					blend={1}
					speed={1.0}
				/>
			</div>
			<div className="container mx-auto max-w-6xl relative">
				<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 lg:gap-16">
					<div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
						<h2
							ref={headingRef}
							className="text-4xl md:text-6xl font-bold tracking-tight"
						>
							{About.titleMain}
							<span className="text-primary block">
								{About.titleAccent}
							</span>
						</h2>
						<p
							ref={descriptionRef}
							className="text-lg text-muted-foreground leading-relaxed"
						>
							{About.description}
						</p>
						<div
							ref={ctasRef}
							className="flex flex-wrap justify-center md:justify-start gap-4"
						>
							{About.ctas.map((cta) => (
								<Button
									key={cta.label}
									variant={cta.variant}
									asChild
								>
									<a
										href={cta.href}
										target={
											cta.newTab ? "_blank" : undefined
										}
										rel={
											cta.newTab
												? "noreferrer"
												: undefined
										}
									>
										{cta.label}
									</a>
								</Button>
							))}
						</div>
						<div
							ref={socialsRef}
							className="flex items-center justify-center md:justify-start gap-4 mt-4"
						>
							{About.socials.map((social) => {
								const Icon = socialIconByType[social.type];
								return (
									<Link
										key={social.type}
										href={social.href}
										className="text-muted-foreground hover:text-primary transition-colors"
										target={social.target}
									>
										<Icon className="w-6 h-6" />
									</Link>
								);
							})}
						</div>
					</div>
					<div className="flex justify-center">
						<div
							className={`relative mt-8 md:mt-0 rounded-full bg-gradient-to-br ${About.imageGradientFromTo} p-1 shadow-lg w-[220px] h-[220px] md:w-[260px] md:h-[260px]`}
						>
							<Image
								src={About.image.src}
								alt={About.image.alt}
								width={About.image.width}
								height={About.image.height}
								className="w-full h-full rounded-full object-cover"
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
