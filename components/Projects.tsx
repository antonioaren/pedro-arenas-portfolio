"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TextType from "@/components/reactbits/text-animations/TextType/TextType";

import {
	Calendar,
	MapPin,
	ArrowUpRight,
	Zap,
	Target,
	TrendingUp,
	ExternalLink,
	Github,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Project {
	id: string;
	name: string;
	date: string;
	position: string;
	description: string;
	image: string;
	technologies: string[];
	impact?: {
		metric: string;
		value: string;
		description: string;
	}[];
	challenge: string;
	solution: string;
	links: { github?: string; demo?: string };
}

type ProjectComponent = {
	heading: string;
	subheading: string;
	narrative: string;
	projects: Project[];
};

const projectComponent: ProjectComponent = {
	heading: "My Development Journey",
	subheading:
		"From learning to leading: How real-world projects shaped my expertise",
	narrative:
		"I've always been someone eager to learn, so while finishing my studies, I took a full-stack course and learned by working on real projects with agencies like Lightbeee and Squaads. I worked on many different projects, gaining experience across the entire development spectrum. Currently, I'm focusing and getting interested in Generative AI projects and modern web technologies.",
	projects: [
		{
			id: "udima",
			name: "Udima",
			position: "Frontend Developer",
			date: "2024-2025",
			description:
				"Udima is a remote university platform that allows users to take courses and get information about degrees, masters, PhDs, and more. I was responsible for modernizing their web presence and improving user experience.",
			image: "/projects/udima.svg",
			technologies: ["Nuxt 3", "TypeScript", "Github Actions", "Netlify"],
			challenge:
				"The existing platform had poor user experience and outdated technology stack that made it difficult for students to navigate and find relevant course information.",
			solution:
				"I redesigned the entire frontend using Nuxt 3 with TypeScript, implementing a modern, intuitive interface with improved navigation and search functionality, resulting in better user engagement.",
			impact: [
				{
					metric: "User Engagement",
					value: "+40%",
					description: "Increased time on site",
				},
				{
					metric: "Load Time",
					value: "-60%",
					description: "Faster page loads",
				},
				{
					metric: "Mobile Usage",
					value: "+25%",
					description: "Better mobile experience",
				},
			],
			links: {
				demo: "https://udima.es",
			},
		},
		{
			id: "tostarica",
			name: "Tostarica",
			position: "Frontend Developer",
			date: "2025",
			description:
				"Tostarica is an e-commerce platform for selling artisanal biscuits in Spain. I collaborated with their team to create a fresh, modern website that showcases their products beautifully.",
			image: "/projects/tostarica.webp",
			technologies: ["Nuxt 3", "GitHub Actions", "Netlify"],
			challenge:
				"The brand needed a compelling online presence that could effectively showcase their artisanal products and convert visitors into customers in a competitive food e-commerce market.",
			solution:
				"I developed a visually stunning, conversion-optimized website with high-quality product galleries, smooth animations, and an intuitive shopping experience that reflects the premium quality of their products.",
			impact: [
				{
					metric: "Conversion Rate",
					value: "+35%",
					description: "Better sales funnel",
				},
				{
					metric: "Page Views",
					value: "+50%",
					description: "Increased engagement",
				},
				{
					metric: "Mobile Sales",
					value: "+45%",
					description: "Mobile optimization",
				},
			],
			links: {
				demo: "https://tostarica.com",
			},
		},
		{
			id: "dollar",
			name: "Dollar",
			position: "Full Stack Developer",
			date: "2025",
			description:
				"Dollar is a personal finance platform powered by AI that helps users track their financial situation and gain better control over their money. This is a side project I developed independently, showcasing my skills in AI integration.",
			image: "/projects/dollar.svg",
			technologies: [
				"Next.js",
				"TypeScript",
				"Github Actions",
				"Vercel",
				"AI/ML",
			],
			challenge:
				"Personal finance management is complex and intimidating for most people. Existing solutions are either too basic or overwhelmingly complicated, and lack intelligent insights.",
			solution:
				"I built an AI-powered platform that provides personalized financial insights, automated categorization, and intelligent recommendations, making financial management accessible and actionable for everyone.",
			impact: [
				{
					metric: "User Satisfaction",
					value: "95%",
					description: "Positive feedback",
				},
				{
					metric: "AI Accuracy",
					value: "92%",
					description: "Smart categorization",
				},
				{
					metric: "Time Saved",
					value: "80%",
					description: "Automated tracking",
				},
			],
			links: {
				demo: "https://dollar.antonioaren.es",
				github: "https://github.com/antonioaren/dollar",
			},
		},
		{
			id: "buscorepuestos",
			name: "Buscorepuestos",
			position: "Full Stack Developer",
			date: "2022-2023",
			description:
				"Buscorepuestos is a comprehensive e-commerce platform that scrapes the best automotive parts from various sources and sells them through its own website. I handled the entire development process from scraping algorithms to customer-facing interfaces.",
			image: "/projects/buscorepuestos.svg",
			technologies: [
				"Angular",
				"Next.js",
				"TypeScript",
				"Heroku",
				"GitHub Actions",
				"Vercel",
				"MongoDB",
			],
			challenge:
				"The automotive parts market is fragmented with thousands of suppliers. Customers struggle to find the right parts at competitive prices, while managing inventory from multiple sources is complex.",
			solution:
				"I developed a sophisticated scraping system that aggregates products from multiple suppliers, implemented intelligent matching algorithms, and created a seamless e-commerce experience with real-time inventory management.",
			impact: [
				{
					metric: "Product Catalog",
					value: "50K+",
					description: "Parts available",
				},
				{
					metric: "Price Savings",
					value: "30%",
					description: "Average customer savings",
				},
				{
					metric: "Order Processing",
					value: "99%",
					description: "Automation rate",
				},
			],
			links: {
				demo: "https://buscorepuestos.com",
			},
		},
		{
			id: "camc",
			name: "Credit Agricole Mon Commerce",
			position: "Frontend Developer",
			date: "2022-2023",
			description:
				"Credit Agricole is a major bank, and I had the opportunity to work on their Mon Commerce product. Mon Commerce helps businesses contract online services for payments, invoices, and other financial operations.",
			image: "/projects/camc.svg",
			technologies: ["Next.js", "TypeScript", "Github Actions", "Vercel"],
			challenge:
				"Small and medium businesses needed a simplified way to access complex banking services online, but existing interfaces were intimidating and difficult to navigate for non-technical users.",
			solution:
				"I redesigned the user interface to be more intuitive and business-friendly, streamlining the onboarding process and making complex financial services accessible through clear, step-by-step workflows.",
			impact: [
				{
					metric: "User Adoption",
					value: "+60%",
					description: "New business signups",
				},
				{
					metric: "Support Tickets",
					value: "-40%",
					description: "Fewer user issues",
				},
				{
					metric: "Completion Rate",
					value: "+55%",
					description: "Better onboarding",
				},
			],
			links: {
				demo: "https://www.ca-moncommerce.com/",
			},
		},
		{
			id: "agorapay",
			name: "Agorapay",
			position: "Frontend Developer",
			date: "2022-2023",
			description:
				"Agorapay is a developer-focused platform that provides payment gateway solutions and testing environments. I worked on creating documentation and developer tools to help integrate payment systems seamlessly.",
			image: "/projects/agorapay.svg",
			technologies: ["Next.js", "TypeScript", "Github Actions", "Vercel"],
			challenge:
				"Developers needed a reliable and well-documented payment gateway solution with comprehensive testing tools, but most existing solutions lacked proper documentation and testing environments.",
			solution:
				"I developed comprehensive developer documentation, interactive API testing tools, and a sandbox environment that allows developers to test payment flows without risk, significantly improving the developer experience.",
			impact: [
				{
					metric: "Developer Adoption",
					value: "+75%",
					description: "API integrations",
				},
				{
					metric: "Documentation Rating",
					value: "4.8/5",
					description: "Developer satisfaction",
				},
				{
					metric: "Integration Time",
					value: "-50%",
					description: "Faster setup",
				},
			],
			links: {
				demo: "https://agorapay.com",
			},
		},
	],
};

export default function Projects() {
	const [hoveredProject, setHoveredProject] = useState<string | null>(null);

	return (
		<section
			id="projects"
			className="relative scroll-mt-24 py-20 px-4 max-w-7xl mx-auto overflow-hidden"
		>
			{/* Epic Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
			<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
			<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />

			<div className="relative z-10">
				{/* Epic Header */}
				<div className="text-center mb-20">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
						<Zap className="w-4 h-4 text-primary" />
						<span className="text-sm font-medium text-primary">
							Epic Project Showcase
						</span>
					</div>

					<h2 className="text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
						{projectComponent.heading.split(" ")[0]}
						<br />
						<span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
							{projectComponent.heading
								.split(" ")
								.slice(1)
								.join(" ")}
						</span>
					</h2>

					<p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
						{projectComponent.subheading}
					</p>

					{/* Narrative Section */}
					<div className="max-w-4xl mx-auto p-6 rounded-xl bg-card/50 border border-primary/20 backdrop-blur-sm">
						<p className="text-lg text-foreground leading-relaxed">
							<span className="text-primary font-semibold">
								{projectComponent.narrative.split(",")[0]},
							</span>
							<span>
								{projectComponent.narrative.substring(
									projectComponent.narrative.indexOf(",") + 1
								)}
							</span>
						</p>
					</div>
				</div>

				{/* Epic Projects Grid */}
				<div className="space-y-24">
					{projectComponent.projects.map((project, index) => (
						<ProjectCard
							key={project.id}
							project={project}
							index={index}
							hoveredProject={hoveredProject}
							setHoveredProject={setHoveredProject}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

interface ProjectCardProps {
	project: Project;
	index: number;
	hoveredProject: string | null;
	setHoveredProject: (id: string | null) => void;
}

function ProjectCard({
	project,
	index,
	hoveredProject,
	setHoveredProject,
}: ProjectCardProps) {
	return (
		<Card
			className={`group relative overflow-hidden border-0 bg-gradient-to-br from-card/50 to-card shadow-2xl hover:shadow-primary/20 transition-all duration-700 ${
				hoveredProject === project.id
					? "scale-[1.02] shadow-primary/30"
					: ""
			}`}
			onMouseEnter={() => setHoveredProject(project.id)}
			onMouseLeave={() => setHoveredProject(null)}
		>
			{/* Epic Glow Effect */}
			<div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

			<div
				className={`grid lg:grid-cols-2 gap-0 ${
					index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
				}`}
			>
				{/* Epic Image Section */}
				<div
					className={`relative h-80 lg:h-[500px] overflow-hidden ${
						index % 2 === 1 ? "lg:col-start-2" : ""
					}`}
				>
					<img
						src={project.image || "/placeholder.svg"}
						alt={project.name}
						className="w-full h-full object-contain p-12 transition-transform duration-700 group-hover:scale-110"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

					{/* Epic Overlay Badge */}
					<div className="absolute top-6 left-6">
						<div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-sm border border-white/20">
							<Target className="w-4 h-4 text-primary" />
							<span className="text-white text-sm font-medium">
								Mission Complete
							</span>
						</div>
					</div>

					{/* Epic Impact Metrics Overlay */}
					{project.impact && (
						<div className="absolute bottom-6 left-6 right-6">
							<div className="grid grid-cols-3 gap-3">
								{project.impact.map((impact, idx) => (
									<div
										key={idx}
										className="text-center p-3 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20"
									>
										<div className="text-primary font-bold text-lg">
											{impact.value}
										</div>
										<div className="text-white text-xs">
											{impact.metric}
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Epic Content Section */}
				<CardContent
					className={`p-8 lg:p-16 flex flex-col justify-center ${
						index % 2 === 1 ? "lg:col-start-1" : ""
					}`}
				>
					<div className="space-y-8">
						{/* Epic Header */}
						<div className="space-y-4">
							<div className="flex flex-wrap items-center gap-6 text-sm">
								<div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
									<Calendar className="w-4 h-4 text-primary" />
									<span className="text-primary font-medium">
										{project.date}
									</span>
								</div>
								<div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20">
									<MapPin className="w-4 h-4 text-secondary" />
									<span className="text-secondary font-medium">
										{project.position}
									</span>
								</div>
							</div>

							<p className="text-3xl lg:text-4xl font-black text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
								{project.name}
							</p>
						</div>

						{/* Epic Story */}
						<div className="space-y-6">
							<p className="text-muted-foreground leading-relaxed text-lg">
								{project.description}
							</p>

							{/* Challenge & Solution */}
							<div className="space-y-4">
								<div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
									<div className="flex items-center gap-2 mb-2">
										<div className="w-2 h-2 rounded-full bg-destructive" />
										<span className="text-sm font-semibold text-destructive uppercase tracking-wide">
											The Challenge
										</span>
									</div>
									<p className="text-sm text-muted-foreground">
										{project.challenge}
									</p>
								</div>

								<div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
									<div className="flex items-center gap-2 mb-2">
										<div className="w-2 h-2 rounded-full bg-primary" />
										<span className="text-sm font-semibold text-primary uppercase tracking-wide">
											The Solution
										</span>
									</div>
									<p className="text-sm text-muted-foreground">
										{project.solution}
									</p>
								</div>
							</div>
						</div>

						{/* Epic Technologies */}
						{project.technologies && (
							<div className="space-y-4">
								<div className="flex items-center gap-2">
									<TrendingUp className="w-5 h-5 text-primary" />
									<h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
										Tech Arsenal
									</h4>
								</div>
								<div className="flex flex-wrap gap-3">
									{project.technologies.map((tech) => (
										<Badge
											key={tech}
											variant="outline"
											className="px-3 py-1 text-sm font-medium border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
										>
											{tech}
										</Badge>
									))}
								</div>
							</div>
						)}

						{/* Epic CTA */}
						<div className="pt-4 flex space-x-3">
							{project.links.github && (
								<Button
									size="sm"
									variant="outline"
									className="group/btn"
									asChild
								>
									<Link
										href={project.links.github}
										target="_blank"
									>
										<Github className="w-4 h-4 mr-2" />
										<span>Code</span>
									</Link>
								</Button>
							)}
							{project.links.demo && (
								<Button size="sm" className="group/btn" asChild>
									<Link
										href={project.links.demo}
										target="_blank"
									>
										<span>Live Demo</span>
										<ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
									</Link>
								</Button>
							)}
						</div>
					</div>
				</CardContent>
			</div>
		</Card>
	);
}
