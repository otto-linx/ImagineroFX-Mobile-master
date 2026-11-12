import React, { useEffect, useState } from 'react';
import { 
  NavigationContainer, 
  DefaultTheme 
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../supabaseClient';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';

// Importa todos los componentes como funciones (sin llaves)
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import AllProductsScreen from '../screens/AllProductsScreen';
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductScreen from '../screens/ProductScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import PaymentScreen from '../screens/PaymentScreen';
import AddCardScreen from '../screens/AddCardScreen';
import SpecialOffersScreen from '../screens/SpecialOffersScreen';
import PrivacyScreen from '../screens/PrivacyScreen'; // Importa la nueva pantalla aquí
import SupportScreen from '../screens/SupportScreen';
import AboutScreen from '../screens/AboutScreen'; // Importa la pantalla About aquí


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tema personalizado
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

// Pantalla de carga
function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#d32f2f" />
      <Text style={styles.loadingText}>Cargando...</Text>
    </View>
  );
}

// Navegación de pestañas
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#d32f2f',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Cart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Account':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Offers':
              iconName = focused ? 'pricetag' : 'pricetag-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="Offers" component={SpecialOffersScreen} options={{ title: 'Ofertas' }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'Carrito' }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ title: 'Cuenta' }} />
    </Tab.Navigator>
  );
}

// Navegador principal
export default function AppNavigator() {
  const [isSessionChecked, setIsSessionChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getCurrentSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsLoggedIn(!!session);
      } catch (error) {
        console.error("Error obteniendo sesión:", error);
      } finally {
        setIsSessionChecked(true);
      }
    };

    // Listener para cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    getCurrentSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!isSessionChecked) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="AddCard" component={AddCardScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="AllProducts" component={AllProductsScreen} />
        <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
        <Stack.Screen name="SupportScreen" component={SupportScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});