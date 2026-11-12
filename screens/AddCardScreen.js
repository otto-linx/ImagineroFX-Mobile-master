import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';

export default function AddCardScreen({ navigation }) {
  const { setPaymentMethod } = useContext(CartContext);

  const handleSelectPayment = () => {
    setPaymentMethod('cash');
    Alert.alert(
      'Método seleccionado', 
      'Has elegido pagar contraentrega.',
      [
        { 
          text: 'Continuar', 
          onPress: () => navigation.goBack() 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Método de pago</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Tarjeta principal con imagen destacada */}
        <View style={styles.heroCard}>
          <Image 
            source={require('../assets/images/scenography-cash-delivery.png')} 
            style={styles.heroImage} 
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Escenarios y Decorados</Text>
            <Text style={styles.heroSubtitle}>Elige tu método de pago preferido</Text>
          </View>
        </View>

        {/* Información sobre pago contraentrega */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Pago Contraentrega</Text>
          
          <View style={styles.benefitsContainer}>
            <View style={styles.benefitItem}>
              <View style={styles.benefitIconContainer}>
                <Ionicons name="cash-outline" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.benefitText}>Paga en efectivo cuando recibas tus elementos escenográficos</Text>
            </View>
            
            <View style={styles.benefitItem}>
              <View style={styles.benefitIconContainer}>
                <Ionicons name="time-outline" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.benefitText}>Ideal para producciones urgentes sin trámites previos</Text>
            </View>
            
            <View style={styles.benefitItem}>
              <View style={styles.benefitIconContainer}>
                <Ionicons name="shield-checkmark-outline" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.benefitText}>Revisa tus piezas teatrales o decorados antes de pagar</Text>
            </View>
            
            <View style={styles.benefitItem}>
              <View style={styles.benefitIconContainer}>
                <Ionicons name="card-outline" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.benefitText}>También aceptamos transferencias al recibir grandes órdenes</Text>
            </View>
          </View>
        </View>

        {/* Instrucciones detalladas */}
        <View style={styles.instructionsCard}>
          <Text style={styles.sectionTitle}>¿Cómo funciona?</Text>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepText}>1</Text>
            </View>
            <Text style={styles.stepDescription}>Realiza tu pedido de elementos escenográficos normalmente</Text>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepText}>2</Text>
            </View>
            <Text style={styles.stepDescription}>Nuestro equipo prepara tus piezas teatrales o ambientaciones</Text>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepText}>3</Text>
            </View>
            <Text style={styles.stepDescription}>Recibe y revisa cuidadosamente tu pedido en el lugar de entrega</Text>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepText}>4</Text>
            </View>
            <Text style={styles.stepDescription}>Paga en efectivo o por transferencia al recibir tu pedido</Text>
          </View>
        </View>

        {/* Información adicional */}
        <View style={styles.additionalInfo}>
          <View style={styles.infoItem}>
            <Ionicons name="alert-circle" size={24} color="#FF9800" />
            <Text style={styles.infoItemText}>
              Ideal para grandes producciones donde se requiere inspección previa
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="document-text-outline" size={24} color="#4CAF50" />
            <Text style={styles.infoItemText}>
              No requiere documentación adicional ni verificación previa
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={24} color="#2196F3" />
            <Text style={styles.infoItemText}>
              Disponible para entregas en menos de 24 horas
            </Text>
          </View>
        </View>

        {/* Selección de método */}
        <TouchableOpacity 
          style={styles.selectButton}
          onPress={handleSelectPayment}
        >
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text style={styles.selectButtonText}>Seleccionar Pago Contraentrega</Text>
        </TouchableOpacity>

        {/* Nota importante */}
        <View style={styles.noteContainer}>
          <Ionicons name="information-circle" size={24} color="#FF9800" />
          <Text style={styles.noteText}>
            Al seleccionar esta opción, aceptas pagar el monto total al momento de recibir tu pedido.
            Este método es especialmente recomendado para órdenes superiores a $500.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    paddingBottom: 40,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 15,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  heroCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  benefitsContainer: {
    marginTop: 10,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  benefitIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  benefitText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
    lineHeight: 22,
  },
  instructionsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#d32f2f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 5,
  },
  stepText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepDescription: {
    fontSize: 16,
    color: '#555',
    flex: 1,
    marginBottom: 10,
    lineHeight: 22,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d32f2f',
    borderRadius: 12,
    paddingVertical: 18,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 14,
    color: '#5D4037',
    marginLeft: 10,
    flex: 1,
  },
  additionalInfo: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  infoItemText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#555',
    flex: 1,
    lineHeight: 20,
  }
});