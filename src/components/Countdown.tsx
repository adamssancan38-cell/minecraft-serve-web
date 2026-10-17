"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  let targetYear = now.getFullYear();
  let targetDate = new Date(targetYear, 11, 28, 0, 0, 0); // Dec 28

  // Si ya pasó el 28 de dic de este año, contar para el próximo año
  if (now > targetDate) {
    targetDate = new Date(targetYear + 1, 11, 28, 0, 0, 0);
  }

  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-4 justify-center flex-wrap">
        {["DÍAS", "HORAS", "MIN", "SEG"].map((label) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-24 h-24 bg-[#4a3728] border-4 border-[#2d1f14] flex items-center justify-center shadow-[inset_2px_2px_0_#6b5340,inset_-2px_-2px_0_#2d1f14]">
              <span className="text-4xl font-bold text-[#4CAF50]">--</span>
            </div>
            <span className="text-xs mt-2 text-[#BDBDBD] tracking-widest">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  const units = [
    { value: timeLeft.days, label: "DÍAS" },
    { value: timeLeft.hours, label: "HORAS" },
    { value: timeLeft.minutes, label: "MIN" },
    { value: timeLeft.seconds, label: "SEG" },
  ];

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {units.map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-24 h-24 bg-[#4a3728] border-4 border-[#2d1f14] flex items-center justify-center shadow-[inset_2px_2px_0_#6b5340,inset_-2px_-2px_0_#2d1f14]">
            <span className="text-4xl font-bold text-[#4CAF50] tabular-nums">
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs mt-2 text-[#BDBDBD] tracking-widest">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
