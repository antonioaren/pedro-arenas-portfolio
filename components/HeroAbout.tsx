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
		{ type: "github", href: "https://github.com" },
		{ type: "linkedin", href: "https://linkedin.com" },
		{ type: "email", href: "mailto:pedro@example.com" },
	],
	image: {
		src: "/placeholder.svg?height=400&width=400",
		alt: "Alex Johnson",
		width: 400,
		height: 400,
	},
	imageGradientFromTo: "from-primary/20 to-primary/5",
};

export default function HeroAbout() {
	return (
		<section id="about" className="pt-20 pb-16 px-4">
			<div className="container mx-auto max-w-4xl">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div>
						<h2 className="text-4xl md:text-6xl font-bold mb-6">
							{About.titleMain}
							<span className="text-primary block">
								{About.titleAccent}
							</span>
						</h2>
						<p className="text-lg text-muted-foreground mb-8 leading-relaxed">
							{About.description}
						</p>
						<div className="flex space-x-4">
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
						<div className="flex space-x-4 mt-8">
							{About.socials.map((social) => {
								const Icon = socialIconByType[social.type];
								return (
									<Link
										key={social.type}
										href={social.href}
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										<Icon className="w-6 h-6" />
									</Link>
								);
							})}
						</div>
					</div>
					<div className="relative">
						<div
							className={`aspect-square rounded-2xl bg-gradient-to-br ${About.imageGradientFromTo} p-8`}
						>
							<Image
								src={About.image.src}
								alt={About.image.alt}
								width={About.image.width}
								height={About.image.height}
								className="rounded-xl object-cover w-full h-full"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}


