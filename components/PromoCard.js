import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

const PromoCard = ({ item }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.9}
      accessibilityLabel={`Promoción: ${item.title}`}
      accessibilityHint={item.subtitle}
    >
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      
      <View style={styles.contentOverlay}>
        <View style={styles.textContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>OFERTA</Text>
          </View>
          
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          
          <View style={styles.ctaContainer}>
            <Text style={styles.ctaText}>VER AHORA</Text>
            <View style={styles.arrowIcon}>
              <Text style={styles.arrow}>➔</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.countdown}>
        <Text style={styles.countdownText}>FINALIZA EN: 2D 15H</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PromoCard;

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  contentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textContainer: {
    paddingBottom: 10,
  },
  badge: {
    backgroundColor: '#d32f2f',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#FFD600',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  arrowIcon: {
    marginLeft: 10,
    backgroundColor: '#FFD600',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  countdown: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  countdownText: {
    color: '#d32f2f',
    fontSize: 12,
    fontWeight: 'bold',
  },
});