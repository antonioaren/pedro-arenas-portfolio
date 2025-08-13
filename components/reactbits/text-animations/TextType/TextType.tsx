"use client";

import * as React from "react";
import Impl from "./TextType.jsx";

export interface TextTypeProps {
  text: string | string[];
  as?: React.ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (text: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
  [x: string]: any;
}

const TextType: React.FC<TextTypeProps> = (props) => {
  return React.createElement(Impl as any, props as any);
};

export default TextType;


