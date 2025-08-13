"use client";

import * as React from "react";
import Impl from "./ScrollReveal.jsx";

export interface ScrollRevealProps {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | Window> | null;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = (props) => {
  return React.createElement(Impl as any, props as any);
};

export default ScrollReveal;


