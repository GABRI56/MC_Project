import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CommunicationController from '../model/communicationController';
import PositionController from '../model/positionController';
import { useState, useEffect } from 'react';

const OnDeliveryScreen = ({ route }) => {
  const { orderData, setStatus } = route.params;
  const [currentPosition, setCurrentPosition] = useState([]);
  const [menu, setMenu] = useState([]);
  const [orderLocation, setOrderLocation] = useState(orderData.currentPosition);
  const communicationController = new CommunicationController();
  const positionController = new PositionController();

    useEffect(() => {
    const fetchData = async () => {
      const data = await communicationController.fetchMenuDetails(orderData.mid);
      setMenu(data);
    };
    fetchData();
    }, []);

    useEffect(() => {
    const getCurrentPosition = async () => {
      const position = await positionController.getCurrentPosition();
      setCurrentPosition(position);
    };
    getCurrentPosition();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const newLocation = await positionController.fetchOrderLocation(orderData.oid);
        setOrderLocation(newLocation); // Aggiorna la posizione

        // Controlla lo stato dell'ordine
        const updatedOrderData = await communicationController.fetchOrderDetails(orderData.oid);
        if (updatedOrderData.status === 'COMPLETED') {
          setStatus('COMPLETED');
        }
      } catch (error) {
        console.error('Errore durante l\'aggiornamento della posizione:', error);
      }
    }, 5000); // Ogni 5 secondi

    return () => clearInterval(interval); // Pulisce l'intervallo quando il componente viene smontato
  }, [orderLocation]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString(); // Formatta la data e l'ora in base alle impostazioni locali dell'utente
  };

    if (!orderData || !menu || !currentPosition) {
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
      {currentPosition && currentPosition.latitude && currentPosition.longitude && (
        <Marker
          coordinate={{ latitude: currentPosition.latitude, longitude: currentPosition.longitude }}
          title="Posizione Utente"
          pinColor="blue"
        />
      )}
      {menu.location && (
        <Marker
          coordinate={{ latitude: menu.location.lat, longitude: menu.location.lng }}
          title="Posizione Ristorante"
          pinColor="green"
        />
      )}
      {orderLocation && (
        <Marker
          coordinate={{ latitude: orderLocation.lat, longitude: orderLocation.lng }}
          title="Posizione Drone"
          pinColor="red"
        />
      )}
    </MapView>
    <View style={styles.detailsContainer}>
      <Text style={styles.menuName}>{menu.name}</Text>
      <Text style={styles.status}>Stato: L'ordine è in transito.</Text>
      <Text style={styles.estimatedTime}>Arrivo previsto: {formatTimestamp(orderData.expectedDeliveryTimestamp)}</Text>
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
    //width: Dimensions.get('window').width,
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
    //color: 'gray',
  },
  estimatedTime: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default OnDeliveryScreen;
