/**
 * Wikimedia Commons helper utilities.
 *
 * IMPORTANT: The app intentionally does not search Commons at runtime.
 * Every historical image is curated in figuresData.ts with an exact File: name
 * so a different or unrelated image can never be substituted automatically.
 */
export function commonsFilePage(filename: string): string {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename)}`;
}

export function commonsSpecialFilePath(filename: string, width = 1000): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${width}`;
}
