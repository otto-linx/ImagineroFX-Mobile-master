import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [fadeAnim] = React.useState(new Animated.Value(1));

  const total = cartItems
    .reduce((sum, item) => sum + 
      (Number(item.price) || 0) * 
      (Number(item.quantity || 1)), 0);

  const handleRemove = (id) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      removeFromCart(id);
      fadeAnim.setValue(1);
    });
  };

  const renderItem = ({ item }) => (
    <Animated.View 
      style={[
        styles.item,
        { opacity: fadeAnim }
      ]}
    >
      <View style={styles.itemImage}>
        {item.image ? (
          <ImageBackground 
            source={item.image} 
            style={styles.productImage}
            imageStyle={{ borderRadius: 8 }}
          >
            <View style={styles.imageOverlay} />
          </ImageBackground>
        ) : (
          <View style={[styles.productImage, styles.imagePlaceholder]}>
            <MaterialCommunityIcons name="theater" size={28} color="#fff" />
          </View>
        )}
      </View>
      
      <View style={styles.info}>
        <Text style={styles.name}>{item.name || 'Producto escenográfico'}</Text>
        <Text style={styles.category}>Escenografía / {item.category || 'General'}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            ${(Number(item.price).toFixed(2))}
          </Text>
          
          <View style={styles.quantityControls}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, 'decrease')}
            >
              <MaterialCommunityIcons name="minus" size={14} color="#fff" />
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{item.quantity || 1}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, 'increase')}
            >
              <MaterialCommunityIcons name="plus" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemove(item.id)}
      >
        <MaterialCommunityIcons name="close" size={18} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Header con efecto de telón */}
      <ImageBackground 
        source={require('../assets/curtain_pattern.jpg')} 
        style={styles.header}
        imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
      >
        <View style={styles.headerOverlay} />
        <Text style={styles.title}>🛒 Carrito de Compras</Text>
        <Text style={styles.subtitle}>
          {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en tu carrito
        </Text>
      </ImageBackground>

      <View style={styles.content}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <MaterialCommunityIcons name="theater" size={60} color="#d32f2f" />
            </View>
            <Text style={styles.emptyTitle}>¡Tu carrito está vacío!</Text>
            <Text style={styles.emptyText}>Explora nuestro catálogo de productos escenográficos</Text>
            <TouchableOpacity 
              style={styles.continueShopping}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.continueText}>Ver productos</Text>
              <MaterialCommunityIcons name="arrow-right" size={18} color="#d32f2f" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
              ListHeaderComponent={
                <Text style={styles.sectionTitle}>Tus productos escenográficos</Text>
              }
            />

            <View style={styles.summary}>
              <View style={styles.totalContainer}>
                <View>
                  <Text style={styles.totalLabel}>Subtotal</Text>
                  <Text style={styles.shippingText}>Envío calculado al finalizar</Text>
                </View>
                <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
              </View>

              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => navigation.navigate('Checkout', { total })}
              >
                <MaterialCommunityIcons name="credit-card-check" size={22} color="#fff" />
                <Text style={styles.checkoutText}>Finalizar compra</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.continueText}>Seguir comprando</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
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
    fontSize: 28,
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
    marginTop: 8,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    marginTop: 5,
    paddingLeft: 5,
  },
  listContainer: {
    paddingBottom: 120,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#d32f2f',
  },
  itemImage: {
    marginRight: 15,
  },
  productImage: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(211, 47, 47, 0.15)',
    borderRadius: 8,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
  },
  category: {
    fontSize: 13,
    color: '#d32f2f',
    marginBottom: 8,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 2,
  },
  quantityButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#d32f2f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 8,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  summary: {
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
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  shippingText: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: '#d32f2f',
  },
  checkoutButton: {
    padding: 16,
    backgroundColor: '#d32f2f',
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginBottom: 12,
  },
  checkoutText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    marginLeft: 10,
  },
  continueButton: {
    padding: 12,
    borderWidth: 2,
    borderColor: '#d32f2f',
    borderRadius: 10,
    alignItems: 'center',
  },
  continueText: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyIcon: {
    backgroundColor: '#fbe9e7',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#d32f2f',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  continueShopping: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 2,
    borderColor: '#d32f2f',
    borderRadius: 30,
  },
});