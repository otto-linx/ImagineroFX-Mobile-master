import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../supabaseClient';
import { useFocusEffect } from '@react-navigation/native';

// Paleta de colores rojos
const redTheme = {
  primary: '#FF3B30',
  secondary: '#FF6B6B',
  background: '#FFF5F5',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#5A5A5A',
  divider: '#E0E0E0',
  error: '#E74C3C',
  neutral: '#F8F9FA'
};

export default function AccountScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  
  const styles = useMemo(() => createStyles(redTheme), [redTheme]);

  useFocusEffect(
    React.useCallback(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start();
      
      fetchUser();
    }, [])
  );

  const fetchUser = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigation.navigate('Home');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={redTheme.primary} />
        <Text style={styles.loadingText}>Cargando tu cuenta...</Text>
      </View>
    );
  }

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={redTheme.icon} />
          </TouchableOpacity>
          <Text style={styles.title}>Mi Cuenta</Text>
        </View>

        {/* Perfil del usuario con efecto gradiente */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBorder}>
              <Image
                source={{
                  uri: user
                    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email.split('@')[0])}&background=${redTheme.primary.replace('#', '')}&color=fff` 
                    : `https://ui-avatars.com/api/?name=Invitado&background=${redTheme.neutral.replace('#', '')}&color=000000`, 
                }}
                style={styles.avatar}
              />
            </View>
          </View>
          
          {user ? (
            <>
              <Text style={styles.userName}>{user.email.split('@')[0]}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              
              {/* Badge de premium */}
              <View style={styles.premiumBadge}>
                <Ionicons name="star" size={16} color="#fff" />
                <Text style={styles.premiumText}>Cuenta Premium</Text>
              </View>

              {/* Información detallada */}
              <View style={styles.userInfoContainer}>
                <View style={styles.infoItem}>
                  <Ionicons name="calendar-outline" size={18} color={redTheme.textSecondary} />
                  <Text style={styles.infoText}>
                    Miembro desde: {formatDate(user.created_at)}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="key-outline" size={18} color={redTheme.textSecondary} />
                  <Text style={styles.infoText}>
                    Último acceso: {formatDate(new Date())}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.guestText}>Invitado</Text>
          )}
        </View>



        {/* Sección de opciones actualizada */}
        <View style={styles.optionsSection}>
          <TouchableOpacity 
            style={styles.optionItem}
            onPress={() => navigation.navigate('PrivacyScreen')}
          >
            <View style={styles.optionIcon}>
              <Ionicons name="shield-checkmark-outline" size={22} color={redTheme.icon} />
            </View>
            <Text style={styles.optionText}>Privacidad y Seguridad</Text>
            <Ionicons name="chevron-forward" size={18} color={redTheme.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.optionItem}
            onPress={() => navigation.navigate('SupportScreen')}
          >
            <View style={styles.optionIcon}>
              <Ionicons name="help-circle-outline" size={22} color={redTheme.icon} />
            </View>
            <Text style={styles.optionText}>Ayuda y Soporte</Text>
            <Ionicons name="chevron-forward" size={18} color={redTheme.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.optionItem}
            onPress={() => navigation.navigate('AboutScreen')}
          >
            <View style={styles.optionIcon}>
              <Ionicons name="information-circle-outline" size={22} color={redTheme.icon} />
            </View>
            <Text style={styles.optionText}>Acerca de la App</Text>
            <Ionicons name="chevron-forward" size={18} color={redTheme.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Botones principales */}
        <View style={styles.buttonsContainer}>
          {user ? (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color={redTheme.error} style={styles.buttonIcon} />
              <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.loginButton, { backgroundColor: redTheme.primary }]}
                onPress={() => navigation.navigate('Login')}
              >
                <Ionicons name="log-in-outline" size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.signupButton, { borderColor: redTheme.primary }]}
                onPress={() => navigation.navigate('Register')}
              >
                <Ionicons name="person-add-outline" size={20} color={redTheme.primary} style={styles.buttonIcon} />
                <Text style={[styles.signupButtonText, { color: redTheme.primary }]}>Crear Cuenta</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Footer mejorado */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Versión 2.1.0 • Última actualización: {formatDate(new Date())}
          </Text>
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>PRO</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

// Nuevos estilos con tema rojo
const createStyles = (theme) => {
  const elevation = {
    2: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3.84,
      elevation: 5,
    }
  };
  
  const getSafeElevation = (level) => {
    return elevation && elevation[level] ? elevation[level] : {};
  };

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    loadingText: {
      marginTop: 20,
      fontSize: 16,
      color: theme.textSecondary,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingTop: Platform.OS === 'android' ? 40 : 20,
      backgroundColor: theme.card,
      ...getSafeElevation(2),
    },
    backButton: {
      padding: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
    },
    profileSection: {
      alignItems: 'center',
      padding: 25,
      backgroundColor: theme.card,
      marginHorizontal: 20,
      borderRadius: 20,
      marginBottom: 15,
      ...getSafeElevation(2),
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: 15,
    },
    avatarBorder: {
      width: 110,
      height: 110,
      borderRadius: 55,
      borderWidth: 3,
      borderColor: theme.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.card,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: theme.primary,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 5,
    },
    userEmail: {
      fontSize: 16,
      color: theme.textSecondary,
      marginBottom: 15,
      textAlign: 'center',
    },
    guestText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginTop: 10,
    },
    premiumBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.secondary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      marginTop: 10,
      marginBottom: 15,
    },
    premiumText: {
      marginLeft: 8,
      color: '#fff',
      fontWeight: '600',
      fontSize: 14,
    },
    userInfoContainer: {
      width: '100%',
      marginTop: 10,
      borderTopWidth: 1,
      borderTopColor: theme.divider,
      paddingTop: 15,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    infoText: {
      marginLeft: 12,
      fontSize: 15,
      color: theme.textSecondary,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: theme.card,
      marginHorizontal: 20,
      borderRadius: 15,
      padding: 20,
      ...getSafeElevation(2),
      marginBottom: 20,
    },
    statItem: {
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.primary,
      marginBottom: 5,
    },
    statLabel: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    optionsSection: {
      backgroundColor: theme.card,
      marginHorizontal: 20,
      borderRadius: 15,
      paddingVertical: 10,
      ...getSafeElevation(2),
      marginBottom: 20,
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 18,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.divider,
    },
    optionIcon: {
      width: 35,
      alignItems: 'center',
    },
    optionText: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      marginLeft: 10,
    },
    buttonsContainer: {
      marginHorizontal: 20,
      marginBottom: 20,
    },
    loginButton: {
      borderRadius: 30,
      paddingVertical: 16,
      marginBottom: 15,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      ...getSafeElevation(2),
    },
    loginButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    signupButton: {
      backgroundColor: theme.card,
      borderWidth: 2,
      borderColor: theme.primary,
      borderRadius: 30,
      paddingVertical: 14,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      ...getSafeElevation(2),
    },
    signupButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    logoutButton: {
      backgroundColor: theme.card,
      borderWidth: 2,
      borderColor: theme.error,
      borderRadius: 30,
      paddingVertical: 14,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      ...getSafeElevation(2),
    },
    logoutButtonText: {
      color: theme.error,
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonIcon: {
      marginRight: 10,
    },
    footer: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    footerText: {
      fontSize: 13,
      color: theme.textSecondary,
      textAlign: 'center',
      marginBottom: 10,
    },
    badgeContainer: {
      marginTop: 8,
    },
    badge: {
      backgroundColor: theme.primary,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 20,
    },
    badgeText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 12,
    },
  });
};