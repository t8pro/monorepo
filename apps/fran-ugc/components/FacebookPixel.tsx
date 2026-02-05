'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

export const FacebookPixel = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This hook is for tracking page views on route changes for SPA behavior
    // @ts-expect-error fbq is added by the script
    if (typeof window.fbq === 'function') {
      // @ts-expect-error fbq is added by the script
      window.fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  if (!FACEBOOK_PIXEL_ID) return null;

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FACEBOOK_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
    </>
  );
};
