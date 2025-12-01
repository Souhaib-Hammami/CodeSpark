import { useMemo, useState, useEffect } from "react";

export const StarsCanvas = ({ numStars = 500 }) => {
  const [tick, setTick] = useState(0);

  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < numStars; i++) {
      // Random position across the full screen (x,y,z)
      const x = (Math.random() - 0.5) * 2000; // spread across width
      const y = (Math.random() - 0.5) * 1200; // spread across height
      const z = Math.random() * 600 - 300; // depth variation
      const size = Math.random() * 1.5 + 0.5; // limit max size
      arr.push({ x, y, z, size });
    }
    return arr;
  }, [numStars]);

  // Animate stars rotation or drift
  useEffect(() => {
    let animationId;
    const animate = () => {
      setTick((t) => t + 1);
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const getPos = (star) => {
    // Optional: slow rotation around center
    const angle = tick * 0.0005;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const rotX = star.x * cosA - star.y * sinA;
    const rotY = star.x * sinA + star.y * cosA;
    const z = star.z;

    // Perspective projection
    const scale = 400 / (400 + z);
    return {
      left: `calc(50% + ${rotX * scale}px)`,
      top: `calc(50% + ${rotY * scale}px)`,
      width: `${star.size * scale}px`,
      height: `${star.size * scale}px`,
      opacity: Math.min(Math.max(scale, 0.2), 1),
    };
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        inset: 0,
        zIndex: -10,
        overflow: "hidden",
        backgroundColor: "#000", // dark sky
      }}
    >
      {stars.map((star, index) => {
        const pos = getPos(star);
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              width: pos.width,
              height: pos.height,
              backgroundColor: "#f98d00",
              borderRadius: "50%",
              opacity: pos.opacity,
              filter: "blur(0.5px)", // subtle glow
            }}
          />
        );
      })}
    </div>
  );
};
