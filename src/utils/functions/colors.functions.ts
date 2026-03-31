export function darkenColor(hex: string, percentage: number): string {
  // Helper function to convert HEX to RGB
  function hexToRgb(hex: string) {
    const normalizedHex = hex.replace("#", "");
    const r = parseInt(normalizedHex.substring(0, 2), 16);
    const g = parseInt(normalizedHex.substring(2, 4), 16);
    const b = parseInt(normalizedHex.substring(4, 6), 16);
    return { r, g, b };
  }

  // Helper function to convert RGB to HSL
  function rgbToHsl(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    const d = max - min;
    const s = max === min ? 0 : d / (1 - Math.abs(2 * l - 1));
    const h =
      max === min
        ? 0
        : max === r
          ? (60 * ((g - b) / d) + 360) % 360
          : max === g
            ? 60 * ((b - r) / d) + 120
            : 60 * ((r - g) / d) + 240;
    return { h, s, l };
  }

  // Helper function to convert HSL back to HEX
  function hslToHex(h: number, s: number, l: number) {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;

    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    const toHex = (v: number) =>
      Math.round((v + m) * 255)
        .toString(16)
        .padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  // Convert HEX to HSL
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  // Darken the lightness
  const newL = Math.max(0, l - percentage / 100);

  // Convert back to HEX
  return hslToHex(h, s, newL);
}
