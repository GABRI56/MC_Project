import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import OrderCard from '../components/OrderCard';
import DBController from '../model/DBController';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderListScreen = () => {
  const [orders, setOrders] = useState([]);
  const [dbController, setDbController] = useState(null);
  const navigation = useNavigation();

    useFocusEffect(
      React.useCallback(() => {
        const onBackPress = () => {
          navigation.navigate('Home'); // Torna alla Home invece di chiudere l'app
          return true; // Intercetta il tasto "Indietro" e blocca la chiusura
        };
  
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }, [navigation])
    );

  useEffect(() => {
    const loadData = async () => {
        const dbController = new DBController();
        await dbController.openDB();
        setDbController(dbController);
    }
    loadData();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (dbController) {
        const orders = await dbController.getOrders();
        setOrders(orders);
      }
    };
    fetchOrders();
  } , [dbController]);

    return (
        <View style={styles.container}>
        <Text style={styles.title}>I tuoi ordini</Text>
        <FlatList
            data={orders}
            keyExtractor={(item) => item.oid.toString()}
            renderItem={({ item }) => <OrderCard orderId={item.oid} />}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    list: {
      paddingBottom: 20,
    },
    noOrdersText: {
      fontSize: 16,
      color: '#555',
      textAlign: 'center',
      marginTop: 20,
    },
  });
  
  export default OrderListScreen;