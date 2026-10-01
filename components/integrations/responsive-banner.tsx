"use client";

import { useEffect, useState } from "react";

// These are the two unmodified Adsterra GET CODE snippets for this site.
const desktopCode = `<script>
  atOptions = {
    'key' : '86712fee04bf535f90214dffeb8dbc2f',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/86712fee04bf535f90214dffeb8dbc2f/invoke.js"></script>`;

const mobileCode = `<script>
  atOptions = {
    'key' : '3cdfdd7b2750c0b0bf91435f08dbb203',
    'format' : 'iframe',
    'height' : 50,
    'width' : 320,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/3cdfdd7b2750c0b0bf91435f08dbb203/invoke.js"></script>`;

export function ResponsiveBanner() {
  const [device, setDevice] = useState<"mobile" | "desktop" | null>(null);

  // Choose once for this page visit. Only the selected iframe can execute a script.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDevice(window.innerWidth < 768 ? "mobile" : "desktop");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="site-container ad-banner-slot" data-banner-slot>
      <p className="ad-label">Advertisement</p>
      {device ? (
        <iframe
          title="Advertisement"
          className="ad-banner-frame"
          width={device === "mobile" ? 320 : 728}
          height={device === "mobile" ? 50 : 90}
          srcDoc={device === "mobile" ? mobileCode : desktopCode}
          scrolling="no"
          data-banner-device={device}
        />
      ) : null}
    </div>
  );
}
