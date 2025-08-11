"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import Aurora from "@/components/reactbits/backgrounds/Aurora/Aurora";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	useGLTF,
	Preload,
	OrthographicCamera,
	OrbitControls,
} from "@react-three/drei";
import { loadAnime } from "@/lib/loadAnime";

/* ----------------------------------------------------------
   Static hero copy
----------------------------------------------------------- */
type SocialType = "github" | "linkedin" | "email";
const socialIconByType: Record<SocialType, typeof Github> = {
	github: Github,
	linkedin: Linkedin,
	email: Mail,
};

const About = {
	titleMain: "Hi! 👋",
	titleAccent: "I'm Software Developer",
	description:
		"I have been working as a Software Developer for 8+ years. I build scalable, cleanly-architected web apps with JavaScript/TypeScript and Python/Django. I care about DX, performance, accessibility, and business impact.",
	ctas: [
		{ label: "Get In Touch", href: "#contact" },
		{
			label: "Download Resume",
			href: "/resume.pdf",
			variant: "outline" as const,
			newTab: true,
		},
	],
	socials: [
		{
			type: "github" as const,
			href: "https://github.com/antonioaren",
			target: "_blank" as const,
		},
		{
			type: "linkedin" as const,
			href: "https://linkedin.com/in/antonioaren",
			target: "_blank" as const,
		},
		{
			type: "email" as const,
			href: "mailto:antonioaren2@gmail.com",
			target: "_blank" as const,
		},
	],
	imageGradientFromTo: "from-primary/20 to-primary/5",
};

/* ----------------------------------------------------------
   Room assembly loader (reads /public/programmer_room_assets/room-assembly.json)
----------------------------------------------------------- */
type AssemblyItem = {
	name: string;
	file: string;
	position?: [number, number, number];
	rotationY?: number;
	scale?: number;
};
type AssemblyData = {
	version: number;
	texture?: string;
	objects: AssemblyItem[];
};

function useRoomAssembly(path = "/programmer_room_assets/room-assembly.json") {
	const [data, setData] = useState<AssemblyData | null>(null);
	useEffect(() => {
		let alive = true;
		fetch(path)
			.then((r) => r.json())
			.then((json) => alive && setData(json))
			.catch(console.error);
		return () => {
			alive = false;
		};
	}, [path]);
	return data;
}

function SceneItem({ base, item }: { base: string; item: AssemblyItem }) {
	const url = useMemo(() => `${base}/${item.file}`, [base, item.file]);
	const { scene } = useGLTF(url);
	const node = useMemo(() => scene.clone(true), [scene]);
	const group = useRef<THREE.Group>(null);

	useEffect(() => {
		if (!group.current) return;
		const s = item.scale ?? 1;
		group.current.position.set(...(item.position ?? [0, 0, 0]));
		group.current.rotation.set(0, item.rotationY ?? 0, 0);
		group.current.scale.set(s, s, s);
	}, [item]);

	// subtle idle
	useFrame((state) => {
		if (!group.current) return;
		const bob = Math.sin(state.clock.elapsedTime * 1.5) * 0.002;
		group.current.position.y = (item.position?.[1] ?? 0) + bob;
	});

	return (
		<group ref={group} name={item.name}>
			<primitive object={node} />
		</group>
	);
}

