import React, { use, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CommunicationController from '../model/communicationController';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const OrderCard = ({ orderId }) => {
    const communicationController = new CommunicationController();
    const [order, setOrder] = useState(null);
    const [menuName, setMenuName] = useState(null);
    const [status, setStatus] = useState(null);

    const formatTimestamp = (timestamp) => {
      if (!timestamp) return 'N/A';
      const date = new Date(timestamp);
      return date.toLocaleString(); // Formatta la data e l'ora in base alle impostazioni locali dell'utente
    };

    useFocusEffect(
      React.useCallback(() => {
        const fetchOrder = async () => {
          const order = await communicationController.fetchOrderDetails(orderId);
          console.log('Order:', order);
          setOrder(order);
          const menu = await communicationController.fetchMenuDetails(order.mid);
          setMenuName(menu.name);
                if (order.status === 'COMPLETED') {
        setStatus('COMPLETATO');
      } else if (order.status === 'ON_DELIVERY') {
        setStatus('IN CONSEGNA');
      }
        };
        fetchOrder();
      }, [orderId])
    );

    const navigation = useNavigation();

    const navigateToOrder = (orderData, status) => {
      navigation.navigate('OrderStatus', { status, orderData });
    };

    if (!order || !menuName) {
        return (
            <View style={styles.card}>
                <Text>Caricamento...</Text>
            </View>
        );
    }

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.menuName}>{menuName}</Text>
                <Text>{formatTimestamp(order.creationTimestamp)}</Text>
                <Text>Stato: {status}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigateToOrder(order, order.status)}>
                <Text style={styles.buttonText}>Visualizza ordine</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginLeft: 10, 
    marginRight: 30, 
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  menuName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#FFD700', // Colore giallo più scuro
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default OrderCard;
