import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Share,
  Alert,
  Modal,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ProductScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Producto no disponible.</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setShowSuccessModal(true);
  };

  const increaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const shareProduct = async () => {
    try {
      await Share.share({
        message: `¡Mira este increíble producto en ImagineroFX! ${product.name} - $${product.price}\n${product.description || ''}`,
        url: 'https://imaginero.fx',
        title: product.name
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el producto');
    }
  };

  const renderRatingStars = () => {
    const rating = product.rating || 4.5;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= Math.floor(rating) ? 'star' : 'star-outline'}
          size={20}
          color={i <= rating ? '#FFD700' : '#ccc'}
        />
      );
    }
    return <View style={styles.ratingStars}>{stars}</View>;
  };

  const goToCart = () => {
    setShowSuccessModal(false);
    navigation.navigate('Main', { screen: 'Cart' });
  };

  const continueShopping = () => {
    setShowSuccessModal(false);
  };

  const buyNow = () => {
    addToCart({ ...product, quantity });
    navigation.navigate('Checkout');
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    Alert.alert(
      isFavorite ? 'Eliminado de favoritos' : 'Añadido a favoritos',
      isFavorite ? 'El producto ha sido eliminado de tu lista de deseados' : 'El producto ha sido añadido a tu lista de deseados'
    );
  };

  // Productos relacionados filtrados por categoría del producto actual
  const relatedProducts = products.filter(
    (item) =>
      item.category === product.category && item.id !== product.id
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="#333" />
          </TouchableOpacity>
          {/* Botón de favoritos eliminado */}
        </View>

        {/* Imagen del producto */}
        <View style={styles.imageShadowContainer}>
          <Image
            source={product.image}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Escena Cinematográfica</Text>
          </View>
        </View>

        {/* Información principal */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <View style={styles.priceRatingRow}>
            <Text style={styles.price}>${Number(product.price).toLocaleString('es-CO', {minimumFractionDigits: 0})}</Text>
            <View style={styles.ratingContainer}>
              {renderRatingStars()}
              <Text style={styles.ratingNumber}>{product.rating}</Text>
            </View>
          </View>
          {product.category && (
            <Text style={styles.category}>{product.category}</Text>
          )}
        </View>

        {/* Ficha técnica */}
        <View style={styles.techCard}>
          <Text style={styles.techTitle}>Ficha técnica</Text>
          <View style={styles.techRow}>
            <Ionicons name="cube-outline" size={18} color="#d32f2f" style={styles.techIcon} />
            <Text style={styles.techLabel}>Material:</Text>
            <Text style={styles.techValue}>{product.material || 'Madera y metal'}</Text>
          </View>
          <View style={styles.techRow}>
            <Ionicons name="resize-outline" size={18} color="#d32f2f" style={styles.techIcon} />
            <Text style={styles.techLabel}>Dimensiones:</Text>
            <Text style={styles.techValue}>{product.dimensions || 'Personalizables'}</Text>
          </View>
          <View style={styles.techRow}>
            <Ionicons name="color-palette-outline" size={18} color="#d32f2f" style={styles.techIcon} />
            <Text style={styles.techLabel}>Colores:</Text>
            <Text style={styles.techValue}>{product.colors || 'Personalizables'}</Text>
          </View>
        </View>

        {/* Descripción */}
        {product.description && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        )}

        {/* Características destacadas */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Características</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Fabricación personalizada</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Entrega en todo el país</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Garantía de calidad cinematográfica</Text>
            </View>
          </View>
        </View>

        {/* Selector de cantidad */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Cantidad</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              style={styles.quantityButton}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={increaseQuantity}
              style={styles.quantityButton}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botones de acción */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Ionicons name="cart" size={24} color="#fff" />
            <Text style={styles.cartButtonText}>Agregar al carrito</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={buyNow}
            activeOpacity={0.8}
          >
            <Ionicons name="flash" size={24} color="#fff" />
            <Text style={styles.buyButtonText}>Comprar ahora</Text>
          </TouchableOpacity>
          {/* Botón de compartir eliminado */}
        </View>

        {/* Recomendaciones */}
        <View style={styles.recommendationsContainer}>
          <TouchableOpacity
            onPress={() => setExpanded((prev) => !prev)}
            activeOpacity={0.8}
            style={[
              styles.recommendationsHeader,
              expanded && styles.recommendationsHeaderExpanded,
            ]}
          >
            <Text style={styles.recommendationsTitle}>
              Productos relacionados
            </Text>
            <Ionicons
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size={22}
              color="#d32f2f"
            />
          </TouchableOpacity>
          {expanded && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.recommendationsList}
            >
              {relatedProducts.length === 0 ? (
                <Text style={{ color: '#888', marginLeft: 10 }}>
                  No hay más productos en esta categoría.
                </Text>
              ) : (
                relatedProducts.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.recommendationCard}
                    onPress={() => navigation.push('Product', { product: item })}
                  >
                    <Image
                      source={item.image}
                      style={styles.recommendationImage}
                      resizeMode="cover"
                    />
                    <Text numberOfLines={1} style={styles.recommendationName}>
                      {item.name}
                    </Text>
                    <Text style={styles.recommendationPrice}>
                      ${item.price}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          )}
        </View>
      </ScrollView>

      {/* Modal de éxito */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
            </View>
            <Text style={styles.modalTitle}>¡Añadido al carrito!</Text>
            <Text style={styles.modalText}>
              {quantity} {quantity > 1 ? 'unidades' : 'unidad'} de {product.name}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalContinueButton}
                onPress={continueShopping}
              >
                <Text style={styles.modalContinueText}>Seguir comprando</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCartButton}
                onPress={goToCart}
              >
                <Text style={styles.modalCartText}>Ver carrito</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Lista de productos para recomendaciones (en producción real vendría de una API)
const products = [
  // Categoría: Feria
  { 
    id: 8, 
    name: 'Avión tematico', 
    price: 2000000, 
    category: 'Feria', 
    rating: 4.3, 
    image: require('../assets/plane.jpg'),
    description: 'Aeronave decorativa interactiva para ferias con luces y sonido.'
  },
  { 
    id: 9, 
    name: 'Estatuas Faraon x3', 
    price: 4000000, 
    category: 'Feria', 
    rating: 4.2, 
    image: require('../assets/statues.jpg'),
    description: 'Conjunto de tres figuras egipcias perfectas para ambientaciones temáticas.'
  },

  // Categoría: Medieval
  {
    id: '11',
    name: 'Busto Faraón Egipcio',
    price: 800000,
    category: 'Medieval',
    rating: 4.7,
    image: require('../assets/producto3.jpg'),
    description: 'Diseño inspirado en los faraones con detalles en oro auténtico.'
  },

  // Categoría: Navidad
  { 
    id: 1, 
    name: 'Escultura jirafa y cebra de navidad', 
    price: 5000000, 
    category: 'Navidad', 
    rating: 4.8, 
    image: require('../assets/tree.jpg'),
    description: 'Pareja de animales navideños decorativos ideales para parques o centros comerciales.'
  },
  { 
    id: 2, 
    name: 'Castillo zoologico', 
    price: 40000000, 
    category: 'Navidad', 
    rating: 4.5, 
    image: require('../assets/lights.jpg'),
    description: 'Instalación monumental con animales, luces y motivos navideños, ideal para exhibiciones.'
  },
  { 
    id: 3, 
    name: 'Oso Polar con Guitarra', 
    price: 1500000, 
    category: 'Navidad', 
    rating: 4.7, 
    image: require('../assets/polar-bear-guitar.jpg'),
    description: 'Figura animada con sonido, ideal para ambientar espacios navideños musicales.'
  },
  { 
    id: 4, 
    name: 'Duende Musical', 
    price: 2000000, 
    category: 'Navidad', 
    rating: 4.6, 
    image: require('../assets/santa.jpg'),
    description: 'Decoración interactiva con música navideña y movimientos mecánicos.'
  },
  {
    id: '14',
    name: 'Santa Claus Pezcador',
    price: 1000000,
    category: 'Navidad',
    rating: 4.6,
    image: require('../assets/producto5.jpg'),
    description: 'Figura decorativa de cerámica resistente a intemperie, con temática costera navideña.'
  },
  {
    id: '15',
    name: 'Set Reyes Magos',
    price: 7000000,
    category: 'Navidad',
    rating: 4.4,
    image: require('../assets/producto6.jpg'),
    description: 'Colección completa de figuras navideñas con detalles dorados.'
  },

  // Categoría: Utilería
  {
    id: '10',
    name: 'Máscara Cara de Michael Jackson',
    price: 800000,
    category: 'Utilería',
    rating: 4.5,
    image: require('../assets/producto2.jpg'),
    description: 'Edición especial con detalles en oro y efectos luminiscentes.'
  },
  {
    id: '12',
    name: 'Máscara Robótica Futurista',
    price: 3000000,
    category: 'Utilería',
    rating: 4.8,
    image: require('../assets/producto1.jpg'),
    description: 'Mascara de alta tecnología con luces LED y efectos de sonido.'
  },

  // Categoría: Zoológico
  { 
    id: 5, 
    name: 'Mono de Zoologico', 
    price: 300000, 
    category: 'Zoológico', 
    rating: 4.9, 
    image: require('../assets/monkey.jpg'),
    description: 'Figura realista de mono con acabado en resina ideal para parques temáticos.'
  },
  { 
    id: 6, 
    name: 'Oso Polar Peluche', 
    price: 300000, 
    category: 'Zoológico', 
    rating: 4.4, 
    image: require('../assets/polar-bear.jpg'),
    description: 'Escultura acolchada tipo peluche con textura suave y colores realistas.'
  },
  { 
    id: 7, 
    name: 'Pingüino Decorativo', 
    price: 1000000, 
    category: 'Zoológico', 
    rating: 4.6, 
    image: require('../assets/penguin.jpg'),
    description: 'Pingüino de tamaño natural para escenografías frías y zonas temáticas.'
  },
  {
    id: '13',
    name: 'Mono Rey Leon',
    price: 500000,
    category: 'Zoológico',
    rating: 4.9,
    image: require('../assets/producto4.jpg'),
    description: 'Escultura de mono, inspirado en el rey leon.'
  },
];
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#d32f2f',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 12,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 2,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
  },
  favoriteButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
  },
  imageShadowContainer: {
    alignItems: 'center',
    marginTop: 65, // antes 10, ahora más espacio para separar del botón de retroceso
    marginBottom: 10,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 20,
    position: 'relative',
  },
  image: {
    width: SCREEN_WIDTH - 40,
    height: 320,
    borderRadius: 20,
  },
  badge: {
    position: 'absolute',
    top: 18,
    right: 18,
    backgroundColor: '#d32f2f',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    elevation: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  infoContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
    textAlign: 'left',
  },
  priceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
  },
  ratingNumber: {
    color: '#FFD700',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  category: {
    fontSize: 15,
    color: '#d32f2f',
    marginBottom: 0,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 1,
  },
  techCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  techTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#d32f2f',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  techRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  techIcon: {
    marginRight: 8,
  },
  techLabel: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
    marginRight: 4,
    minWidth: 90,
  },
  techValue: {
    fontSize: 15,
    color: '#222',
    fontWeight: '400',
    flexShrink: 1,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#d32f2f',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 2,
  },
  featureList: {
    marginTop: 4,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  quantityLabel: {
    fontSize: 17,
    color: '#222',
    fontWeight: '600',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    padding: 4,
  },
  quantityButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    minWidth: 30,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButton: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d32f2f',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    elevation: 3,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyButton: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    elevation: 3,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#d32f2f',
    marginLeft: 4,
    elevation: 2,
  },
  // Estilos para el modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  modalContinueButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginRight: 5,
    alignItems: 'center',
  },
  modalContinueText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  modalCartButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#d32f2f',
    borderRadius: 10,
    marginLeft: 5,
    alignItems: 'center',
  },
  modalCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilos para recomendaciones
  recommendationsContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  recommendationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 1,
    marginBottom: 6,
  },
  recommendationsHeaderExpanded: {
    backgroundColor: '#ffeaea',
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#d32f2f',
  },
  recommendationsList: {
    flexDirection: 'row',
    gap: 15,
  },
  recommendationCard: {
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recommendationImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  recommendationName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    height: 40,
    marginBottom: 5,
  },
  recommendationPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d32f2f',
  },
});