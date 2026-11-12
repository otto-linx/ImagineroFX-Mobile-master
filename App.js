// App.js
import React from 'react';
import Toast from 'react-native-toast-message';
import AppNavigator from './navigation/AppNavigator';
import { CartProvider } from './context/CartContext'; // ✅ mantenemos el carrito
import { ThemeProvider } from './context/ThemeContext';


export default function App() {
  return (
    <>
      <CartProvider>
          <AppNavigator />
      </CartProvider>
      <Toast />
    </>
  );
}