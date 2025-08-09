"use client";

import { useEffect, useRef } from "react";
import { loadAnime } from "@/lib/loadAnime";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

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
	titleMain: "Senior Full‑Stack",
	titleAccent: "Developer",
	description:
		"Senior Full‑Stack Developer with 8+ years of experience designing, building, and deploying scalable, robust, business‑driven web applications. I specialize in JavaScript & TypeScript and Python/Django, with a focus on clean architecture and delivering solutions that create real impact on users and business.",
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
	const imageWrapperRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let disposed = false;
		const run = async () => {
			const { createTimeline, animate, stagger } = await loadAnime();
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

			if (imageWrapperRef.current) {
				animate(imageWrapperRef.current, {
					translateY: [24, 0],
					scale: [0.96, 1],
					opacity: [0, 1],
					easing: "easeOutExpo",
					duration: 900,
					delay: 150,
				});
			}
		};
		run();
		return () => {
			disposed = true;
		};
	}, []);

	return (
		<section id="about" className="scroll-mt-24 pt-[8rem] pb-10 px-4">
			<div className="container mx-auto max-w-4xl">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div>
						<h2
							ref={headingRef}
							className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
						>
							{About.titleMain}
							<span className="text-primary block">
								{About.titleAccent}
							</span>
						</h2>
						<p
							ref={descriptionRef}
							className="text-lg text-muted-foreground mb-8 leading-relaxed"
						>
							{About.description}
						</p>
						<div ref={ctasRef} className="flex space-x-4">
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
						<div ref={socialsRef} className="flex space-x-4 mt-8">
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
					<div className="relative">
						<div
							ref={imageWrapperRef}
							className={`aspect-square rounded-2xl bg-gradient-to-br ${About.imageGradientFromTo} p-8 opacity-0`}
						>
							<Image
								src={About.image.src}
								alt={About.image.alt}
								width={About.image.width}
								height={About.image.height}
								className="rounded-xl object-cover w-full h-auto"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
