"use client";

import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import Squares from "@/components/reactbits/backgrounds/Squares/Squares";

type SquaresDirection = "up" | "down" | "left" | "right" | "diagonal";

interface SquaresBackgroundOwnProps {
	className?: string;
	contentClassName?: string;
	direction?: SquaresDirection;
	speed?: number;
	squareSize?: number;
	borderColor?: string;
	hoverFillColor?: string;
}

export type SquaresBackgroundProps = PropsWithChildren<SquaresBackgroundOwnProps>;

export default function SquaresBackground({
	children,
	className,
	contentClassName,
	direction = "right",
	speed = 1,
	squareSize = 40,
	borderColor = "#999",
	hoverFillColor = "#222",
}: SquaresBackgroundProps) {
	return (
		<div className={cn("relative", className)}>
			<div className="absolute inset-0 -z-10">
				<Squares
					className="w-full h-full"
					direction={direction}
					speed={speed}
					squareSize={squareSize}
					borderColor={borderColor}
					hoverFillColor={hoverFillColor}
				/>
			</div>
			<div className={cn("relative z-10", contentClassName)}>{children}</div>
		</div>
	);
}


