import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Animated } from 'react-native';

const CategoryCard = ({ category, isActive = false, onPress }) => {
  const scaleValue = new Animated.Value(1);
  
  if (!category) return null;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
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
    
    if (onPress) {
      setTimeout(() => onPress(category), 100);
    }
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityLabel={category.name}
      accessibilityHint={`Ver productos de ${category.name}`}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
    >
      <Animated.View 
        style={[
          styles.card,
          isActive && styles.activeCard,
          { transform: [{ scale: scaleValue }] }
        ]}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={category.image} 
            style={styles.image} 
            resizeMode="cover"
            accessibilityLabel={`Categoría ${category.name}`}
          />
          {isActive && (
            <View style={styles.activeIndicator}>
              <Text style={styles.activeText}>✓</Text>
            </View>
          )}
        </View>
        <Text 
          style={[
            styles.label,
            isActive && styles.activeLabel
          ]}
        >
          {category.name}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    width: 110,
    height: 140,
    justifyContent: 'space-between',
  },
  activeCard: {
    backgroundColor: '#FFF8E1',
    borderWidth: 2,
    borderColor: '#FFD600',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f5f5f5',
  },
  label: {
    marginTop: 8,
    fontWeight: '700',
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  activeLabel: {
    color: '#D32F2F',
    fontWeight: '800',
  },
  activeIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#4CAF50',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});