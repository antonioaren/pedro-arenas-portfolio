import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

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
    return (
		<section id="projects" className="scroll-mt-24 py-16 px-4 bg-muted/30">
			<div className="container mx-auto max-w-6xl">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
						{projectComponent.heading}
					</h2>
					<p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
						{projectComponent.subheading}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projectComponent.projects.map((project) => (
						<Card
							key={project.title}
							className="group hover:shadow-lg transition-shadow"
						>
							<CardHeader className="p-0">
								<div
									className={`aspect-video bg-gradient-to-br ${project.gradient} rounded-t-lg relative overflow-hidden`}
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
										<Button
											size="sm"
											variant="outline"
											asChild
										>
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
					))}
				</div>
			</div>
		</section>
	);
}


