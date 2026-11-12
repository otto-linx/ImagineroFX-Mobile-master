import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Linking,
  Animated,
  Platform,
  ImageBackground,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ForgotPasswordScreen({ navigation }) {
  const [bounceValue] = React.useState(new Animated.Value(1));
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const [slideAnim] = React.useState(new Animated.Value(30));

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceValue, {
            toValue: 1.05,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(bounceValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start()
    ]).start();
  }, []);

  const openWhatsApp = () => {
    const phoneNumber = '573137978572';
    const message = 'Hola ImagineroFX, necesito ayuda para recuperar mi contraseña. ¿Podrían indicarme los pasos a seguir? ¡Gracias!';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  return (
    <ImageBackground 
      source={require('../assets/theater_background.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Capa de superposición roja */}
      <LinearGradient
        colors={['rgba(211, 47, 47, 0.9)', 'rgba(178, 8, 8, 0.95)']}
        style={styles.overlay}
      />
      
      {/* Botón de retroceso */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Contenido principal con animación */}
      <Animated.View style={[
        styles.content,
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }] 
        }
      ]}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>Recupera tu Acceso</Text>
          <View style={styles.divider} />
        </View>
        
        {/* Icono animado */}
        <Animated.View style={[
          styles.iconContainer,
          { transform: [{ scale: bounceValue }] }
        ]}>
          <Ionicons name="key" size={40} color="#fff" />
        </Animated.View>

        {/* Descripción */}
        <Text style={styles.description}>
          ¿Problemas para acceder a tu cuenta? Estamos aquí para ayudarte.
          Contáctanos por WhatsApp y nuestro equipo de soporte te guiará.
        </Text>

        {/* Botón WhatsApp */}
        <Animated.View style={{
          transform: [{ scale: bounceValue }]
        }}>
          <TouchableOpacity 
            style={styles.whatsappButton} 
            onPress={openWhatsApp}
            activeOpacity={0.8}
          >
            <Ionicons name="logo-whatsapp" size={28} color="#fff" />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.whatsappText}>Contactar con Soporte</Text>
              <Text style={styles.whatsappSubtext}>Respuesta inmediata</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Información adicional */}
        <View style={styles.infoContainer}>
          <Ionicons name="time-outline" size={18} color="#fff" />
          <Text style={styles.infoText}>Horario de atención: Las 24 horas!</Text>
        </View>
        <View style={styles.infoContainer}>
          <Ionicons name="calendar-outline" size={18} color="#fff" />
        </View>

        {/* Enlace de regreso */}
        <TouchableOpacity 
          style={styles.linkContainer} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="log-in-outline" size={20} color="#ffd54f" />
          <Text style={styles.linkText}>Volver al inicio de sesión</Text>
        </TouchableOpacity>
      </Animated.View>
      
      {/* Pie de página */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ImagineroFX - Soluciones Escenográficas</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    width: '100%',
    maxWidth: 500,
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.5,
  },
  divider: {
    height: 3,
    width: 80,
    backgroundColor: '#ffd54f',
    borderRadius: 2,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#ffd54f',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  whatsappButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(37, 211, 102, 0.9)',
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    width: width * 0.8,
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonTextContainer: {
    marginLeft: 15,
  },
  whatsappText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  whatsappSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    marginTop: 3,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 10,
  },
  linkText: {
    color: '#ffd54f',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
});