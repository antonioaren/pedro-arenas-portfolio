import HeroAbout from "@/components/HeroAbout";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import CaseStudiesPreview from "@/components/case-studies/CaseStudiesPreview";
import Impact from "@/components/Impact";

export default function Portfolio() {
	return (
		<div className="min-h-screen">
			<HeroAbout />
			<CaseStudiesPreview />
			<Impact />
			<Projects />
			<Skills />
			<Contact />
		</div>
	);
}
