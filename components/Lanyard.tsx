"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

type Vec3 = [number, number, number];

export interface LanyardProps {
  position?: Vec3;
  gravity?: Vec3;
  fov?: number;
  transparent?: boolean;
  className?: string;
}

const LanyardClient = dynamic(() => import("./LanyardClient"), {
  ssr: false,
  loading: () => <div style={{ height: 600 }} />,
});

export default function Lanyard(props: LanyardProps) {
  const isV0Inline = useMemo(() => {
    if (typeof window === "undefined") return false;
    const href = window.location.href || "";
    const host = window.location.host || "";
    return href.startsWith("blob:") || host.includes("vusercontent.net");
  }, []);

  if (isV0Inline) {
    return (
      <div className={`relative z-0 flex items-center justify-center ${props.className ?? "w-full h-[600px]"}`}>
        <div style={{ color: "#999", fontSize: 14, textAlign: "center", padding: 16 }}>
          3D preview disabled in editor. Open the PR’s Vercel Preview to see the lanyard.
        </div>
      </div>
    );
  }

  return <LanyardClient {...props} />;
}
