import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { supabase } from '../supabaseClient';

const TestConnection = () => {
  useEffect(() => {
    const testDatabase = async () => {
      try {
        // Consulta a la tabla "users"
        const { data, error } = await supabase.from('users').select();

        if (error) {
          console.error('❌ Error:', error.message);
          return;
        }

        console.log('✅ Datos obtenidos:', data);
      } catch (error) {
        console.error('❌ Error:', error.message);
      }
    };

    testDatabase();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Verifica la consola para resultados</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestConnection;