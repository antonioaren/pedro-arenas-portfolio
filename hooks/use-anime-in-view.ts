"use client";

import { RefObject, useEffect } from "react";
import { loadAnime } from "@/lib/loadAnime";

type UseAnimeInViewOptions = {
  /** Trigger when this portion of the element is visible */
  threshold?: number;
  /** Root margin for early/late triggering */
  rootMargin?: string;
  /** If true, animation will run every time the element re-enters viewport */
  repeat?: boolean;
};

/**
 * Observes an element and runs the provided animation function when it enters the viewport.
 * The animation function receives the anime instance and the element.
 */
export function useAnimeInView(
  elementRef: RefObject<HTMLElement | null>,
  animate: (anime: any, element: HTMLElement) => void,
  options?: UseAnimeInViewOptions
) {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let disposed = false;
    let observer: IntersectionObserver | null = null;

    const handleIntersect: IntersectionObserverCallback = async (entries) => {
      const [entry] = entries;
      if (!entry || !entry.isIntersecting) return;
      const api = await loadAnime();
      if (disposed) return;
      animate(api as any, element);
      if (!options?.repeat) observer?.disconnect();
    };

    observer = new IntersectionObserver(handleIntersect, {
      threshold: options?.threshold ?? 0.25,
      rootMargin: options?.rootMargin ?? "0px",
    });
    observer.observe(element);

    return () => {
      disposed = true;
      observer?.disconnect();
    };
    // It's okay to ignore animate reference stability here as caller defines stability
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, options?.threshold, options?.rootMargin, options?.repeat]);
}