function AssembledRoom({ isLight }: { isLight: boolean }) {
	const base = "/programmer_room_assets";
	const assembly = useRoomAssembly(`${base}/room-assembly.json`);

	// preload models
	useEffect(() => {
		if (!assembly) return;
		assembly.objects.forEach((o) => useGLTF.preload(`${base}/${o.file}`));
	}, [assembly]);

	// lights with smooth lerp
	const ambientRef = useRef<THREE.AmbientLight>(null);
	const dirRef = useRef<THREE.DirectionalLight>(null);
	const lampRef = useRef<THREE.PointLight>(null);

	useFrame((_, delta) => {
		if (ambientRef.current) {
			ambientRef.current.intensity = THREE.MathUtils.lerp(
				ambientRef.current.intensity,
				isLight ? 1.0 : 0.08,
				delta * 4
			);
			ambientRef.current.color.set(isLight ? 0xffffff : 0xffe0b0);
		}
		if (dirRef.current) {
			dirRef.current.intensity = THREE.MathUtils.lerp(
				dirRef.current.intensity,
				isLight ? 0.9 : 0.15,
				delta * 4
			);
		}
		if (lampRef.current) {
			lampRef.current.intensity = THREE.MathUtils.lerp(
				lampRef.current.intensity,
				isLight ? 0.0 : 0.9,
				delta * 6
			);
			lampRef.current.color.set(0xffd07a);
		}
	});

	return (
		<group>
			{/* day base + night warm lamp */}
			<ambientLight
				ref={ambientRef}
				intensity={isLight ? 1 : 0.08}
				color={isLight ? 0xffffff : 0xffe0b0}
			/>
			<directionalLight
				ref={dirRef}
				position={[3, 6, 2]}
				intensity={isLight ? 0.9 : 0.15}
				castShadow
			/>
			<pointLight
				ref={lampRef}
				position={[1.05, 1.2, 0.18]}
				intensity={isLight ? 0.0 : 0.9}
				distance={4}
				decay={2}
			/>

			{assembly?.objects.map((o) => (
				<SceneItem key={o.name} base={base} item={o} />
			))}
		</group>
	);
}

/* ----------------------------------------------------------
   Tiny low-poly dev avatar typing (no external model)
----------------------------------------------------------- */
function DevAvatar({ position = [0, 0, 0] as [number, number, number] }) {
	const left = useRef<THREE.Mesh>(null!);
	const right = useRef<THREE.Mesh>(null!);
	useFrame((state) => {
		const t = state.clock.elapsedTime;
		const swing = Math.sin(t * 6) * 0.12;
		if (left.current) left.current.rotation.x = -0.9 + swing;
		if (right.current) right.current.rotation.x = -0.9 - swing;
	});
	return (
		<group position={position} scale={0.5}>
			<mesh position={[0, 0.35, 0]}>
				<boxGeometry args={[0.28, 0.45, 0.18]} />
				<meshStandardMaterial color="#3b82f6" />
			</mesh>
			<mesh position={[0, 0.66, 0.03]}>
				<boxGeometry args={[0.18, 0.18, 0.18]} />
				<meshStandardMaterial color="#f5d0a9" />
			</mesh>
			<mesh
				ref={left}
				position={[-0.16, 0.48, 0.12]}
				rotation={[-0.9, 0, 0]}
			>
				<boxGeometry args={[0.08, 0.28, 0.08]} />
				<meshStandardMaterial color="#3b82f6" />
			</mesh>
			<mesh
				ref={right}
				position={[0.16, 0.48, 0.12]}
				rotation={[-0.9, 0, 0]}
			>
				<boxGeometry args={[0.08, 0.28, 0.08]} />
				<meshStandardMaterial color="#3b82f6" />
			</mesh>
			<mesh position={[-0.07, 0.12, 0]}>
				<boxGeometry args={[0.08, 0.2, 0.08]} />
				<meshStandardMaterial color="#1f2937" />
			</mesh>
			<mesh position={[0.07, 0.12, 0]}>
				<boxGeometry args={[0.08, 0.2, 0.08]} />
				<meshStandardMaterial color="#1f2937" />
			</mesh>
		</group>
	);
}

