export function translateFormatter(
  text: string,
  params: Record<string, string | number>
): string {
  return text.replace(/:\w+/g, (match) => {
    const key = match.slice(1);
    return params[key] !== undefined ? String(params[key]) : match;
  });
}
