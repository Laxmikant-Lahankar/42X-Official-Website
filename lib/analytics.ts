/** Google Tag Manager container for 42xacademy.com. */
export const GTM_ID = "GTM-MC68W5FS";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

/**
 * Fire an analytics event into the GTM dataLayer.
 * In GTM, create a "Custom Event" trigger with the same event name
 * (e.g. `cta_click`, `generate_lead`) and send it to GA4.
 *
 * Never pass personal data (name, email, phone) in `props`.
 */
export function trackEvent(
  name: string,
  props?: Record<string, string>,
): void {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: name, ...props });
}
