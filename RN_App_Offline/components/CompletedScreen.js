import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CommunicationController from '../model/communicationController';
import { useState, useEffect } from 'react';

const CompletedScreen = ({ route }) => {
  const { orderData } = route.params;
  const [deliveryTimestamp, setDeliveryTimestamp] = useState(orderData.deliveryTimestamp);
  const [menu, setMenu] = useState([]);
  const communicationController = new CommunicationController();

    useEffect(() => {
    const fetchData = async () => {
      const data = await communicationController.fetchMenuDetails(orderData.mid);
      const order = await communicationController.fetchOrderDetails(orderData.oid);
      setMenu(data);
      setDeliveryTimestamp(order.deliveryTimestamp);
    };
    fetchData();
    }, []);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString(); // Formatta la data e l'ora in base alle impostazioni locali dell'utente
  };

    if (!orderData || !menu) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      );
    }

return (
  <View style={styles.container}>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: orderData.deliveryLocation.lat,
        longitude: orderData.deliveryLocation.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}>
        <Marker
          coordinate={{ latitude: orderData.deliveryLocation.lat, longitude: orderData.deliveryLocation.lng }}
          title="Punto di consegna"
          pinColor="blue"
        />     
    </MapView>
    <View style={styles.detailsContainer}>
      <Text style={styles.menuName}>{menu.name}</Text>
      <Text style={styles.status}>Stato: Consegnato</Text>
      <Text style={styles.estimatedTime}>Consegna avvenuta: {formatTimestamp(deliveryTimestamp)}</Text>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    height: 500,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
  },
  estimatedTime: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CompletedScreen;
