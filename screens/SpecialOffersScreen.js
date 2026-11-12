import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const specialOffers = [
  {
    id: '12',
    title: 'Máscara Robótica Futurista',
    discount: 14,
    originalPrice: 3500000,
    discountedPrice: 3000000,
    image: require('../assets/producto1.jpg'),
    description: 'Diseño avanzado con tecnología de iluminación LED integrada',
    endDate: '20/12/2023'
  },
  {
    id: '19',
    title: 'Máscara Cara de Michael Jackson',
    discount: 20,
    originalPrice: 1000000,
    discountedPrice: 800000,
    image: require('../assets/producto2.jpg'),
    description: 'Edición Mascaras con detalles únicos y exclusivos',
    endDate: '15/12/2023'
  },
  {
    id: '9',
    title: 'Estatuas Faraon x3',
    discount: 20,
    originalPrice: 5000000,
    discountedPrice: 4000000,
    image: require('../assets/producto3.jpg'),
    description: 'Diseño inspirado en los faraones con detalles en oro auténtico',
    endDate: '18/12/2023'
  },
  {
    id: '4',
    title: 'Mono Rey Leon',
    discount: 50,
    originalPrice: 1000000,
    discountedPrice: 500000,
    image: require('../assets/producto4.jpg'),
    description: 'Disfraz infantil oficial de Mowgli con tela de alta resistencia',
    endDate: '10/12/2023'
  },
  {
    id: '5',
    title: 'Santa Claus Pezcador',
    discount: 33,
    originalPrice: 1500000,
    discountedPrice: 1000000,
    image: require('../assets/producto5.jpg'),
    description: 'Figura decorativa de cerámica resistente a intemperie',
    endDate: '25/12/2023'
  },
  {
    id: '6',
    title: 'Set Reyes Magos',
    discount: 22,
    originalPrice: 9000000,
    discountedPrice: 7000000,
    image: require('../assets/producto6.jpg'),
    description: 'Colección completa de figuras navideñas con detalles dorados',
    endDate: '24/12/2023'
  },
];

export default function SpecialOffersScreen({ navigation }) {
  const renderOffer = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Product', { product: item })}
    >
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={styles.gradient}
      />
      
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{item.discount}% OFF</Text>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)}</Text>
          <Text style={styles.discountedPrice}>${item.discountedPrice.toFixed(2)}</Text>
        </View>
        
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={16} color="#fff" />
          <Text style={styles.timeText}>Termina el {item.endDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ofertas Especiales</Text>
        <Text style={styles.subtitle}>Descuentos exclusivos por tiempo limitado</Text>
      </View>
      
      <FlatList
        data={specialOffers}
        renderItem={renderOffer}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="pricetag-outline" size={60} color="#e0e0e0" />
            <Text style={styles.emptyText}>No hay ofertas disponibles</Text>
          </View>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#d32f2f',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    height: 250,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  discountBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#d32f2f',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  originalPrice: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textDecorationLine: 'line-through',
    marginRight: 10,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  timeText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    color: '#999',
  },
});