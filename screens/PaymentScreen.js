import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ImageBackground,
  Linking, // Importa Linking para WhatsApp
  ActivityIndicator 
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';
import { useRoute, useNavigation } from '@react-navigation/native'; // Solo usa useNavigation
import { supabase } from '../supabaseClient';
import Toast from 'react-native-toast-message';

export default function PaymentScreen({ navigation }) { // Recibe navigation como prop
  const route = useRoute();
  const { selectedProducts = [] } = route.params || {};
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState('domicilio');
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    notas: ''
  });

  // Usa navigation recibido como prop
  const navigationHook = useNavigation(); // Cambia el nombre para evitar conflicto

  // Verificar autenticación
  useEffect(() => {
    const checkAuth = async () => {
      const session = supabase.auth.session();
      setIsAuthenticated(!!session);
      if (!session) {
        navigation.replace('Login', { fromPayment: true }); // Usa navigation recibido
      }
    };

    checkAuth();

    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (!session) {
        navigation.replace('Login', { fromPayment: true });
      }
    });

    return () => {
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe();
      }
    };
  }, [navigation]);

  // Muestra carga mientras verifica sesión
  if (isAuthenticated === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d32f2f" />
        <Text style={styles.loadingText}>Verificando sesión...</Text>
      </View>
    );
  }

  // Si no está autenticado, ya fue redirigido
  if (!isAuthenticated) return null;

  const total = selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formattedTotal = total.toLocaleString('es-CO', { 
    style: 'currency', 
    currency: 'COP', 
    minimumFractionDigits: 0 
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    if (!formData.nombre.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa tu nombre completo');
      return false;
    }
    if (!formData.telefono.trim() || formData.telefono.length < 7) {
      Alert.alert('Teléfono inválido', 'Por favor ingresa un número de teléfono válido');
      return false;
    }
    if (deliveryOption === 'domicilio' && !formData.direccion.trim()) {
      Alert.alert('Dirección requerida', 'Por favor ingresa tu dirección para la entrega');
      return false;
    }
    if (deliveryOption === 'domicilio' && !formData.ciudad.trim()) {
      Alert.alert('Ciudad requerida', 'Por favor ingresa tu ciudad');
      return false;
    }
    return true;
  };

  const sendWhatsAppMessage = () => {
    if (!validateForm()) return;

    const phoneNumber = '573137978572';

    let message = `Hola ImagineroFX, soy ${formData.nombre}. `;
    if (deliveryOption === 'domicilio') {
      message += 'Quiero hacer un pedido a domicilio con pago contra entrega.\n\n';
    } else {
      message += 'Quiero hacer un pedido de pago contra entrega, lo recogeré en la tienda.\n\n';
    }

    message += `Productos solicitados:\n`;
    selectedProducts.forEach(item => {
      message += `- ${item.name} x${item.quantity}: ${(item.price * item.quantity).toLocaleString('es-CO', { 
        style: 'currency', 
        currency: 'COP', 
        minimumFractionDigits: 0 
      })}\n`;
    });

    message += `\nTotal: ${formattedTotal}\n`;
    message += `Datos de contacto:\n`;
    message += `Teléfono: ${formData.telefono}\n`;

    if (deliveryOption === 'domicilio') {
      message += `Dirección: ${formData.direccion}, ${formData.ciudad}\n`;
    }

    if (formData.notas) {
      message += `\nNotas adicionales:\n${formData.notas}`;
    }

    message += `\nPor favor confirmen mi pedido. ¡Gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'No se pudo abrir WhatsApp. Asegúrate de tener la aplicación instalada.');
    });
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <ImageBackground 
        source={require('../assets/red_curtain_pattern.jpg')}
        style={styles.header}
        imageStyle={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}
      >
        <View style={styles.headerOverlay} />
        <Text style={styles.headerTitle}>Finalización de Pedido</Text>
        <Text style={styles.headerSubtitle}>Pago contra entrega</Text>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Sección de Información de Contacto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de Contacto</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="account" size={24} color="#d32f2f" style={styles.inputIcon} /> 
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#999"
              value={formData.nombre}
              onChangeText={(text) => handleInputChange('nombre', text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="phone" size={24} color="#d32f2f" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={formData.telefono}
              onChangeText={(text) => handleInputChange('telefono', text)}
            />
          </View>
        </View>

        {/* Sección de Método de Entrega */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de Entrega</Text>
          <TouchableOpacity 
            style={[styles.deliveryOption, deliveryOption === 'domicilio' && styles.selectedOption]}
            onPress={() => setDeliveryOption('domicilio')}
          >
            <MaterialCommunityIcons name="truck-delivery" size={32} color={deliveryOption === 'domicilio' ? '#d32f2f' : '#666'} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Entrega a domicilio</Text>
              <Text style={styles.optionDescription}>Recibe tus productos en la comodidad de tu hogar o lugar de trabajo</Text>
            </View>
            {deliveryOption === 'domicilio' && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.deliveryOption, deliveryOption === 'tienda' && styles.selectedOption]}
            onPress={() => setDeliveryOption('tienda')}
          >
            <MaterialCommunityIcons name="store" size={32} color={deliveryOption === 'tienda' ? '#d32f2f' : '#666'} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Recoger en tienda</Text>
              <Text style={styles.optionDescription}>Recoge tus productos en nuestro almacén principal</Text>
            </View>
            {deliveryOption === 'tienda' && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
          </TouchableOpacity>

          {/* Campos de entrega a domicilio */}
          {deliveryOption === 'domicilio' && (
            <>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="home-map-marker" size={24} color="#d32f2f" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Dirección completa"
                  placeholderTextColor="#999"
                  value={formData.direccion}
                  onChangeText={(text) => handleInputChange('direccion', text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="city" size={24} color="#d32f2f" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Ciudad"
                  placeholderTextColor="#999"
                  value={formData.ciudad}
                  onChangeText={(text) => handleInputChange('ciudad', text)}
                />
              </View>
            </>
          )}
        </View>

        {/* Detalles Adicionales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles Adicionales</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="note-text" size={24} color="#d32f2f" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Notas adicionales (instrucciones de entrega, horarios preferidos, etc.)"
              placeholderTextColor="#999"
              multiline
              value={formData.notas}
              onChangeText={(text) => handleInputChange('notas', text)}
            />
          </View>
        </View>

        {/* Resumen del Pedido */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen de Pedido</Text>
          <View style={styles.productsContainer}>
            {selectedProducts.map((product, index) => (
              <View key={index} style={styles.productItem}>
                <Text style={styles.productName}>{product.name} x{product.quantity}</Text>
                <Text style={styles.productPrice}>
                  {(product.price * product.quantity).toLocaleString('es-CO', { 
                    style: 'currency', 
                    currency: 'COP', 
                    minimumFractionDigits: 0 
                  })}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total a pagar:</Text>
            <Text style={styles.totalAmount}>{formattedTotal}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.whatsappButton}
          onPress={sendWhatsAppMessage}
        >
          <Ionicons name="logo-whatsapp" size={28} color="#fff" />
          <Text style={styles.whatsappText}>Enviar pedido por WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Volver al carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos (sin cambios)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: 180,
    justifyContent: 'center',
    paddingTop: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(178, 8, 8, 0.85)',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffd54f',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    paddingBottom: 120,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedOption: {
    borderColor: '#d32f2f',
    backgroundColor: '#fbe9e7',
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  optionTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  optionDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
  productsContainer: {
    marginBottom: 15,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productName: {
    fontSize: 15,
    color: '#555',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
  },
  totalAmount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#d32f2f',
  },
  footer: {
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
  whatsappButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#25D366',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  whatsappText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
  backButton: {
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  backText: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: '600'
  }
});