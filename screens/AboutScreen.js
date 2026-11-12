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

export default function AboutScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Acerca de Nosotros</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>ImageneroFX</Text>
          <Text style={styles.text}>
            ImageneroFX es una empresa especializada en escenografía y ambientación. Creamos
            experiencias inmersivas para eventos, producciones audiovisuales y espacios comerciales.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Nuestra misión</Text>
          <Text style={styles.text}>
            Transformar espacios y contar historias a través de diseños escenográficos de alta calidad,
            adaptados a las necesidades de cada cliente.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Nuestra visión</Text>
          <Text style={styles.text}>
            Ser líderes en el mercado de la escenografía, reconocidos por nuestra creatividad,
            innovación y excelencia en el servicio.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Qué hacemos</Text>
          <Text style={styles.text}>
            • Diseño y montaje de escenarios para eventos y producciones.
            {'\n'}• Venta y fabricación de productos escenográficos personalizados.
            {'\n'}• Alquiler de mobiliario y elementos decorativos.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Nuestros valores</Text>
          <Text style={styles.text}>
            • Creatividad{'\n'}
            • Compromiso{'\n'}
            • Calidad{'\n'}
            • Puntualidad
          </Text>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}

// Función para saludo según la hora
function getSaludo() {
  const hora = new Date().getHours();
  if (hora >= 6 && hora < 12) return 'Buenos días';
  if (hora >= 12 && hora < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E63946',
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingTop: 46, // <-- Agrega espacio superior para bajar el título
  },
  backButton: { marginRight: 12 },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  container: {
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  section: { marginBottom: 24 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  contactButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#457B9D',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    marginTop: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
});
