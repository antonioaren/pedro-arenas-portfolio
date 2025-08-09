"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useRef } from "react";
import { useAnimeInView } from "@/hooks/use-anime-in-view";

type ProjectComponent = {
	heading: string;
	subheading: string;
	projects: {
		title: string;
		jobPosition: string;
		projectDate: string;
		description: string;
		image: { src: string; alt: string; height?: number; width?: number };
		gradient: string;
		techStack: string[];
		links: { github?: string; demo?: string };
	}[];
};

const projectComponent: ProjectComponent = {
	heading: "Featured Projects",
	subheading:
		"Here are some of my recent projects that showcase my skills and experience in full-stack development.",
	projects: [
		{
			title: "Udima",
			jobPosition: "Frontend Developer",
			projectDate: "2024-2025",
			description:
				"Udima is a remote university that allows users to take courses and get information about degrees, masters, phd, etc.",
			image: {
				src: "/projects/udima.svg",
				alt: "Udima",
				height: 500,
				width: 500,
			},
			gradient: "from-white to-white",
			techStack: ["Nuxt 3", "TypeScript", "Github Actions", "Netlify"],
			links: {
				demo: "https://udima.es",
			},
		},
		{
			title: "Tostarica",
			jobPosition: "Frontend Developer",
			projectDate: "2025",
			description:
				"Tostarica is a platform that allows to sell biscuits in Spain. I had the opportunity to collaborate with the team to make a new website.",
			image: {
				src: "/projects/tostarica.webp",
				alt: "Tostarica",
			},
			gradient: "from-yellow-500 to-yellow-600",
			techStack: ["Nuxt 3", "GitHub Actions", "Netlify"],
			links: {
				demo: "https://tostarica.com",
			},
		},
		{
			title: "Dollar",
			jobPosition: "Full Stack Developer",
			projectDate: "2025",
			description:
				"Dollar is a platform that allows to follow your financial situation and get a better control of your money. This is a side project I decided to do by myself powered by AI.",
			image: {
				src: "/projects/dollar.svg",
				alt: "Dollar",
			},
			gradient: "from-purple-500 to-blue-600",
			techStack: ["Next.js", "TypeScript", "Github Actions", "Vercel"],
			links: {
				demo: "https://dollar.antonioaren.es",
				github: "https://github.com/antonioaren/dollar",
			},
		},
		{
			title: "Buscorepuestos",
			jobPosition: "Full Stack Developer",
			projectDate: "2022-2023",
			description:
				"Buscorepuestos is an e-commerce platform that scrapes the best products from various sources and sells them on its own website. It finds potential clients, provides detailed information about the products, and handles all aspects of the selling process.",
			image: {
				src: "/projects/buscorepuestos.svg",
				alt: "Buscorepuestos",
			},
			gradient: "from-blue-600 to-white",
			techStack: [
				"Angular",
				"Next.js",
				"TypeScript",
				"Heroku",
				"Github Actions",
				"Vercel",
				"MongoDB",
			],
			links: {
				demo: "https://buscorepuestos.com",
				github: "https://github.com/antonioaren/dollar",
			},
		},
		{
			title: "Credit Agricole Mon Commerce",
			jobPosition: "Frontend Developer",
			projectDate: "2022-2023",
			description:
				"Credit Agricoles is a bank that allows to manage your finances and get a better control of your money. I had the opportunity to collaborate in his product call Mon Commerce, Mon commerce helps business to contract online services for payments, invoices, etc.",
			image: {
				src: "/projects/camc.svg",
				alt: "Credit Agricole Mon Commerce",
			},
			gradient: "from-white to-white",
			techStack: ["Next.js", "TypeScript", "Github Actions", "Vercel"],
			links: {
				demo: "https://www.ca-moncommerce.com/",
			},
		},
		{
			title: "Agorapay",
			jobPosition: "Frontend Developer",
			projectDate: "2022-2023",
			description:
				"Agorapay is website for developers that help you to get started including paid pasarel to test payments.",
			image: {
				src: "/projects/agorapay.svg",
				alt: "Agorapay",
			},
			gradient: "from-white to-white",
			techStack: ["Next.js", "TypeScript", "Github Actions", "Vercel"],
			links: {
				demo: "https://agorapay.com",
			},
		},
	],
};

