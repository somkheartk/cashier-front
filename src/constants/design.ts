// Design tokens and constants for consistent styling across the application

export const COLORS = {
  // Primary brand colors
  primary: '#2E7D32',
  primaryLight: '#4CAF50',
  primaryDark: '#1B5E20',

  // Status colors
  success: '#2E7D32',
  error: '#C62828',
  warning: '#E65100',
  info: '#1976D2',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray: '#666666',
  lightGray: '#F5F5F5',
  borderGray: '#E0E0E0',

  // Gradients
  primaryGradient: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
  secondaryGradient: 'linear-gradient(135deg, #1976D2 0%, #2196F3 100%)',
} as const;

export const BORDER_RADIUS = {
  small: 2,
  medium: 3,
  large: 4,
  extraLarge: 6,
} as const;

export const SPACING = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 6,
  xxl: 8,
} as const;

export const SHADOWS = {
  light: '0 2px 8px rgba(0,0,0,0.1)',
  medium: '0 4px 14px rgba(0,0,0,0.15)',
  heavy: '0 8px 25px rgba(0,0,0,0.15)',
} as const;

export const FONT_WEIGHTS = {
  normal: 400,
  medium: 500,
  bold: 700,
  extraBold: 800,
} as const;

export const ANIMATION = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: 'ease-in-out',
} as const;
