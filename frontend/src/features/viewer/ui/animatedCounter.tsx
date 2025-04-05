import { useEffect, useState } from "react";

export const AnimatedCounter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState("0%");
  const numericValue = parseFloat(value);

  useEffect(() => {
    let current = 0;
    const duration = 1000;
    const startTime = performance.now();

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      current = Math.floor(progress * numericValue);
      setDisplayValue(`${current}%`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [numericValue]);

  return (
    <span className="inline-block min-w-[50px] text-2xl font-bold mr-2">
      {displayValue}
    </span>
  );
};