export default function Projects() {
	const sectionRef = useRef<HTMLDivElement | null>(null);
	const gridRef = useRef<HTMLDivElement | null>(null);

	useAnimeInView(
		sectionRef,
		(anime, el) => {
			const heading = el.querySelector("h2");
			const sub = el.querySelector("p");
			const { createTimeline } = anime;
			const tl = createTimeline({ autoplay: true });
			// Ensure wrapper becomes visible once animation starts
			const wrapper = el as HTMLElement;
			wrapper.style.opacity = "1";
			tl.add({
				targets: heading,
				translateY: [16, 0],
				opacity: [0, 1],
				easing: "easeOutExpo",
				duration: 600,
			}).add(
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
		{ threshold: 0.25 }
	);

	useAnimeInView(
		gridRef,
		(anime, el) => {
			const cards = el.querySelectorAll("[data-project-card]");
			const { animate, stagger } = anime;
			(el as HTMLElement).style.opacity = "1";
			animate(cards, {
				translateY: [24, 0],
				opacity: [0, 1],
				easing: "easeOutExpo",
				duration: 600,
				delay: stagger(90),
			});
		},
		{ threshold: 0.2 }
	);

	return (
		<section id="projects" className="scroll-mt-24 py-16 px-4 bg-muted/30">
			<div ref={sectionRef} className="container mx-auto max-w-6xl">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
						{projectComponent.heading}
					</h2>
					<p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
						{projectComponent.subheading}
					</p>
				</div>

				<div
					ref={gridRef}
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-0"
				>
					{projectComponent.projects.map((project) => (
						<TiltSpotlightCard
							key={project.title}
							project={project}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

type Project = ProjectComponent["projects"][number];

function TiltSpotlightCard({ project }: { project: Project }) {
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
		const el = wrapperRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const px = x / rect.width;
		const py = y / rect.height;

		const rotateX = (py - 0.5) * -10;
		const rotateY = (px - 0.5) * 10;

		el.style.setProperty("--mx", `${x}px`);
		el.style.setProperty("--my", `${y}px`);
		el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	}

	function handleMouseLeave() {
		const el = wrapperRef.current;
		if (!el) return;
		el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
	}

	return (
		<div
			ref={wrapperRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className="group relative transition-transform duration-200 will-change-transform [transform-style:preserve-3d]"
			data-project-card
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
				style={{
					background:
						"radial-gradient(500px circle at var(--mx) var(--my), rgba(59,130,246,0.15), transparent 40%)",
				}}
			/>

			<Card className="hover:shadow-lg transition-shadow rounded-xl">
				<CardHeader className="p-0">
					<div
						className={`aspect-video bg-gradient-to-br ${project.gradient} rounded-t-xl relative overflow-hidden`}
					>
						<Image
							src={project.image.src}
							alt={project.image.alt}
							width={project.image.width || 350}
							height={project.image.height || 200}
							className="object-contain w-full h-full p-12 group-hover:scale-105 transition-transform duration-300"
						/>
					</div>
				</CardHeader>
				<CardContent className="p-6">
					<CardTitle className="tracking-tight">
						{project.title}
					</CardTitle>
					{project.jobPosition && (
						<p className="text-sm font-medium text-muted-foreground mt-1">
							{project.jobPosition}
						</p>
					)}
					{project.projectDate && (
						<p className="text-xs text-muted-foreground/80 mt-0.5">
							{project.projectDate}
						</p>
					)}
					<CardDescription className="mt-3 mb-4 leading-relaxed">
						{project.description}
					</CardDescription>
					<div className="flex flex-wrap gap-2 mb-4">
						{project.techStack.map((tech) => (
							<Badge
								key={tech}
								variant="secondary"
								className="font-mono text-xs uppercase tracking-wide"
							>
								{tech}
							</Badge>
						))}
					</div>
					<div className="flex space-x-2">
						{project.links.github && (
							<Button size="sm" variant="outline" asChild>
								<Link
									href={project.links.github}
									target="_blank"
								>
									<Github className="w-4 h-4 mr-2" />
									Code
								</Link>
							</Button>
						)}
						{project.links.demo && (
							<Button size="sm" asChild>
								<Link href={project.links.demo}>
									<ExternalLink className="w-4 h-4 mr-2" />
									Live Demo
								</Link>
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
