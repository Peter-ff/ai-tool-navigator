"use client";

import { useEffect, useRef } from "react";

type Props = {
  slot: "topBanner" | "sidebar" | "inFeed";
  className?: string;
};

export function ThirdPartyAd({ slot, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/ads")
      .then((res) => res.json())
      .then((json) => {
        const script = json.thirdParty?.[slot];
        if (!script || !containerRef.current) return;

        const range = document.createRange();
        range.setStart(containerRef.current, 0);
        const fragment = range.createContextualFragment(script);
        containerRef.current.appendChild(fragment);

        // Execute any scripts in the fragment
        const scripts = containerRef.current.querySelectorAll("script");
        scripts.forEach((s) => {
          const newScript = document.createElement("script");
          Array.from(s.attributes).forEach((attr) =>
            newScript.setAttribute(attr.name, attr.value)
          );
          newScript.textContent = s.textContent;
          s.replaceWith(newScript);
        });
      })
      .catch(() => {});
  }, [slot]);

  return <div ref={containerRef} className={className} />;
}
