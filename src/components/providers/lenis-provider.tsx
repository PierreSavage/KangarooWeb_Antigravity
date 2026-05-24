"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis root options={{ lerp: 0.04, duration: 1.8, smoothWheel: true, wheelMultiplier: 0.8 }}>
      {children}
    </ReactLenis>
  );
}
