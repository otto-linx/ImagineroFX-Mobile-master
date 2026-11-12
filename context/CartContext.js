import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // ===== CARGA INICIAL UNIFICADA =====
  useEffect(() => {
    const loadData = async () => {
      try {
        const [savedCart, storedCards] = await Promise.all([
          AsyncStorage.getItem('cart'),
          AsyncStorage.getItem('savedCards')
        ]);

        // Cargar carrito con validación
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          setCartItems(Array.isArray(parsed) ? parsed : []);
        }

        // Cargar tarjetas con normalización
        if (storedCards) {
          const parsedCards = JSON.parse(storedCards);
          
          if (Array.isArray(parsedCards)) {
            // Añadir IDs a tarjetas antiguas
            const normalizedCards = parsedCards.map(card => 
              card.id ? card : { 
                ...card, 
                id: `legacy-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
              }
            );
            setSavedCards(normalizedCards);
          } else {
            setSavedCards([]);
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
        // Resetear en caso de error grave
        setCartItems([]);
        setSavedCards([]);
      }
    };

    loadData();
  }, []);

  // ===== GUARDADO AUTOMÁTICO =====
  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    AsyncStorage.setItem('savedCards', JSON.stringify(savedCards));
  }, [savedCards]);

  // ===== FUNCIONES MEMOIZADAS =====
  const addToCart = useCallback((product) => {
    if (!product?.id || typeof product.price !== 'number') return;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      }
      
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, action) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? {
          ...item,
          quantity: action === 'increase' 
            ? item.quantity + 1 
            : Math.max(1, item.quantity - 1)
        } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // REQUIERE parámetro explícito ahora
  const clearCartAfterPurchase = useCallback((purchasedItems) => {
    setCartItems(prev => 
      prev.filter(item => !purchasedItems.some(p => p.id === item.id))
    );
    setSelectedProducts([]);
  }, []);

  const toggleProductSelection = useCallback((product) => {
    setSelectedProducts(prev => 
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  }, []);

  const saveCard = useCallback((cardData) => {
    const newCard = {
      ...cardData,
      id: `card-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    };
    setSavedCards(prev => [...prev, newCard]);
  }, []);

  const removeCard = useCallback((cardId) => {
    setSavedCards(prev => prev.filter(card => card.id !== cardId));
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        savedCards,
        selectedProducts,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        clearCartAfterPurchase,
        toggleProductSelection,
        saveCard,
        removeCard
      }}
    >
      {children}
    </CartContext.Provider>
  );
};