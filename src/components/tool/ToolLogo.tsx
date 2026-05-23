"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  name: string;
  logo: string;
  size?: "sm" | "md";
};

const sizeClasses = {
  sm: "h-11 w-11 rounded-xl text-sm",
  md: "h-[56px] w-[56px] rounded-2xl text-xl",
};

const pxSize = { sm: 44, md: 56 };

export function ToolLogo({ name, logo, size = "md" }: Props) {
  const [error, setError] = useState(false);

  if (error || !logo) {
    return (
      <div className={`flex shrink-0 items-center justify-center bg-apple-bg font-semibold text-apple-quaternary ${sizeClasses[size]}`}>
        {name[0]}
      </div>
    );
  }

  return (
    <Image
      src={logo}
      alt={name}
      width={pxSize[size]}
      height={pxSize[size]}
      className={`shrink-0 object-cover ${sizeClasses[size]}`}
      onError={() => setError(true)}
      unoptimized
    />
  );
}
