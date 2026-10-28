export const ANNOUNCEMENT_BACKGROUNDS = [
  { id: 'navy', label: 'Deep Navy', value: '#07183d' },
  { id: 'cinnamon', label: 'Warm Cinnamon', value: '#8d5a36' },
  { id: 'orange', label: 'Harvest Orange', value: '#c94f09' },
  { id: 'green', label: 'Orchard Green', value: '#315f29' },
  { id: 'brown', label: 'Cocoa Brown', value: '#62412c' },
  { id: 'cream', label: 'Soft Cream', value: '#f7eddb' },
];

export const ANNOUNCEMENT_TEXT_COLORS = [
  { id: 'cream', label: 'Warm White', value: '#fffaf2' },
  { id: 'white', label: 'Pure White', value: '#ffffff' },
  { id: 'navy', label: 'Deep Navy', value: '#07183d' },
  { id: 'ink', label: 'Charcoal', value: '#252522' },
];

export const DEFAULT_ANNOUNCEMENT = {
  enabled: true,
  message: 'A thoughtful mix for everyday snacking, festive gifting & wholesale needs',
  backgroundColor: 'navy',
  textColor: 'cream',
};

const validBackgrounds = new Set(ANNOUNCEMENT_BACKGROUNDS.map((color) => color.id));
const validTextColors = new Set(ANNOUNCEMENT_TEXT_COLORS.map((color) => color.id));

export function normalizeAnnouncement(value = {}) {
  const message = typeof value.message === 'string' ? value.message.trim().slice(0, 180) : '';

  return {
    enabled: typeof value.enabled === 'boolean' ? value.enabled : DEFAULT_ANNOUNCEMENT.enabled,
    message: message || DEFAULT_ANNOUNCEMENT.message,
    backgroundColor: validBackgrounds.has(value.backgroundColor)
      ? value.backgroundColor
      : DEFAULT_ANNOUNCEMENT.backgroundColor,
    textColor: validTextColors.has(value.textColor)
      ? value.textColor
      : DEFAULT_ANNOUNCEMENT.textColor,
  };
}

export function getAnnouncementColor(colors, id, fallback) {
  return colors.find((color) => color.id === id)?.value || fallback;
}
