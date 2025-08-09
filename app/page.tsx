import HeroAbout from "@/components/HeroAbout";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Portfolio() {
	return (
		<div className="min-h-screen bg-background">
			<HeroAbout />
			<Projects />
			<Skills />
			<Contact />
		</div>
	);
}
