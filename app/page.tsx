import HeroAbout from "@/components/HeroAbout";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import CaseStudiesPreview from "@/components/case-studies/CaseStudiesPreview";
import Impact from "@/components/Impact";
import SquaresBackground from "@/components/SquaresBackground";

export default function Portfolio() {
	return (
		<div className="min-h-screen">
			<HeroAbout />
			<SquaresBackground
				speed={0.5}
				squareSize={100}
				direction="diagonal"
				borderColor="#31354E"
				hoverFillColor="#000"
			>
				<CaseStudiesPreview />
				<Impact />
			</SquaresBackground>
			<Projects />
			<Skills />
			<Contact />
		</div>
	);
}
