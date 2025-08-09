import { Badge } from "@/components/ui/badge";
import { Code, Database, Globe, Smartphone } from "lucide-react";

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
    return (
		<section id="skills" className="scroll-mt-24 py-16 px-4">
			<div className="container mx-auto max-w-4xl">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
						{skillsInfo.heading}
					</h2>
					<p className="text-lg text-muted-foreground leading-relaxed">
						{skillsInfo.subheading}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{skillsInfo.categories.map((category) => {
						const Icon = iconByType[category.icon];
						return (
							<div key={category.title} className="text-center">
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
		</section>
	);
}


