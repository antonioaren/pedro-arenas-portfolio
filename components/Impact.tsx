"use client";

import { useRef } from "react";
import { useAnimeInView } from "@/hooks/use-anime-in-view";
import { cvBullets } from "@/data/metrics";
import SplitText from "@/components/reactbits/text-animations/SplitText/SplitText";

export default function Impact() {
	const sectionRef = useRef<HTMLDivElement | null>(null);
	const listRef = useRef<HTMLUListElement | null>(null);

	useAnimeInView(
		sectionRef,
		(anime, el) => {
			const heading = el.querySelector("h2");
			const { animate } = anime;
			(el as HTMLElement).style.opacity = "1";
			animate(heading, {
				translateY: [10, 0],
				opacity: [0, 1],
				duration: 500,
				easing: "easeOutExpo",
			});
		},
		{ threshold: 0.2 }
	);

	useAnimeInView(
		listRef,
		(anime, el) => {
			const items = el.querySelectorAll("li");
			const { animate, stagger } = anime;
			animate(items, {
				translateY: [12, 0],
				opacity: [0, 1],
				duration: 450,
				easing: "easeOutExpo",
				delay: stagger(60),
			});
		},
		{ threshold: 0.2 }
	);

	return (
		<section id="impact" className="scroll-mt-24 py-16 px-4">
			<div
				ref={sectionRef}
				className="container mx-auto max-w-4xl opacity-0"
			>
				<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
					<SplitText
						as="span"
						className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
						text={"Impact highlights"}
						splitType="chars"
						from={{ opacity: 0, y: 40 }}
						to={{ opacity: 1, y: 0 }}
						threshold={0.2}
					/>
				</h2>
				<ul
					ref={listRef}
					className="space-y-3 text-lg text-muted-foreground"
				>
					{cvBullets.map((b) => (
						<li key={b}>• {b}</li>
					))}
				</ul>
			</div>
		</section>
	);
}


