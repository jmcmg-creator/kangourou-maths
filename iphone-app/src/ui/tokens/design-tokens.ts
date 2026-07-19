/**
 * Design tokens partagés — palette, typographies, espacements, rayons.
 * Ces valeurs sont ALIGNÉES avec la web app (thème « Royaume des Savoirs »)
 * mais surface iOS = safe areas + haptique + typographies système en priorité.
 */

export const colors = {
  bgDeep: '#0f0a2e',
  bgMid: '#1a1145',
  bgSurface: '#231854',
  bgCard: 'rgba(255,255,255,0.06)',
  bgCardSolid: '#1e1650',
  borderGlow: 'rgba(251,191,36,0.25)',
  borderSubtle: 'rgba(255,255,255,0.08)',
  textBright: '#faf5ff',
  textMid: '#c4b5fd',
  textDim: '#8b7ec8',
  gold: '#fbbf24',
  goldLight: '#fde68a',
  green: '#34d399',
  red: '#f87171',
  blue: '#60a5fa',
  purple: '#a78bfa',
  danger: '#ef4444',
  success: '#22c55e'
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48
} as const;

export const radii = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 32,
  pill: 9999
} as const;

export const typography = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
  fontFamilyDisplay:
    '"SF Pro Display", -apple-system, BlinkMacSystemFont, Arial, sans-serif',
  sizes: {
    caption: 12,
    body: 16,
    subhead: 15,
    headline: 17,
    title3: 20,
    title2: 22,
    title1: 28,
    largeTitle: 34
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 800
  }
} as const;

export const shadows = {
  card: '0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)',
  cardHover: '0 16px 48px rgba(0,0,0,0.4), 0 4px 16px rgba(251,191,36,0.1)'
} as const;

export const animations = {
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  fast: '150ms',
  base: '250ms',
  slow: '400ms'
} as const;

export const zIndex = {
  base: 0,
  content: 10,
  header: 100,
  modal: 1000,
  splash: 9999
} as const;

/** Zones tactiles minimales iOS (Apple HIG). */
export const touchTarget = {
  min: 44
} as const;

/** Serialise les tokens en variables CSS injectables au boot. */
export function tokensToCss(): string {
  const lines: string[] = [':root {'];
  for (const [k, v] of Object.entries(colors)) lines.push(`  --color-${kebab(k)}: ${v};`);
  for (const [k, v] of Object.entries(spacing)) lines.push(`  --space-${k}: ${v}px;`);
  for (const [k, v] of Object.entries(radii)) lines.push(`  --radius-${k}: ${v}px;`);
  for (const [k, v] of Object.entries(typography.sizes)) lines.push(`  --font-size-${kebab(k)}: ${v}px;`);
  lines.push(`  --font-family: ${typography.fontFamily};`);
  lines.push(`  --font-family-display: ${typography.fontFamilyDisplay};`);
  lines.push('}');
  return lines.join('\n');
}

function kebab(s: string): string {
  return s.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
}
