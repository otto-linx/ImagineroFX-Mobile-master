import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import { supabase } from '../supabaseClient';

// Validación de formulario con Yup
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('El nombre es requerido'),
  email: Yup.string()
    .email('Correo inválido')
    .required('El correo es requerido'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Debe ser un número válido')
    .required('Teléfono requerido'),
  password: Yup.string()
    .min(8, 'Mínimo 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener una mayúscula')
    .matches(/[a-z]/, 'Debe contener una minúscula')
    .matches(/[0-9]/, 'Debe contener un número')
    .matches(/[^A-Za-z0-9]/, 'Debe contener un carácter especial')
    .required('Contraseña requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
});

export default function RegisterScreen({ navigation }) {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Evaluar fortaleza de contraseña
  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setPasswordStrength(score);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return '#d32f2f'; // Rojo
    if (passwordStrength === 3) return '#ffa726'; // Naranja
    return '#66bb6a'; // Verde
  };

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      // 1. Registrar usuario
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      
      if (signUpError) throw signUpError;
      
      const userId = data.user.id;
      
      // 2. Guardar datos adicionales en la tabla de usuarios
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            id: userId,
            email: values.email,
            full_name: values.fullName,
            phone: values.phone,
            created_at: new Date().toISOString(),
          },
        ]);
      
      if (insertError) throw insertError;
      
      // 3. Iniciar sesión automáticamente
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (signInError) throw signInError;
      
      // 4. Mostrar mensaje de éxito y redirigir
      Toast.show({
        type: 'success',
        text1: 'Registro exitoso',
        text2: 'Bienvenido a ImagineroFX',
        visibilityTime: 3000,
        onHide: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main', params: { screen: 'Home' } }],
          });
        },
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error al registrarse',
        text2: error.message || 'Inténtalo más tarde',
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Botón de retroceder */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="#d32f2f" />
        </TouchableOpacity>

        {/* Espaciado para centrar el título */}
        <View style={{ height: 30 }} />

        <Text style={styles.title}>Crea tu cuenta</Text>
        <Text style={styles.subtitle}>Ingresa tus datos para registrarte</Text>

        <Formik
          initialValues={{
            fullName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              {/* Nombre completo */}
              <View style={styles.inputGroup}>
                <Ionicons name="person-outline" size={20} color="#999" style={styles.icon} />
                <TextInput
                  placeholder="Nombre completo *"
                  placeholderTextColor="#999"
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  style={styles.input}
                  autoCapitalize="words"
                  autoCorrect={false}
                  keyboardType="default"
                />
              </View>
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}

              {/* Correo electrónico */}
              <View style={styles.inputGroup}>
                <Ionicons name="mail-outline" size={20} color="#999" style={styles.icon} />
                <TextInput
                  placeholder="Correo electrónico *"
                  placeholderTextColor="#999"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              {/* Teléfono */}
              <View style={styles.inputGroup}>
                <Ionicons name="call-outline" size={20} color="#999" style={styles.icon} />
                <TextInput
                  placeholder="Teléfono (ej: 3137978572) *"
                  placeholderTextColor="#999"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  style={styles.input}
                  keyboardType="phone-pad"
                />
              </View>
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}

              {/* Contraseña */}
              <View style={styles.inputGroup}>
                <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
                <TextInput
                  placeholder="Contraseña *"
                  placeholderTextColor="#999"
                  value={values.password}
                  onChangeText={(text) => {
                    handleChange('password')(text);
                    calculatePasswordStrength(text);
                  }}
                  onBlur={handleBlur('password')}
                  style={styles.input}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                  accessibilityLabel={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              {/* Barra de fortaleza de contraseña */}
              <View style={styles.strengthContainer}>
                <View style={styles.strengthBarContainer}>
                  <View
                    style={[
                      styles.strengthBar,
                      {
                        width: `${(passwordStrength / 5) * 100}%`,
                        backgroundColor: getStrengthColor(),
                      },
                    ]}
                  />
                </View>
                <Text style={styles.strengthLabel}>
                  {passwordStrength <= 2 && 'Contraseña débil'}
                  {passwordStrength === 3 && 'Contraseña media'}
                  {passwordStrength >= 4 && 'Contraseña fuerte'}
                </Text>
              </View>

              {/* Confirmar contraseña */}
              <View style={styles.inputGroup}>
                <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
                <TextInput
                  placeholder="Confirmar contraseña *"
                  placeholderTextColor="#999"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  style={styles.input}
                  secureTextEntry={!showConfirm}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirm(!showConfirm)}
                  style={styles.eyeIcon}
                  accessibilityLabel={showConfirm ? "Ocultar confirmación" : "Mostrar confirmación"}
                >
                  <Ionicons
                    name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              {/* Botón de registro */}
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleSubmit}
                disabled={loading}
                activeOpacity={0.8}
                accessibilityLabel="Registrarse"
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.registerButtonText}>Registrarse</Text>
                )}
              </TouchableOpacity>

              {/* Requisitos de contraseña */}
              <View style={styles.requirementsContainer}>
                <Text style={styles.requirementText}>La contraseña debe contener:</Text>
                <View style={styles.requirementRow}>
                  <Ionicons 
                    name={values.password.length >= 8 ? "checkmark-circle" : "ellipse-outline"} 
                    size={16} 
                    color={values.password.length >= 8 ? "#4CAF50" : "#999"} 
                    style={styles.requirementIcon} 
                  />
                  <Text style={styles.requirementItem}>Mínimo 8 caracteres</Text>
                </View>
                <View style={styles.requirementRow}>
                  <Ionicons 
                    name={/[A-Z]/.test(values.password) ? "checkmark-circle" : "ellipse-outline"} 
                    size={16} 
                    color={/[A-Z]/.test(values.password) ? "#4CAF50" : "#999"} 
                    style={styles.requirementIcon} 
                  />
                  <Text style={styles.requirementItem}>Una letra mayúscula</Text>
                </View>
                <View style={styles.requirementRow}>
                  <Ionicons 
                    name={/[a-z]/.test(values.password) ? "checkmark-circle" : "ellipse-outline"} 
                    size={16} 
                    color={/[a-z]/.test(values.password) ? "#4CAF50" : "#999"} 
                    style={styles.requirementIcon} 
                  />
                  <Text style={styles.requirementItem}>Una letra minúscula</Text>
                </View>
                <View style={styles.requirementRow}>
                  <Ionicons 
                    name={/[0-9]/.test(values.password) ? "checkmark-circle" : "ellipse-outline"} 
                    size={16} 
                    color={/[0-9]/.test(values.password) ? "#4CAF50" : "#999"} 
                    style={styles.requirementIcon} 
                  />
                  <Text style={styles.requirementItem}>Un número</Text>
                </View>
                <View style={styles.requirementRow}>
                  <Ionicons 
                    name={/[^A-Za-z0-9]/.test(values.password) ? "checkmark-circle" : "ellipse-outline"} 
                    size={16} 
                    color={/[^A-Za-z0-9]/.test(values.password) ? "#4CAF50" : "#999"} 
                    style={styles.requirementIcon} 
                  />
                  <Text style={styles.requirementItem}>Un carácter especial</Text>
                </View>
              </View>

              {/* Navegación a Login */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.highlight}>Inicia sesión</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#d32f2f',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    marginBottom: 16,
    minHeight: 56,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  strengthContainer: {
    marginBottom: 20,
  },
  strengthBarContainer: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginBottom: 10,
  },
  strengthBar: {
    height: '100%',
    borderRadius: 4,
  },
  strengthLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  highlight: {
    color: '#d32f2f',
    fontWeight: '600',
    fontSize: 14,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 32,
  },
  requirementsContainer: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#d32f2f',
  },
  requirementText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    fontWeight: '500',
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementIcon: {
    marginRight: 10,
  },
  requirementItem: {
    fontSize: 14,
    color: '#555',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30, // Más espacio arriba, especialmente en iOS
    left: 10,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    elevation: 2,
  },
});