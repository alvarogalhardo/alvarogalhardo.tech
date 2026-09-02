export const THEMES = {
  dark: {
    bg: 'oklch(0.185 0.019 252)',
    bgFade: 'oklch(0.185 0.019 252 / 0.84)',
    fg: 'oklch(0.915 0.003 250)',
    muted: 'oklch(0.705 0.006 250)',
    line: 'oklch(0.315 0.012 250)',
    accent: 'oklch(0.745 0.145 58)',
    accentSoft: 'oklch(0.63 0.072 58)'
  },
  light: {
    bg: 'oklch(0.918 0.004 250)',
    bgFade: 'oklch(0.918 0.004 250 / 0.84)',
    fg: 'oklch(0.335 0.062 254)',
    muted: 'oklch(0.505 0.042 254)',
    line: 'oklch(0.825 0.008 250)',
    accent: 'oklch(0.52 0.155 52)',
    accentSoft: 'oklch(0.515 0.09 52)'
  }
} as const;

export const CONTROL_BORDER = {
  dark: 'oklch(0.50 0.012 250)',
  light: 'oklch(0.60 0.008 250)'
} as const;

export type ThemeName = keyof typeof THEMES;
