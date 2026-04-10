"use client";

import { useEffect, useMemo, useState } from "react";

type UseTypingAnimationOptions = {
  text: string;
  speedMs?: number;
};

export function useTypingAnimation({ text, speedMs = 55 }: UseTypingAnimationOptions) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateReducedMotion = () => {
      setIsReducedMotion(mediaQuery.matches);
    };

    updateReducedMotion();
    mediaQuery.addEventListener("change", updateReducedMotion);

    return () => {
      mediaQuery.removeEventListener("change", updateReducedMotion);
    };
  }, []);

  useEffect(() => {
    if (isReducedMotion) {
      setDisplayText(text);
      setIsComplete(true);
      return;
    }

    setDisplayText("");
    setIsComplete(false);
    let index = 0;

    const intervalId = window.setInterval(() => {
      index += 1;
      setDisplayText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(intervalId);
        setIsComplete(true);
      }
    }, speedMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isReducedMotion, speedMs, text]);

  const showCursor = useMemo(() => !isReducedMotion, [isReducedMotion]);

  return {
    displayText,
    isComplete,
    showCursor,
    isReducedMotion
  };
}
