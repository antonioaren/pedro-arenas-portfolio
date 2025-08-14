"use client";

import Link from "next/link";
import { useRef } from "react";
import { useAnimeInView } from "@/hooks/use-anime-in-view";

const items = [
	{
		slug: "tostarica",
		title: "TostaRica (2025) — Nuxt 3",
		bullets: [
			"Spikes at 500k+ monthly visitors with 0 downtime",
			"Nuxt 3 + ISR, responsive images, CDN",
			"LCP ~1.8–2.4s; CLS <0.1 ",
		],
	},
	{
		slug: "udima",
		title: "UDIMA (2024–25) — LMS",
		bullets: [
			"+35% engagement via SSR + accessible components ",
			"+20% SEO/a11y scores ",
			"Nuxt 3 + TS; a11y roles/focus/contrast",
		],
	},
	{
		slug: "buscorepuestos",
		title: "Buscorepuestos (2022–24) — Marketplace aggregator",
		bullets: [
			"+40% search efficiency; 1h→10m deploy time",
			"Next.js with legacy Angular modules; GitHub Actions",
			"Query caching, targeted indexes, SSR for SEO",
		],
	},
];

export default function CaseStudiesPreview() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useAnimeInView(
    sectionRef,
    (anime, el) => {
      const heading = el.querySelector("h2");
      const sub = el.querySelector("p");
      const { createTimeline } = anime;
      (el as HTMLElement).style.opacity = "1";
      createTimeline({ autoplay: true })
        .add({ targets: heading, translateY: [16, 0], opacity: [0, 1], duration: 600, easing: "easeOutExpo" })
        .add({ targets: sub, translateY: [12, 0], opacity: [0, 1], duration: 500, easing: "easeOutExpo" }, "-=250");
    },
    { threshold: 0.2 }
  );

  useAnimeInView(
    listRef,
    (anime, el) => {
      const cards = el.querySelectorAll("[data-cs]");
      const { animate, stagger } = anime;
      (el as HTMLElement).style.opacity = "1";
      animate(cards, { translateY: [20, 0], opacity: [0, 1], duration: 550, easing: "easeOutExpo", delay: stagger(80) });
    },
    { threshold: 0.2 }
  );

  return (
    <section id="case-studies" className="scroll-mt-24 py-16 px-4">
      <div ref={sectionRef} className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Case studies</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Problem → Decisions → Architecture → Results → My role → Links → Evidence checklist
          </p>
        </div>

        <div ref={listRef} className="grid md:grid-cols-3 gap-6 opacity-0">
          {items.map((item) => (
            <div key={item.slug} data-cs className="rounded-lg border p-6 bg-background/50">
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="mt-4">
                <Link href={`/case-studies/${item.slug}`} className="text-primary hover:underline">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


