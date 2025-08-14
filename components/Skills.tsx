"use client";

import { Badge } from "@/components/ui/badge";
import { Code, Database, Globe, Smartphone } from "lucide-react";
import { useRef } from "react";
import { useAnimeInView } from "@/hooks/use-anime-in-view";
import LetterGlitch from "@/components/reactbits/backgrounds/LetterGlitch/LetterGlitch";
import SplitText from "@/components/reactbits/text-animations/SplitText/SplitText";

type IconType = "code" | "database" | "globe" | "smartphone";

const iconByType: Record<IconType, typeof Code> = {
	code: Code,
	database: Database,
	globe: Globe,
	smartphone: Smartphone,
};

type SkillCategory = {
	title: string;
	icon: IconType;
	skills: string[];
};

type SkillsInfo = {
	heading: string;
	subheading: string;
	categories: SkillCategory[];
};

const skillsInfo: SkillsInfo = {
	heading: "Technical Skills",
	subheading: "Technologies and tools I work with to bring ideas to life.",
	categories: [
		{
			title: "Frontend",
			icon: "code",
			skills: [
				"React",
				"Vue.js",
				"Angular",
				"Next.js",
				"Nuxt",
				"TypeScript",
			],
		},
		{
			title: "Backend",
			icon: "database",
			skills: [
				"Node.js",
				"Python",
				"Django",
				"PostgreSQL",
				"MongoDB",
				"DynamoDB",
			],
		},
		{
			title: "Cloud & DevOps",
			icon: "globe",
			skills: [
				"AWS",
				"EC2",
				"S3",
				"CloudFront",
				"RDS",
				"Lambdas",
				"GitHub Actions",
			],
		},
		{
			title: "Testing & Architecture",
			icon: "smartphone",
			skills: [
				"MSW",
				"Pacts",
				"E2E Testing",
				"Clean Architecture",
				"Hexagonal Architecture",
			],
		},
	],
};

export default function Skills() {
	const sectionRef = useRef<HTMLDivElement | null>(null);
	const gridRef = useRef<HTMLDivElement | null>(null);

	useAnimeInView(
		sectionRef,
		(anime, el) => {
			const heading = el.querySelector("h2");
			const sub = el.querySelector("p");
			const { createTimeline } = anime;
			(el as HTMLElement).style.opacity = "1";
			createTimeline({ autoplay: true })
				.add({
					targets: heading,
					translateY: [16, 0],
					opacity: [0, 1],
					easing: "easeOutExpo",
					duration: 600,
				})
				.add(
					{
						targets: sub,
						translateY: [12, 0],
						opacity: [0, 1],
						easing: "easeOutExpo",
						duration: 500,
					},
					"-=250"
				);
		},
		{ threshold: 0.2 }
	);

	useAnimeInView(
		gridRef,
		(anime, el) => {
			const cards = el.querySelectorAll("[data-skill-card]");
			const { animate, stagger } = anime;
			(el as HTMLElement).style.opacity = "1";
			animate(cards, {
				translateY: [20, 0],
				opacity: [0, 1],
				easing: "easeOutExpo",
				duration: 550,
				delay: stagger(80),
			});
		},
		{ threshold: 0.2 }
	);

	return (
		<section className="relative">
			<div className="absolute inset-0 -z-10 pointer-events-none opacity-35">
				<LetterGlitch
					glitchSpeed={100}
					glitchColors={["#0ea5e9", "#8b5cf6", "#10b981"]}
					centerVignette={true}
					outerVignette={true}
					smooth={true}
				/>
			</div>
			<div id="skills" className="scroll-mt-24 py-16 px-4 relative z-10">
				<div ref={sectionRef} className="container mx-auto max-w-4xl">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
							<SplitText
								as="span"
								className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
								text={skillsInfo.heading}
								splitType="chars"
								from={{ opacity: 0, y: 40 }}
								to={{ opacity: 1, y: 0 }}
								threshold={0.2}
							/>
						</h2>
						<p className="text-lg text-muted-foreground leading-relaxed">
							{skillsInfo.subheading}
						</p>
					</div>

					<div
						ref={gridRef}
						className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 opacity-0"
					>
						{skillsInfo.categories.map((category) => {
							const Icon = iconByType[category.icon];
							return (
								<div
									key={category.title}
									data-skill-card
									className="text-center"
								>
									<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
										<Icon className="w-8 h-8 text-primary" />
									</div>
									<h3 className="text-xl font-semibold tracking-tight mb-4">
										{category.title}
									</h3>
									<div className="space-y-2">
										{category.skills.map((skill) => (
											<Badge
												key={skill}
												variant="outline"
												className="mr-2 mb-2 font-mono text-xs uppercase tracking-wide"
											>
												{skill}
											</Badge>
										))}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
