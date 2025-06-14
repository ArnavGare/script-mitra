
import { useState, useEffect, useRef } from 'react';

const rotatingPlaceholders = [
  "e.g. How to get rich in 2025…",
  "e.g. Top 5 mutual fund myths…",
  "e.g. Insurance tips for new parents…",
  "e.g. Mastering Instagram reels…",
  "e.g. Travel hacks on a budget…",
  "e.g. Daily fitness motivation…",
  "e.g. Startups for Gen Z in India…"
];

export function useRotatingPlaceholder() {
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPlaceholderIdx((idx) => (idx + 1) % rotatingPlaceholders.length);
    }, 2800);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return rotatingPlaceholders[placeholderIdx];
}
