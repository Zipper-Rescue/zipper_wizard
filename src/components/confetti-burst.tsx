import confetti from "canvas-confetti";
import { useEffect } from "react";

export function ConfettiBurst() {
  useEffect(() => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: [
        "#FF0000",
        "#FFA500",
        "#FFD700",
        "#008000",
        "#0000FF",
        "#4B0082",
      ],
    });
  }, []);

  return null;
}
