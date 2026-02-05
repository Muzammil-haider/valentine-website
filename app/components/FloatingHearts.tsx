"use client";

import { useEffect, useState } from "react";

type Heart = {
  id: number;
  left: number;
  size: number;
  duration: number;
};

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 100,
          size: Math.random() * 30 + 15,
          duration: Math.random() * 5 + 6,
        },
      ]);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hearts-container">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}%`,
            bottom: "-40px",               // 🔥 start from bottom
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
}}

        >
          ❤️
        </span>
      ))}
    </div>
  );
}
