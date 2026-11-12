import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Animated,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Nueva Colección Escenográfica',
      message: 'Descubre nuestra nueva línea de telones y escenarios para teatro',
      date: 'Hace 2 horas',
      read: false,
      icon: 'color-palette',
      color: '#d32f2f',
      type: 'promotion'
    },
    {
      id: '2',
      title: 'Pedido Enviado',
      message: 'Tu pedido #ESCE-2023 está en camino. Llegará en 2 días hábiles',
      date: 'Ayer',
      read: true,
      icon: 'cube',
      color: '#4CAF50',
      type: 'order'
    },
    {
      id: '3',
      title: 'Taller de Escenografía',
      message: 'Únete a nuestro taller gratuito de diseño escenográfico este sábado',
      date: '2 días',
      read: true,
      icon: 'school',
      color: '#2196F3',
      type: 'event'
    },
    {
      id: '4',
      title: 'Oferta Especial',
      message: '20% de descuento en iluminación teatral por tiempo limitado',
      date: '3 días',
      read: false,
      icon: 'pricetag',
      color: '#FF9800',
      type: 'promotion'
    },
    {
      id: '5',
      title: 'Soporte Técnico',
      message: 'Hemos resuelto tu solicitud de soporte sobre el sistema de luces',
      date: '1 semana',
      read: true,
      icon: 'construct',
      color: '#9C27B0',
      type: 'support'
    },
  ]);
  
  const [refreshing, setRefreshing] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleReadStatus = (id) => {
    setNotifications(prev => 
      prev.map(item => 
        item.id === id ? {...item, read: true} : item
      )
    );
    
    // Animación al tocar
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      })
    ]).start();
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(item => ({...item, read: true}))
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulando carga de nuevas notificaciones
    setTimeout(() => {
      // Agregar una nueva notificación de ejemplo
      const newNotification = {
        id: (notifications.length + 1).toString(),
        title: 'Nuevo Producto',
        message: 'Acabamos de agregar un nuevo sistema de sonido profesional a nuestro catálogo',
        date: 'Ahora',
        read: false,
        icon: 'musical-notes',
        color: '#E91E63',
        type: 'product'
      };
      
      setNotifications([newNotification, ...notifications]);
      setRefreshing(false);
    }, 1500);
  };

  const renderItem = ({ item }) => {
    const scale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.98]
    });
    
    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity 
          style={[
            styles.notificationCard, 
            !item.read && styles.unread,
            { borderLeftColor: item.color }
          ]}
          activeOpacity={0.8}
          onPress={() => toggleReadStatus(item.id)}
        >
          <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
            <Ionicons name={item.icon} size={24} color={item.color} />
          </View>
          
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.title}</Text>
              {!item.read && <View style={styles.unreadIndicator} />}
            </View>
            
            <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
            
            <View style={styles.footer}>
              <Text style={styles.date}>{item.date}</Text>
              <View style={[styles.typeBadge, { backgroundColor: `${item.color}20` }]}>
                <Text style={[styles.typeText, { color: item.color }]}>
                  {item.type === 'promotion' ? 'Promoción' : 
                   item.type === 'order' ? 'Pedido' : 
                   item.type === 'event' ? 'Evento' : 
                   item.type === 'support' ? 'Soporte' : 'Producto'}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header con efecto de telón */}
      <LinearGradient
        colors={['#d32f2f', '#b20808']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <Text style={styles.headerSubtitle}>Mantente actualizado con ImagineroFX</Text>
      </LinearGradient>
      
      <View style={styles.content}>
        <View style={styles.headerActions}>
          <Text style={styles.counter}>
            {notifications.filter(n => !n.read).length} no leídas
          </Text>
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.markAll}>Marcar todo como leído</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#d32f2f"
              colors={['#d32f2f']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="notifications-off" size={70} color="#e0e0e0" />
              <Text style={styles.emptyTitle}>Sin notificaciones</Text>
              <Text style={styles.emptyText}>No tienes notificaciones en este momento</Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffd54f',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  counter: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d32f2f',
    backgroundColor: '#fbe9e7',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  markAll: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    padding: 15,
    paddingBottom: 30,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  unread: {
    backgroundColor: '#fef5f5',
    borderLeftWidth: 6,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#222',
    flex: 1,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d32f2f',
    marginLeft: 10,
  },
  message: {
    color: '#555',
    marginBottom: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  typeBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#555',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 40,
  },
});

export default NotificationsScreen;