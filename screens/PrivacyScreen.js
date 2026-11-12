import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacyScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacidad & Seguridad</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Versión y fecha de entrada en vigor */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Versión de la política</Text>
          <Text style={styles.text}>v1.0</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Fecha de entrada en vigor</Text>
          <Text style={styles.text}>1 de junio de 2025</Text>
        </View>

        {/* Política de privacidad */}
        <View style={styles.section}>
          <Ionicons
            name="shield-checkmark"
            size={28}
            color="#E63946"
            style={styles.icon}
          />
          <Text style={styles.title}>Política de Privacidad</Text>
          <Text style={styles.text}>
            En ImageneroFX protegemos la privacidad de nuestros clientes. Nuestro
            compromiso es garantizar la confidencialidad y el uso responsable de
            tus datos personales.
          </Text>
        </View>

        {/* Datos recopilados */}
        <View style={styles.section}>
          <Ionicons
            name="server"
            size={28}
            color="#457B9D"
            style={styles.icon}
          />
          <Text style={styles.subtitle}>Datos que recopilamos</Text>
          <Text style={styles.text}>
            - Información de cuenta (correo, nombre completo){'\n'}
            - Datos de uso de la app y compras{'\n'}
            - Información técnica (dispositivo, sistema operativo)
          </Text>
        </View>

        {/* Protección de datos */}
        <View style={styles.section}>
          <Ionicons
            name="lock-closed"
            size={28}
            color="#2A9D8F"
            style={styles.icon}
          />
          <Text style={styles.subtitle}>Protección de datos</Text>
          <Text style={styles.text}>
            Empleamos encriptación SSL/TLS, autenticación segura y estándares de
            seguridad industriales para salvaguardar tu información.
          </Text>
        </View>

        {/* Retención de datos */}
        <View style={styles.section}>
          <Ionicons name="calendar" size={28} color="#8D99AE" style={styles.icon} />
          <Text style={styles.subtitle}>Retención de datos</Text>
          <Text style={styles.text}>
            Conservamos tus datos únicamente durante el tiempo necesario para cumplir
            con los fines para los que fueron recopilados, o según lo exijan las
            leyes aplicables.
          </Text>
        </View>

        {/* Política de cookies */}
        <View style={styles.section}>
          <Ionicons name="fast-food-outline" size={28} color="#D62828" style={styles.icon} />
          <Text style={styles.subtitle}>Política de cookies</Text>
          <Text style={styles.text}>
            Utilizamos cookies propias y de terceros para mejorar la experiencia,
            analizar el uso y ofrecer contenido personalizado. Puedes gestionar o
            desactivar las cookies en la configuración de tu dispositivo.
          </Text>
        </View>

        {/* Terceros y enlaces externos */}
        <View style={styles.section}>
          <Ionicons name="link" size={28} color="#4A4E69" style={styles.icon} />
          <Text style={styles.subtitle}>Terceros y enlaces externos</Text>
          <Text style={styles.text}>
            Colaboramos con proveedores como Firebase, Google Analytics y AWS. Para
            más información sobre sus políticas de privacidad, consulta sus sitios
            oficiales.
          </Text>
        </View>

        {/* Derechos del usuario */}
        <View style={styles.section}>
          <Ionicons name="hand-left" size={28} color="#F4A261" style={styles.icon} />
          <Text style={styles.subtitle}>Tus derechos</Text>
          <Text style={styles.text}>
            Tienes derecho a acceder, rectificar o eliminar tus datos en cualquier
            momento. Para ejercer estos derechos, contáctanos.
          </Text>
        </View>

        {/* Contacto por correo */}
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => Linking.openURL('mailto:imagenerofx@gmail.com')}
        >
          <Text style={styles.contactText}>Contactar a soporte</Text>
        </TouchableOpacity>

        {/* Contacto por WhatsApp */}
        <TouchableOpacity
          style={[styles.contactButton, styles.whatsappButton]}
          onPress={() => {
            const saludo = encodeURIComponent(`${getSaludo()}, necesito contactar a soporte`);
            Linking.openURL(`https://wa.me/573137978572?text=${saludo}`);
          }}
        >
          <Ionicons name="logo-whatsapp" size={20} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.contactText}>Contactar a soporte por WhatsApp</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Función para obtener el saludo según la hora
function getSaludo() {
  const hora = new Date().getHours();
  if (hora >= 6 && hora < 12) return 'Buenos días';
  if (hora >= 12 && hora < 19) return 'Buenas tardes';
  return 'Buenas noches';
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
    paddingVertical: 18,
    paddingHorizontal: 16,
    paddingTop: 46
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
    padding: 20,
    backgroundColor: '#FAFAFA'
  },
  section: {
    marginBottom: 24
  },
  icon: {
    marginBottom: 8
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555'
  },
  contactButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#457B9D',
    paddingVertical: 12,
    borderRadius: 8
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    marginTop: 10
  },
  contactText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600'
  }
});
