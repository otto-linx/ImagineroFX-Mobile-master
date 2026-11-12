import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../supabaseClient';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';

export default function LoginScreen({ navigation, route }) {
  const { fromPayment } = route?.params || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (fromPayment) {
      Toast.show({
        type: 'info',
        text1: 'Necesitas iniciar sesión',
        text2: 'Primero debes iniciar sesión o registrarte para finalizar tu compra',
        visibilityTime: 3000,
      });
    }
  }, [fromPayment]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Campos requeridos',
        text2: 'Por favor completa todos los campos.',
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        Toast.show({
          type: 'error',
          text1: 'Error de acceso',
          text2: error.message,
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Bienvenido',
          text2: 'Inicio de sesión exitoso.',
          visibilityTime: 2000,
          onHide: () => {
            if (fromPayment) {
              navigation.goBack();
            } else {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main', params: { screen: 'Home' } }]
              });
            }
          },
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error inesperado',
        text2: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient colors={['#f8f9fa', '#e0e0e0']} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
            <Text style={styles.title}>Bienvenido de vuelta</Text>
            <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#999" style={styles.icon} />
              <TextInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
              <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry={!showPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerButtonText}>Regístrate</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
      <Toast />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, paddingHorizontal: 16 },
  scrollContent: {
    paddingTop: 150,
    paddingBottom: 60,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 5,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 25,
    elevation: 4,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#111',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  icon: { marginRight: 8 },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#000',
    marginBottom: 24,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: 'red',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    borderColor: 'red',
    borderWidth: 1.5,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },
});