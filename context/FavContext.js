import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [isSyncing, setIsSyncing] = useState(true);

    // ===== SISTEMA DE SINCRONIZACIÓN MEJORADO =====
    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            
            const syncFavorites = async () => {
                try {
                    setIsSyncing(true);
                    const saved = await AsyncStorage.getItem('favorites');
                    if (saved && isActive) {
                        const parsed = JSON.parse(saved);
                        if (Array.isArray(parsed)) {
                            setFavorites(parsed);
                        } else {
                            console.warn('Corrupted favorites data detected. Resetting...');
                            await AsyncStorage.removeItem('favorites');
                        }
                    }
                } catch (error) {
                    console.error('Syncing error:', error);
                } finally {
                    if (isActive) setIsSyncing(false);
                }
            };

            syncFavorites();
            
            return () => { isActive = false; };
        }, [])
    );

    // ===== PERSISTENCIA INTELIGENTE =====
    useEffect(() => {
        if (isSyncing) return;
        
        const saveFavorites = async () => {
            try {
                await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
            } catch (error) {
                console.error('Persist error:', error);
            }
        };
        
        const debounce = setTimeout(saveFavorites, 500);
        return () => clearTimeout(debounce);
    }, [favorites, isSyncing]);

    // ===== TOGGLE CON HÁPTICA Y ANIMACIÓN =====
    const toggleFavorite = useCallback(async (product) => {
        if (!product?.id) return;

        // Feedback háptico
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        
        setFavorites(prev => {
            const exists = prev.some(f => f.id === product.id);
            if (exists) {
                return prev.filter(f => f.id !== product.id);
            } else {
                return [...prev, {...product, favoritedAt: new Date().toISOString()}];
            }
        });
    }, []);

    // ===== FUNCIONES PREMIUM =====
    const clearFavorites = useCallback(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        setFavorites([]);
    }, []);

    const bulkAddFavorites = useCallback((products) => {
        const newFavorites = products.filter(p => 
            !favorites.some(f => f.id === p.id)
        );
        
        if (newFavorites.length > 0) {
            Haptics.selectionAsync();
            setFavorites(prev => [
                ...prev,
                ...newFavorites.map(p => ({
                    ...p,
                    favoritedAt: new Date().toISOString()
                }))
            ]);
        }
    }, [favorites]);

    const isFavorite = useCallback((productId) => {
        return favorites.some(f => f.id === productId);
    }, [favorites]);

    const getFavoritesByCategory = useCallback((category) => {
        return favorites.filter(f => f.category === category);
    }, [favorites]);

    // ===== OPTIMIZACIÓN DE RENDIMIENTO =====
    const contextValue = useMemo(() => ({
        favorites,
        isSyncing,
        toggleFavorite,
        clearFavorites,
        bulkAddFavorites,
        isFavorite,
        getFavoritesByCategory,
        favoritesCount: favorites.length,
        hasFavorites: favorites.length > 0
    }), [favorites, isSyncing]);

    return (
        <FavContext.Provider value={contextValue}>
            {children}
        </FavContext.Provider>
    );
};