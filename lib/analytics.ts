/** Fire a product analytics event. */
export function trackEvent(
  name: string,
  props?: Record<string, string>,
): void {
  // TODO: forward `name` and `props` to Google Analytics and/or PostHog.
  void name;
  void props;
}
