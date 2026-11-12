// screens/SupportScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function getSaludo() {
  const hora = new Date().getHours();
  if (hora >= 6 && hora < 12) return 'Buenos días';
  if (hora >= 12 && hora < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

export default function SupportScreen({ navigation }) {
  const openEmail = () => {
    Linking.openURL('mailto:soporte@tuapp.com?subject=Ayuda%20con%20la%20app');
  };

  const openWhatsApp = () => {
    const saludo = encodeURIComponent(`${getSaludo()}, necesito contactar con soporte`);
    Linking.openURL(`https://wa.me/573137978572?text=${saludo}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Centro de Ayuda</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={{ height: 10 }} />
        <View style={styles.faqItem}>
          <Text style={styles.question}>¿Cómo recupero mi contraseña?</Text>
          <Text style={styles.answer}>
            Ve a la pantalla de inicio de sesión y selecciona "Olvidé mi contraseña". Sigue las instrucciones para restablecerla.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>¿Puedo cambiar mi correo electrónico?</Text>
          <Text style={styles.answer}>
            Sí, ve a Configuración {'>'} Mi Cuenta {'>'} Editar perfil para actualizar tu correo electrónico.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>¿Cómo contacto con soporte?</Text>
          <Text style={styles.answer}>
            Envíanos un correo a soporte@tuapp.com o usa el formulario de contacto en nuestra página web.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>¿Ofrecen reembolsos?</Text>
          <Text style={styles.answer}>
            Sí, ofrecemos garantía de reembolso total durante los primeros 7 días. Contáctanos para más información.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={openEmail}
          accessibilityLabel="Contactar soporte técnico"
          accessibilityHint="Abre la aplicación de correo para contactar con soporte"
          accessibilityRole="button"
        >
          <Text style={styles.contactText}>Contactar Soporte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.contactButton, styles.whatsappButton]}
          onPress={openWhatsApp}
          accessibilityLabel="Contactar soporte por WhatsApp"
          accessibilityHint="Abre WhatsApp para contactar con soporte"
          accessibilityRole="button"
        >
          <Ionicons name="logo-whatsapp" size={20} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.contactText}>Contactar por WhatsApp</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E63946',
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingTop: 36,
  },
  backButton: {
    marginRight: 12
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF5F5'
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#d32f2f',
  },
  faqItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1A1A1A'
  },
  answer: {
    fontSize: 15,
    color: '#5A5A5A',
    lineHeight: 22
  },
  contactButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    marginTop: 10,
  },
  contactText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
