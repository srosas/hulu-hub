export function formatImageUrl(url: string, width = 320, height = 180): string {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}size=${width}x${height}&format=jpeg`;
}
