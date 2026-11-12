import React, { useState, useContext, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  FlatList, Dimensions, PixelRatio, Image, ScrollView, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';

// ========== DATOS ========== //
const categories = [
  { id: 'all', name: 'Todos', icon: 'apps' },
  { id: 2, name: 'Utilería', icon: 'construct', value: 'Utilería' },
  { id: 'Navidad', name: 'Navidad', icon: 'gift' },
  { id: 'Zoológico', name: 'Zoológico', icon: 'paw' },
  { id: 'Feria', name: 'Feria', icon: 'balloon' },
  { id: 'Medieval', name: 'Medieval', icon: 'shield' },
];

const products = [
  // Categoría: Feria
  { 
    id: 8, 
    name: 'Avión tematico', 
    price: 2000000, 
    category: 'Feria', 
    rating: 4.3, 
    image: require('../assets/plane.jpg'),
    description: 'Aeronave decorativa ideal para parques temáticos, con colores vibrantes y detalles realistas.'
  },
  { 
    id: 9, 
    name: 'Estatuas Faraon x3', 
    price: 4000000, 
    category: 'Feria', 
    rating: 4.2, 
    image: require('../assets/statues.jpg'),
    description: 'Conjunto de tres figuras egipcias para escenografías históricas y ferias culturales.'
  },

  // Categoría: Navidad
  { 
    id: 1, 
    name: 'Escultura jirafa y cebra de navidad', 
    price: 5000000, 
    category: 'Navidad', 
    rating: 4.8, 
    image: require('../assets/tree.jpg'),
    description: 'Pareja de figuras decorativas navideñas en forma de jirafa y cebra, ideales para exteriores.'
  },
  { 
    id: 2, 
    name: 'Castillo zoologico', 
    price: 40000000, 
    category: 'Navidad', 
    rating: 4.5, 
    image: require('../assets/lights.jpg'),
    description: 'Imponente instalación con luces y figuras de animales, perfecta para eventos navideños.'
  },
  { 
    id: 3, 
    name: 'Oso Polar con Guitarra', 
    price: 1500000, 
    category: 'Navidad', 
    rating: 4.7, 
    image: require('../assets/polar-bear-guitar.jpg'),
    description: 'Figura animada con guitarra, diseñada para ambientar espacios festivos con temática invernal.'
  },
  { 
    id: 4, 
    name: 'Duende Musical', 
    price: 2000000, 
    category: 'Navidad', 
    rating: 4.6, 
    image: require('../assets/santa.jpg'),
    description: 'Escultura navideña interactiva que reproduce villancicos y movimientos sincronizados.'
  },

  // Categoría: Zoológico
  { 
    id: 5, 
    name: 'Mono Rey Leon',
    price: 500000, 
    category: 'Zoológico', 
    rating: 4.9, 
    image: require('../assets/monkey.jpg'),
    description: 'Figura decorativa inspirada en el Rey León, ideal para parques temáticos y zonas infantiles.'
  },
  { 
    id: 6, 
    name: 'Oso Polar Peluche', 
    price: 300000, 
    category: 'Zoológico', 
    rating: 4.4, 
    image: require('../assets/polar-bear.jpg'),
    description: 'Figura suave y acolchada tipo peluche, perfecta para ambientaciones árticas o infantiles.'
  },
  { 
    id: 7, 
    name: 'Pingüino Decorativo', 
    price: 1000000, 
    category: 'Zoológico', 
    rating: 4.6, 
    image: require('../assets/penguin.jpg'),
    description: 'Pingüino de gran tamaño con acabado resistente al agua, ideal para exhibiciones temáticas.'
  },
];

// ========== UTILIDADES ========== //
const { width } = Dimensions.get('window');
const scale = width / 375;
function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// ========== COMPONENTE PRINCIPAL ========== //
export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { cartItems, addToCart } = useContext(CartContext);
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  // Agrega esta constante:
  const carouselImages = [
    require('../assets/banner1.jpg'),
    require('../assets/banner2.jpg'),
    require('../assets/banner3.jpg'),
  ];

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);
  
  const filteredProducts = products.filter((p) => {
    // Si no hay categoría seleccionada o es "Todos", muestra todos
    if (!selectedCategory || selectedCategory.id === 'all') return p.name.toLowerCase().includes(search.toLowerCase());
    // Si hay categoría seleccionada, compara ignorando mayúsculas/minúsculas
    return (
      p.category &&
      p.category.trim().toLowerCase() === (selectedCategory.value || selectedCategory.name).trim().toLowerCase() &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const onChangeSearch = (text) => {
    setSearch(text);
    if (text.length > 0) {
      const matches = products.filter((p) =>
        p.name.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategory(prev => 
      prev?.id === category.id ? null : category
    );
  };

  const handleAddToCart = (product) => {
    addToCart({...product, quantity: 1});
    Alert.alert('Añadido', `${product.name} agregado al carrito`);
  };

  const handleProductPress = (product) => {
    navigation.navigate('Product', { product });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerBackground}>
          <View style={styles.topBar}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>ImagineroFX</Text>
            </View>
            <View style={styles.iconsContainer}>
              <TouchableOpacity 
                style={styles.cartButton} 
                onPress={() => navigation.navigate('Cart')}
                accessibilityLabel="Carrito de compras"
                accessibilityHint={`Ver carrito con ${cartCount} productos`}
                accessibilityRole="button"
              >
                <Ionicons name="cart-outline" size={normalize(22)} color="#d32f2f" />
                {cartCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.searchRow}>
            <Ionicons name="search" size={normalize(20)} color="#d32f2f" style={styles.searchIcon} />
            <TextInput
              placeholder="Buscar productos..."
              placeholderTextColor="#d32f2f"
              value={search}
              onChangeText={onChangeSearch}
              style={styles.searchInput}
              accessibilityLabel="Buscar productos"
            />
          </View>
        </View>
        {suggestions.length > 0 && (
          <View style={styles.suggestionsBar}>
            {suggestions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.suggestionItem}
                onPress={() => {
                  setSearch(item.name);
                  setSuggestions([]);
                  navigation.navigate('Product', { product: item });
                }}
                accessibilityLabel={`Sugerencia: ${item.name}`}
                accessibilityRole="button"
              >
                <Image 
                  source={item.image} 
                  style={styles.suggestionImage} 
                  resizeMode="cover"
                />
                <View style={styles.suggestionTextContainer}>
                  <Text 
                    style={styles.suggestionText} 
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text 
                    style={styles.suggestionPrice}
                  >
                    ${item.price.toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Carrusel de Imágenes */}
        <View style={styles.carouselContainer}>
          <FlatList
            data={[
              require('../assets/banner1.jpg'),
              require('../assets/banner2.jpg'),
              require('../assets/banner3.jpg'),
            ]}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image
                source={item}
                style={styles.carouselImage}
                resizeMode="cover"
              />
            )}
            onViewableItemsChanged={(info) => 
              setCarouselIndex(info.viewableItems[0].index)
            }
          />
          <View style={styles.carouselDots}>
            {[0, 1, 2].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.carouselDot,
                  carouselIndex === index && styles.activeDot
                ]}
              />
            ))}
          </View>
        </View>

        {/* Sección Inspiradora */}
        <View style={styles.inspirationSection}>
          <Image
            source={require('../assets/inspiration.jpg')}
            style={styles.inspirationImage}
            resizeMode="cover"
          />
          <View style={styles.inspirationTextContainer}>
            <Text style={styles.inspirationQuote}>
              "Cada detalle en escena es un hilo que teje la magia del espectáculo."
            </Text>
            <Text style={styles.inspirationDescription}>
              En cada escenario, los props y la escenografía no son solo adornos, sino huellas de un mundo creado para emocionar, transportar y dar vida a historias que quedan en la memoria del espectador.
            </Text>
          </View>
        </View>

        {/* Sección de Categorías */}
        <View style={styles.section}>
          <Text 
            style={styles.sectionTitle}
            accessibilityRole="header"
          >
            Categorías
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(c) => c.id.toString()}
            contentContainerStyle={styles.categoriesList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => toggleCategory(item)}
                style={[
                  styles.categoryButton,
                  selectedCategory?.id === item.id && styles.selectedCategory,
                ]}
                accessibilityLabel={`Categoría ${item.name}`}
                accessibilityRole="button"
              >
                <View style={[
                  styles.categoryIconContainer,
                  selectedCategory?.id === item.id && styles.selectedCategoryContainer
                ]}>
                  <Ionicons 
                    name={item.icon} 
                    size={normalize(28)} 
                    color={selectedCategory?.id === item.id ? '#fff' : '#d32f2f'} 
                  />
                </View>
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Productos Destacados */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text 
              style={styles.sectionTitle}
              accessibilityRole="header"
            >
              Productos Destacados
            </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('AllProducts')}
              accessibilityLabel="Ver todos los productos"
              accessibilityRole="button"
            >
              <Text style={styles.seeAll}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            scrollEnabled={false}
            data={filteredProducts}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.productsContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() => handleProductPress(item)}
                accessibilityLabel={`Producto: ${item.name}`}
                accessibilityRole="button"
              >
                <Image 
                  source={item.image} 
                  style={styles.productImage} 
                  resizeMode="cover"
                />
                <View style={styles.productInfo}>
                  <Text 
                    style={styles.productName} 
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <View style={styles.productRating}>
                    <Ionicons name="star" size={normalize(12)} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  <Text 
                    style={styles.productPrice}
                  >
                    ${item.price.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.addToCartButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                  accessibilityLabel={`Añadir ${item.name} al carrito`}
                  accessibilityRole="button"
                >
                  <Ionicons name="add" size={normalize(18)} color="#fff" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <Text style={styles.empty}>No hay productos disponibles</Text>
            )}
          />
        </View>
      </ScrollView>

      {/* Botón Flotante de Carrito */}
      <TouchableOpacity
        style={styles.floatingCart}
        onPress={() => navigation.navigate('Cart')}
        accessibilityLabel="Ir al carrito"
        accessibilityHint={`Ver carrito con ${cartCount} productos`}
        accessibilityRole="button"
      >
        <Ionicons name="cart" size={24} color="#fff" />
        {cartCount > 0 && (
          <View style={styles.floatingBadge}>
            <Text style={styles.floatingBadgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

// ========== ESTILOS ========== //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    marginTop: normalize(120),
  },
  headerContainer: {
    height: normalize(120),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerBackground: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: normalize(20),
    borderBottomRightRadius: normalize(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    paddingHorizontal: normalize(16),
    paddingTop: normalize(30),
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(15),
  },
  logoContainer: {
    paddingTop: normalize(10),
  },
  logo: {
    fontWeight: 'bold',
    color: '#d32f2f',
    fontFamily: 'sans-serif-medium',
    letterSpacing: 0.5,
    fontSize: normalize(20),
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ffd600',
    borderRadius: normalize(10),
    width: normalize(18),
    height: normalize(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#000',
    fontSize: normalize(10),
    fontWeight: 'bold',
  },
  searchRow: {
    position: 'relative',
    marginBottom: normalize(15),
  },
  searchIcon: {
    position: 'absolute',
    left: normalize(15),
    top: normalize(12),
    zIndex: 1,
  },
  searchInput: {
    height: normalize(45),
    borderRadius: normalize(25),
    backgroundColor: '#f5f5f5',
    paddingLeft: normalize(45),
    fontSize: normalize(14),
    color: '#333',
    fontFamily: 'sans-serif',
  },
  suggestionsBar: {
    backgroundColor: '#fff',
    borderRadius: normalize(10),
    marginTop: normalize(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: normalize(10),
    zIndex: 100,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(8),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionImage: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(8),
    marginRight: normalize(10),
  },
  suggestionTextContainer: {
    flex: 1,
  },
  suggestionText: {
    color: '#333',
    fontSize: normalize(14),
    fontFamily: 'sans-serif',
  },
  suggestionPrice: {
    color: '#d32f2f',
    fontSize: normalize(12),
    fontWeight: 'bold',
    marginTop: normalize(3),
  },
  section: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(20),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(15),
  },
  sectionTitle: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'sans-serif-medium',
  },
  seeAll: {
    color: '#d32f2f',
    fontSize: normalize(14),
    fontWeight: '600',
  },
  categoriesList: {
    paddingBottom: normalize(8),
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: normalize(15),
    width: normalize(80),
  },
  categoryIconContainer: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(30),
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
  },
  selectedCategoryContainer: {
    backgroundColor: '#d32f2f',
    transform: [{ scale: 1.05 }],
  },
  categoryName: {
    fontSize: normalize(12),
    fontWeight: '500',
    color: '#555',
    marginTop: normalize(8),
    textAlign: 'center',
  },
  productsContainer: {
    paddingBottom: normalize(20),
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: normalize(12),
    margin: normalize(6),
    padding: normalize(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: normalize(150),
    borderRadius: normalize(8),
    marginBottom: normalize(10),
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    marginBottom: normalize(10),
  },
  productName: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: '#333',
    marginBottom: normalize(5),
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(5),
  },
  ratingText: {
    fontSize: normalize(12),
    color: '#666',
    marginLeft: normalize(4),
  },
  productPrice: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: normalize(10),
    right: normalize(10),
    backgroundColor: '#d32f2f',
    borderRadius: normalize(20),
    width: normalize(30),
    height: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#777',
    marginTop: normalize(40),
    fontSize: normalize(16),
  },
  carouselContainer: {
    marginTop: normalize(20),
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    borderRadius: normalize(12),
    marginHorizontal: normalize(16),
  },
  carouselImage: {
    width: width,
    height: normalize(200),
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: normalize(10),
    marginBottom: normalize(10),
  },
  carouselDot: {
    width: normalize(12),
    height: normalize(12),
    borderRadius: normalize(6),
    backgroundColor: '#d32f2f',
    opacity: 0.5,
    marginHorizontal: normalize(4),
  },
  activeDot: {
    opacity: 1,
  },
  inspirationSection: {
    flexDirection: 'row',
    marginTop: normalize(20),
    marginHorizontal: normalize(16),
    backgroundColor: '#fff',
    borderRadius: normalize(12),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inspirationImage: {
    width: '40%',
    height: normalize(250),
    backgroundColor: '#f0f0f0',
  },
  inspirationTextContainer: {
    padding: normalize(20),
    width: '60%',
  },
  inspirationQuote: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: normalize(10),
    lineHeight: normalize(24),
  },
  inspirationDescription: {
    fontSize: normalize(14),
    color: '#666',
    lineHeight: normalize(20),
  },
  floatingCart: {
    position: 'absolute',
    bottom: normalize(30),
    right: normalize(20),
    backgroundColor: '#d32f2f',
    borderRadius: normalize(30),
    width: normalize(60),
    height: normalize(60),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  floatingBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ffd600',
    borderRadius: normalize(12),
    width: normalize(20),
    height: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingBadgeText: {
    color: '#000',
    fontSize: normalize(10),
    fontWeight: 'bold',
  },
});