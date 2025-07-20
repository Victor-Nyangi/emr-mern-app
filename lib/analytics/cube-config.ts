export function extractHashConfig<T extends Record<string, unknown>>(
  defaults?: T
): T {
  // Only access location in the browser
  if (typeof window !== "undefined" && window.location && window.location.hash) {
    const hash = window.location.hash.slice(1);

    if (hash) {
      try {
        return {
          ...defaults,
          ...JSON.parse(atob(decodeURIComponent(hash))),
        };
      } catch (e) {
        console.error('Invalid hash', hash);
      }
    }
  }

  return {
    ...defaults,
  } as T;
}