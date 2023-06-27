export function generateRandomColors(count: number) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    let color;
    do {
      const hue = Math.floor(Math.random() * 360);
      const saturation = Math.floor(Math.random() * 60) + 40; // Adjust the saturation range (40-99)
      const brightness = Math.floor(Math.random() * 40) + 60; // Adjust the brightness range (60-99)
      color = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
    } while (isColorExcluded(color));
    colors.push(color);
  }
  return colors;
}

export function isColorExcluded(color: string) {
  const excludedTones = [/^hsl\(0, 0%, 0%\)$/]; // Exclude black color (hsl(0, 0%, 0%))
  return excludedTones.some((pattern) => pattern.test(color));
}
