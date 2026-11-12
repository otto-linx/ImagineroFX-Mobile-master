// constants/theme.js

// ========== PALETA BASE ========== //
const baseColors = {
  // Primarios
  primary: '#ff4081',
  primaryDark: '#c60055',
  primaryLight: '#ff79b0',
  
  // Secundarios
  secondary: '#03a9f4',
  secondaryDark: '#007ac1',
  secondaryLight: '#67daff',
  
  // Estados
  success: '#4CAF50',
  successDark: '#388E3C',
  successLight: '#C8E6C9',
  
  warning: '#FFC107',
  warningDark: '#FFA000',
  warningLight: '#FFECB3',
  
  error: '#f44336',
  errorDark: '#d32f2f',
  errorLight: '#ffcdd2',
  
  info: '#2196F3',
  infoDark: '#1976D2',
  infoLight: '#BBDEFB',
  
  // Neutrales
  neutral: '#9E9E9E',
  neutralDark: '#616161',
  neutralLight: '#F5F5F5',
  
  // Grises
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',
};

// ========== SISTEMA DE TEMAS ========== //
const theme = {
  light: {
    ...baseColors,
    
    // Fondo
    background: '#FFFFFF',
    surface: '#F5F5F5',
    
    // Texto
    text: '#212121',
    textSecondary: '#757575',
    textDisabled: '#BDBDBD',
    
    // Bordes
    border: '#E0E0E0',
    borderLight: '#EEEEEE',
    
    // Iconos
    icon: '#424242',
    
    // Elementos especiales
    accent: '#FFEB3B',
    divider: 'rgba(0, 0, 0, 0.12)',
    
    // Sombras
    shadow: 'rgba(0, 0, 0, 0.12)',
    
    // Componentes
    card: '#FFFFFF',
    button: baseColors.primary,
    input: '#FFFFFF',
  },
  
  dark: {
    ...baseColors,
    
    // Fondo
    background: '#121212',
    surface: '#1E1E1E',
    
    // Texto
    text: '#FFFFFF',
    textSecondary: '#BDBDBD',
    textDisabled: '#757575',
    
    // Bordes
    border: '#424242',
    borderLight: '#616161',
    
    // Iconos
    icon: '#E0E0E0',
    
    // Elementos especiales
    accent: '#FFD600',
    divider: 'rgba(255, 255, 255, 0.12)',
    
    // Sombras
    shadow: 'rgba(0, 0, 0, 0.24)',
    
    // Componentes
    card: '#1E1E1E',
    button: baseColors.primaryLight,
    input: '#2D2D2D',
  },
};

// ========== SISTEMA DE SOMBRAS ========== //
const elevation = {
  0: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  4: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  8: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  16: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 8.65,
    elevation: 16,
  },
};

// ========== EXPORTACIONES ========== //
export const colors = theme.light; // Tema por defecto
export const shadows = elevation;
export const palette = baseColors;
export const themes = theme; // Ambos temas

// ========== COLORS FOR COMPONENTS ========== //
export const buttonColors = {
  primary: {
    background: baseColors.primary,
    text: '#FFFFFF',
    border: 'transparent',
  },
  secondary: {
    background: baseColors.secondary,
    text: '#FFFFFF',
    border: 'transparent',
  },
  outline: {
    background: 'transparent',
    text: baseColors.primary,
    border: baseColors.primary,
  },
  disabled: {
    background: baseColors.gray300,
    text: baseColors.gray600,
    border: baseColors.gray400,
  },
};

export const textColors = {
  primary: theme.light.text,
  secondary: theme.light.textSecondary,
  disabled: theme.light.textDisabled,
  error: baseColors.error,
  success: baseColors.success,
  warning: baseColors.warning,
  info: baseColors.info,
};

export default colors;