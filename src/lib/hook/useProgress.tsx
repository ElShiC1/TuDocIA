import { useEffect, useRef, useState } from "react";

export const useProgress = (current: number, total: number) => {

    const [progress, setProgress] = useState(0);
    const targetRef = useRef(0);
    const animationRef = useRef<number | null>(null);


    const animate = () => {
        setProgress(prev => {
            const diff = targetRef.current - prev;
            if (Math.abs(diff) < 0.5) {

                cancelAnimationFrame(animationRef.current!);
                animationRef.current = null;
                return targetRef.current;
            }
            console.log("stop animation", targetRef.current);
            return prev + diff * 0.1;
        });

        animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        targetRef.current = ((current) / (total - 1)) * 100;
        if (animationRef.current === null) {
            animationRef.current = requestAnimationFrame(animate);
        }
    }, [current]);


    return progress
}