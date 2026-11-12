// colors.js

// Paleta base
const baseColors = {
  primary: '#ff4081',
  primaryDark: '#c60055',
  primaryLight: '#ff79b0',
  
  secondary: '#03a9f4',
  secondaryDark: '#007ac1',
  secondaryLight: '#67daff',
  
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
  
  neutral: '#9E9E9E',
  neutralDark: '#616161',
  neutralLight: '#F5F5F5',
};

// Sistema de temas
const theme = {
  light: {
    ...baseColors,
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',
    icon: '#424242',
    accent: '#FFEB3B',
    shadow: 'rgba(0, 0, 0, 0.12)',
  },
  dark: {
    ...baseColors,
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#BDBDBD',
    border: '#424242',
    icon: '#E0E0E0',
    accent: '#FFD600',
    shadow: 'rgba(0, 0, 0, 0.24)',
  },
};

// Sistema de elevación (sombras)
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
};

// Exportar el sistema completo
export const colors = theme.light; // Tema actual
export const shadows = elevation; // Sistema de sombras
export const palette = baseColors; // Paleta base
export const themes = theme; // Todos los temas

// Componentes específicos
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
};

export default colors;