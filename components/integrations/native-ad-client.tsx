"use client";

import { useEffect, useRef } from "react";

const scriptUrl = "https://pl31604696.profitableratecpmnetwork.com/3a3dc4933fce380770e671ae5ad49f45/invoke.js";
const containerId = "container-3a3dc4933fce380770e671ae5ad49f45";

export function NativeAdClient() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Defer insertion so React Strict Mode's effect replay cannot request it twice.
    const timer = window.setTimeout(() => {
      const container = document.createElement("div");
      container.id = containerId;
      const script = document.createElement("script");
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = scriptUrl;
      host.append(script, container);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      host.replaceChildren();
    };
  }, []);

  return (
    <div className="ad-native-slot" data-native-ad-slot>
      <p className="ad-label">Advertisement</p>
      <div ref={hostRef} className="ad-native-host" />
    </div>
  );
}
