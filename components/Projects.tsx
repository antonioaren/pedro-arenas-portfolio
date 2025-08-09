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
		description: string;
		image: { src: string; alt: string };
		gradient: string;
		techStack: string[];
		links: { github?: string; demo?: string };
	}[];
};

const projectComponent: ProjectComponent = {
	heading: "E-commerce Platform Architecture",
	subheading:
		"Here are some of my recent projects that showcase my skills and experience in full-stack development.",
	projects: [
		{
			title: "E-commerce Platform Architecture",
			description:
				"Led the technical design and implementation of a scalable e-commerce platform using clean architecture principles, serving thousands of users with high performance.",
			image: {
				src: "/placeholder.svg?height=200&width=350",
				alt: "E-commerce Platform",
			},
			gradient: "from-blue-500 to-purple-600",
			techStack: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
			links: {
				github: "https://github.com/antonioaren",
				demo: "https://demo.com",
			},
		},
		{
			title: "Team Management Dashboard",
			description:
				"Built a comprehensive team management system as Tech Lead at Buscorepuestos, leading a team of four developers through the full development lifecycle.",
			image: {
				src: "/placeholder.svg?height=200&width=350",
				alt: "Team Management App",
			},
			gradient: "from-green-500 to-teal-600",
			techStack: ["Vue.js", "Node.js", "MongoDB", "GitHub Actions"],
			links: {
				github: "https://github.com/antonioaren",
				demo: "https://demo.com",
			},
		},
		{
			title: "International Freelance Platform",
			description:
				"Delivered a complete freelance marketplace from technical design to go-live, handling international payments and multi-language support.",
			image: {
				src: "/placeholder.svg?height=200&width=350",
				alt: "International Freelance Platform",
			},
			gradient: "from-orange-500 to-red-600",
			techStack: ["React", "Django", "DynamoDB", "AWS Lambda"],
			links: {
				github: "https://github.com/antonioaren",
				demo: "https://demo.com",
			},
		},
	],
};

export default function Projects() {
	return (
		<section id="projects" className="py-16 px-4 bg-muted/30">
			<div className="container mx-auto max-w-6xl">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						{projectComponent.heading}
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
										width={350}
										height={200}
										className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
							</CardHeader>
							<CardContent className="p-6">
								<CardTitle className="mb-2">
									{project.title}
								</CardTitle>
								<CardDescription className="mb-4">
									{project.description}
								</CardDescription>
								<div className="flex flex-wrap gap-2 mb-4">
									{project.techStack.map((tech) => (
										<Badge key={tech} variant="secondary">
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
											<Link href={project.links.github}>
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


