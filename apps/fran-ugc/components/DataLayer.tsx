'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const DataLayer = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Find the closest element that might have tracking info (button, link, or data-gtm)
      const trackableElement = target.closest(
        'a, button, [data-gtm-category], [data-gtm-label]',
      );

      if (!trackableElement) return;

      const element = trackableElement as HTMLElement;
      const section = element.closest('section');

      const clickData = {
        event: 'click_interaction',
        click_element: element.tagName.toLowerCase(),
        click_text:
          element.innerText?.trim() || element.getAttribute('aria-label') || '',
        click_id: element.id || '',
        click_class: element.className || '',
        click_url: (element as HTMLAnchorElement).href || '',
        click_section:
          section?.id || section?.getAttribute('data-section') || '',
        // Custom data attributes
        gtm_category: element.getAttribute('data-gtm-category') || '',
        gtm_label: element.getAttribute('data-gtm-label') || '',
        gtm_action: element.getAttribute('data-gtm-action') || 'click',
        timestamp: new Date().toISOString(),
      };

      window.dataLayer?.push(clickData);
    };

    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  useEffect(() => {
    // Track page views on route changes
    window.dataLayer?.push({
      event: 'page_view',
      page_path: pathname,
      page_search: searchParams.toString(),
      timestamp: new Date().toISOString(),
    });
  }, [pathname, searchParams]);

  return null;
};