/* ----------------------------------------------------------
   HeroAbout (with isometric R3F on the right)
----------------------------------------------------------- */
export default function HeroAbout({ isLight = true }: { isLight?: boolean }) {
	const headingRef = useRef<HTMLHeadingElement | null>(null);
	const descriptionRef = useRef<HTMLParagraphElement | null>(null);
	const ctasRef = useRef<HTMLDivElement | null>(null);
	const socialsRef = useRef<HTMLDivElement | null>(null);

	// entrance animation (your existing anime.js hook)
	useEffect(() => {
		let disposed = false;
		const run = async () => {
			const { createTimeline, stagger } = await loadAnime();
			if (disposed) return;
			const tl = createTimeline({ autoplay: true });

			if (headingRef.current) {
				tl.add({
					targets: headingRef.current.childNodes,
					translateY: [24, 0],
					opacity: [0, 1],
					easing: "easeOutExpo",
					duration: 700,
					delay: stagger(60),
				});
			}
			if (descriptionRef.current) {
				tl.add(
					{
						targets: descriptionRef.current,
						translateY: [12, 0],
						opacity: [0, 1],
						easing: "easeOutExpo",
						duration: 600,
					},
					"-=300"
				);
			}
			if (ctasRef.current) {
				const buttons = ctasRef.current.querySelectorAll("a, button");
				tl.add(
					{
						targets: buttons,
						translateY: [16, 0],
						opacity: [0, 1],
						easing: "easeOutExpo",
						duration: 500,
						delay: stagger(80),
					},
					"-=200"
				);
			}
			if (socialsRef.current) {
				const icons = socialsRef.current.querySelectorAll("svg");
				tl.add(
					{
						targets: icons,
						scale: [0.8, 1],
						opacity: [0, 1],
						easing: "easeOutBack",
						duration: 500,
						delay: stagger(70),
					},
					"-=200"
				);
			}
		};
		run();
		return () => {
			disposed = true;
		};
	}, []);

	return (
		<section
			id="about"
			className="relative overflow-hidden scroll-mt-24 px-4 py-[8rem] min-h-[70vh]"
		>
			<div className="absolute inset-0 -z-10 pointer-events-none">
				<Aurora
					colorStops={["#0ea5e9", "#8b5cf6", "#10b981"]}
					amplitude={3}
					blend={1}
					speed={1.0}
				/>
			</div>

			<div className="container mx-auto max-w-6xl relative">
				<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 lg:gap-16">
					{/* Left: text */}
					<div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
						<h2
							ref={headingRef}
							className="text-4xl md:text-6xl font-bold tracking-tight"
						>
							{About.titleMain}
							<span className="text-primary block">
								{About.titleAccent}
							</span>
						</h2>
						<p
							ref={descriptionRef}
							className="text-lg text-muted-foreground leading-relaxed"
						>
							{About.description}
						</p>
						<div
							ref={ctasRef}
							className="flex flex-wrap justify-center md:justify-start gap-4"
						>
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
						<div
							ref={socialsRef}
							className="flex items-center justify-center md:justify-start gap-4 mt-4"
						>
							{About.socials.map((social) => {
								const Icon = socialIconByType[social.type];
								return (
									<Link
										key={social.type}
										href={social.href}
										className="text-muted-foreground hover:text-primary transition-colors"
										target={social.target}
									>
										<Icon className="w-6 h-6" />
									</Link>
								);
							})}
						</div>
					</div>

					{/* Right: isometric 3D */}
					<div className="flex justify-center">
						<div
							className={`relative mt-8 md:mt-0 rounded-2xl bg-gradient-to-br ${About.imageGradientFromTo} p-1 shadow-lg w-[320px] h-[220px] md:w-[420px] md:h-[280px]`}
						>
							<Canvas shadows dpr={[1, 2]}>
								{/* ISO camera */}
								<OrthographicCamera
									makeDefault
									position={[6, 6, 6]}
									zoom={120}
									near={0.01}
									far={200}
								/>
								<Suspense fallback={null}>
									<group scale={0.9} position={[0, -0.02, 0]}>
										<AssembledRoom isLight={isLight} />
										{/* Put the dev on the chair area */}
										<DevAvatar
											position={[0.25, 0.42, 0.62]}
										/>
									</group>
									<OrbitControls
										enableRotate={false}
										enableZoom={false}
										enablePan={false}
										target={[0, 0.3, 0]}
									/>
									<Preload all />
								</Suspense>
							</Canvas>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
