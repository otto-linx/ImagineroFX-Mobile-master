import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductCard = ({ product, onPress, onFavoritePress }) => {
  const [scaleValue] = useState(new Animated.Value(1));
  const [favoriteScale] = useState(new Animated.Value(1));
  
  if (!product) return null;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.97,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleFavoritePress = () => {
    if (onFavoritePress) {
      Animated.sequence([
        Animated.spring(favoriteScale, {
          toValue: 1.3,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.spring(favoriteScale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
      
      setTimeout(() => onFavoritePress(product), 200);
    }
  };

  const renderProfessionalBadge = () => {
    return (
      <View style={styles.proBadge}>
        <Text style={styles.proBadgeText}>PRO</Text>
      </View>
    );
  };

  const renderMaterialBadge = () => {
    if (product.material) {
      return (
        <View style={styles.materialBadge}>
          <Text style={styles.materialText}>{product.material}</Text>
        </View>
      );
    }
    return null;
  };

  const renderTags = () => {
    if (product.tags && product.tags.length > 0) {
      return (
        <View style={styles.tagsContainer}>
          {product.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityLabel={`Producto profesional: ${product.name}, Precio: $${product.price}`}
      accessibilityRole="button"
    >
      <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
        <View style={styles.imageContainer}>
          <Image 
            source={product.image} 
            style={styles.image} 
            resizeMode="contain"
            accessibilityLabel={`Imagen de ${product.name}`}
          />
          
          {renderProfessionalBadge()}
          
          <Pressable 
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            accessibilityLabel={product.isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
            accessibilityRole="button"
          >
            <Animated.View style={{ transform: [{ scale: favoriteScale }] }}>
              <Ionicons 
                name={product.isFavorite ? "heart" : "heart-outline"} 
                size={24} 
                color={product.isFavorite ? "#d32f2f" : "#333"} 
              />
            </Animated.View>
          </Pressable>
        </View>
        
        <View style={styles.info}>
          <Text 
            style={styles.name} 
            numberOfLines={2}
            accessibilityLabel={`Nombre: ${product.name}`}
          >
            {product.name}
          </Text>
          
          <Text style={styles.category} numberOfLines={1}>
            {product.category}
          </Text>
          
          {renderMaterialBadge()}
          {renderTags()}
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
          
          <View style={styles.shippingBadge}>
            <Ionicons name="rocket" size={14} color="#4CAF50" />
            <Text style={styles.shippingText}>Entrega exprés</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: 170,
    margin: 8,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 160,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  proBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#1976D2',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  proBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  materialBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#7B1FA2',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  materialText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    padding: 12,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    minHeight: 40,
  },
  category: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  priceContainer: {
    marginTop: 4,
    marginBottom: 8,
  },
  price: {
    fontWeight: 'bold',
    color: '#d32f2f',
    fontSize: 16,
  },
  shippingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  shippingText: {
    fontSize: 11,
    color: '#2E7D32',
    marginLeft: 4,
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 4,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#424242',
  },
});