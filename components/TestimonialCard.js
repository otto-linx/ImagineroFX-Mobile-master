import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TestimonialCard = ({ item, onPress }) => {
  const scaleValue = new Animated.Value(1);
  
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityLabel={`Testimonio de ${item.name}, calificación ${item.rating}/5`}
    >
      <Animated.View 
        style={[
          styles.card, 
          { transform: [{ scale: scaleValue }] }
        ]}
      >
        <View style={styles.header}>
          {item.avatar ? (
            <Image 
              source={item.avatar} 
              style={styles.avatar} 
              accessibilityLabel={`Avatar de ${item.name}`}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={24} color="#666" />
            </View>
          )}
          
          <View style={styles.userInfo}>
            <Text 
              style={styles.name}
              accessibilityLabel={`Cliente: ${item.name}`}
            >
              {item.name}
            </Text>
            <View 
              style={styles.ratingContainer}
              accessibilityLabel={`Calificación: ${item.rating} de 5 estrellas`}
            >
              {[...Array(5)].map((_, i) => (
                <Ionicons
                  key={i}
                  name={i < item.rating ? "star" : "star-outline"}
                  size={18}
                  color="#FFD700"
                  accessibilityElementsHidden={true}
                />
              ))}
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
        
        <Text 
          style={styles.comment}
          accessibilityLabel={`Comentario: ${item.comment}`}
        >
          "{item.comment}"
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.date} accessibilityLabel={`Fecha: ${item.date}`}>
            {item.date}
          </Text>
          {item.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.verifiedText}>Verificado</Text>
            </View>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default TestimonialCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    width: 300,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#f5f5f5',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'sans-serif-medium',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  comment: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  verifiedText: {
    fontSize: 12,
    color: '#2E7D32',
    marginLeft: 4,
    fontWeight: '500',
  },
});