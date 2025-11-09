import { useEffect, useRef, useState } from "react";

export function useSmoothProgress() {
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  const animate = () => {
    setProgress((prev) => {
      const diff = targetRef.current - prev;
      if (Math.abs(diff) < 0.5) {
        cancelAnimationFrame(animationRef.current!);
        animationRef.current = null;
        return targetRef.current;
      }
      return prev + diff * 0.1; // transición suave
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  const setTarget = (value: number) => {
    // Asegura valores entre 0 y 100
    targetRef.current = Math.max(0, Math.min(100, value));
    if (animationRef.current === null) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // Cleanup para evitar fugas de memoria
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return { progress, setProgress: setTarget };
}
