import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


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

const categories = [
  { id: 'all', name: 'Todos', icon: 'apps', value: 'all' },
  { id: 'Utilería', name: 'Utilería', icon: 'construct', value: 'Utilería' },
  { id: 'Navidad', name: 'Navidad', icon: 'gift', value: 'Navidad' },
  { id: 'Zoológico', name: 'Zoológico', icon: 'paw', value: 'Zoológico' },
  { id: 'Feria', name: 'Feria', icon: 'balloon', value: 'Feria' },
  { id: 'Medieval', name: 'Medieval', icon: 'shield', value: 'Medieval' },
];

export default function AllProductsScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [materialFilter, setMaterialFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState([0, 50000000]); // Cambio aquí

  const allMaterials = [...new Set(products.map(p => p.material))];
  const allColors = [...new Set(products.flatMap(p => (p.colors ?? '').split(', ')))];

  const handleSearch = (text) => {
    setSearch(text);
    filterProducts(text, selectedCategory, materialFilter, colorFilter, priceFilter);
  };

  const handleCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    filterProducts(search, categoryId, materialFilter, colorFilter, priceFilter);
  };

  const applyFilters = () => {
    filterProducts(search, selectedCategory, materialFilter, colorFilter, priceFilter);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setMaterialFilter('');
    setColorFilter('');
    setPriceFilter([0, 50000000]);
    setFilteredProducts(products);
    setShowFilters(false);
  };

  const filterProducts = (
    searchText = '',
    categoryId = 'all',
    material = '',
    color = '',
    price = [0, 5000]
  ) => {
    let result = [...products];

    // Filtrar por categoría
    if (categoryId !== 'all') {
      const selectedCat = categories.find(cat => cat.id === categoryId);
      if (selectedCat) {
        result = result.filter(
          p =>
            p.category &&
            p.category.trim().toLowerCase() === selectedCat.value.trim().toLowerCase()
        );
      }
    }

    // Filtrar por búsqueda
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(searchLower) ||
          (p.category && p.category.toLowerCase().includes(searchLower))
      );
    }

    // Filtrar por material
    if (material) {
      result = result.filter(
        p => p.material && p.material.toLowerCase().includes(material.toLowerCase())
      );
    }

    // Filtrar por color
    if (color) {
      result = result.filter(
        p => p.colors && p.colors.toLowerCase().includes(color.toLowerCase())
      );
    }

    // Filtrar por precio
    result = result.filter(p => {
      const productPrice = parseFloat(p.price);
      return productPrice >= price[0] && productPrice <= price[1];
    });

    setFilteredProducts(result);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('Product', { product: item })}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={item.image}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <View style={styles.infoFooter}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.productPrice}>
            ${item.price !== null && item.price !== undefined ? item.price.toLocaleString() : '0'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => {
    const isSelected = selectedCategory === item.id;
    return (
      <TouchableOpacity
        style={[
          styles.categoryButton,
          isSelected ? styles.categorySelected : styles.categoryUnselected
        ]}
        onPress={() => handleCategory(item.id)}
        activeOpacity={0.85}
      >
        <View style={[
          styles.categoryIconContainer,
          isSelected && styles.categoryIconSelected
        ]}>
          <Ionicons 
            name={item.icon} 
            size={20} 
            color={isSelected ? "#fff" : "#d32f2f"} 
          />
        </View>
        <Text style={isSelected ? styles.categoryTextSelected : styles.categoryTextUnselected}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Botón de retroceso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#d32f2f" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nuestra Colección</Text>
      </View>
      
      {/* Búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#d32f2f" style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar elementos escénicos..."
          placeholderTextColor="#d32f2f"
          value={search}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>
      
      {/* Categorías */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        >
          {categories.map(category => (
            <View key={category.id}>
              {renderCategory({ item: category })}
            </View>
          ))}
        </ScrollView>
      </View>
      
      {/* Resultados */}
      <View style={styles.resultsContainer}>
        <View style={styles.resultsHeader}>
          <Text style={styles.sectionTitle}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} encontrados
          </Text>
          {/* <TouchableOpacity style={styles.sortButton}>
            <Ionicons name="swap-vertical" size={16} color="#d32f2f" />
            <Text style={styles.sortText}>Ordenar</Text>
          </TouchableOpacity> */}
        </View>
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.productsContainer}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Ionicons name="sad-outline" size={60} color="#d1d5db" />
              <Text style={styles.emptyTitle}>No se encontraron productos</Text>
              <Text style={styles.emptyText}>Intenta con otros filtros o términos</Text>
              <TouchableOpacity 
                style={styles.resetFiltersButton}
                onPress={resetFilters}
              >
                <Text style={styles.resetFiltersText}>Limpiar filtros</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 28,
    marginBottom: 20,
    paddingHorizontal: 20,
    height: 54,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 8,
    marginBottom: 8,
    gap: 8, // Espacio entre categorías
  },
  categoryButton: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 12, // Más espacio entre botones
    width: 88,
    height: 78,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#ffcdd2',
  },
  categorySelected: {
    backgroundColor: '#d32f2f',
    borderColor: '#d32f2f',
  },
  categoryUnselected: {
    backgroundColor: '#fff',
    borderColor: '#ffcdd2',
  },
  categoryIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: '#ffcdd2',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryIconSelected: {
    backgroundColor: '#b71c1c',
  },
  categoryTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 2,
  },
  categoryTextUnselected: {
    color: '#d32f2f',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 2,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  sortText: {
    color: '#d32f2f',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    padding: 12,
    paddingBottom: 40,
  },
  productName: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  productCategory: {
    color: '#d32f2f',
    fontSize: 12,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  infoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#d32f2f',
    fontWeight: '600',
  },
  productPrice: {
    fontWeight: '700',
    fontSize: 16,
    color: '#d32f2f',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 16,
  },
  resetFiltersButton: {
    backgroundColor: '#ffcdd2',
    padding: 12,
    borderRadius: 8,
  },
  resetFiltersText: {
    color: '#d32f2f',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 16,
  },
  productsContainer: {
    paddingBottom: 100,
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
});

