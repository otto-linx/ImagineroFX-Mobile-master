import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Animated,
  Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';

const { width } = Dimensions.get('window');

export default function CheckoutScreen({ navigation }) {
  const { cartItems } = useContext(CartContext);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [scaleAnim] = useState(new Animated.Value(1));

  const toggleProductSelection = (product) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
    
    setSelectedProducts((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const handleProceedToPayment = () => {
    if (selectedProducts.length === 0) {
      Alert.alert('Selección requerida', 'Por favor selecciona al menos un producto para continuar.');
      return;
    }
    navigation.navigate('Payment', { selectedProducts });
  };

  const total = selectedProducts.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <View style={styles.container}>
      {/* Encabezado con efecto de telón */}
      <View style={styles.header}>
        <View style={styles.headerOverlay} />
        <Text style={styles.title}>Finalización de Compra</Text>
        <Text style={styles.subtitle}>Selecciona los productos a pagar</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="theater" size={60} color="#d32f2f" />
            <Text style={styles.emptyTitle}>Carrito Vacío</Text>
            <Text style={styles.emptyText}>No hay productos en tu carrito</Text>
            <TouchableOpacity 
              style={styles.shoppingButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.shoppingText}>Volver a productos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Tus Productos Escenográficos</Text>
            
            {cartItems.map((product) => {
              const isSelected = selectedProducts.some((p) => p.id === product.id);
              return (
                <Animated.View
                  key={product.id}
                  style={[
                    styles.productContainer,
                    isSelected && styles.selectedProduct,
                    { transform: [{ scale: scaleAnim }] }
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => toggleProductSelection(product)}
                    activeOpacity={0.8}
                    style={styles.productTouchable}
                  >
                    <View style={styles.productContent}>
                      <View style={styles.checkboxContainer}>
                        <View style={[
                          styles.checkbox,
                          isSelected && styles.checkboxSelected
                        ]}>
                          {isSelected && (
                            <MaterialCommunityIcons 
                              name="check" 
                              size={18} 
                              color="#fff" 
                            />
                          )}
                        </View>
                      </View>
                      
                      {product.image ? (
                        <Image
                          source={
                            typeof product.image === 'string'
                              ? { uri: product.image }
                              : product.image
                          }
                          style={styles.productImage}
                        />
                      ) : (
                        <View style={styles.imagePlaceholder}>
                          <MaterialCommunityIcons 
                            name="theater" 
                            size={24} 
                            color="#fff" 
                          />
                        </View>
                      )}
                      
                      <View style={styles.textContainer}>
                        <Text 
                          style={styles.productText}
                          numberOfLines={1}
                        >
                          {product.name || 'Producto escenográfico'}
                        </Text>
                        <Text style={styles.categoryText}>
                          {product.category || 'Escenografía'}
                        </Text>
                      </View>
                      
                      <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>
                          ${Number(product.price).toFixed(2)}
                        </Text>
                        <Text style={styles.quantityText}>
                          x {product.quantity || 1}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </>
        )}
      </ScrollView>

      {/* Resumen de compra */}
      <View style={styles.summaryContainer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total seleccionado:</Text>
          <Text style={styles.totalAmount}>
            ${total.toFixed(2)}
          </Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.payButton,
            selectedProducts.length === 0 && styles.disabledButton,
          ]}
          onPress={handleProceedToPayment}
          disabled={selectedProducts.length === 0}
        >
          <MaterialCommunityIcons 
            name="credit-card-check" 
            size={24} 
            color="#fff" 
          />
          <Text style={styles.payButtonText}>Continuar al pago</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Seguir comprando</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#d32f2f',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(178, 8, 8, 0.85)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffd54f',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '500',
  },
  contentContainer: {
    padding: 15,
    paddingBottom: 150,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
    paddingLeft: 5,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#d32f2f',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  shoppingButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#d32f2f',
    borderRadius: 25,
  },
  shoppingText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  selectedProduct: {
    borderLeftWidth: 5,
    borderLeftColor: '#d32f2f',
    backgroundColor: '#fbe9e7',
  },
  productTouchable: {
    padding: 15,
  },
  productContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d32f2f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#d32f2f',
    borderColor: '#d32f2f',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#222',
    marginBottom: 3,
  },
  categoryText: {
    fontSize: 13,
    color: '#d32f2f',
    fontWeight: '500',
  },
  priceContainer: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 3,
  },
  quantityText: {
    fontSize: 14,
    color: '#666',
  },
  summaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: '#d32f2f',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#d32f2f',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  disabledButton: {
    backgroundColor: '#bdbdbd',
    shadowColor: '#9e9e9e',
  },
  payButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    marginLeft: 10,
  },
  backButton: {
    padding: 12,
    borderWidth: 2,
    borderColor: '#d32f2f',
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: '600',
  },
});