// screens/DetailsScreen.js
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import CommunicationController from '../model/communicationController';
import { useState, useEffect } from 'react';
import DBController from '../model/DBController';
import { useFocusEffect } from '@react-navigation/native';
import { CreditCard } from 'lucide-react-native';
import { MapPin } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import storageController from '../model/storageController';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { Image } from 'lucide-react-native';


const DetailsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { mid, image } = route.params;
    const [menu, setMenu] = useState(null);
    const [dbController, setDbController] = useState(null);
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [card, setCard] = useState(null);
    const [transaction, setTransaction] = useState(false);
    const communicationController = new CommunicationController();

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
        async function fetchData() {
         // const communicationController = new CommunicationController();
          const data = await communicationController.fetchMenuDetails(mid);
          setMenu(data);
        }
        fetchData();
      }, []);

      useEffect(() => {
        const initDB = async () => {
          const db = new DBController();
         await db.openDB();
          setDbController(db);
        };
        initDB();
      }, []);

      useEffect(() => {
        const loadData = async () => {
          if (dbController) {
            const nameData = await dbController.getUserName();
            setName(nameData);
            const surnameData = await dbController.getUserSurname();
            setSurname(surnameData);
            const cardData = await dbController.getCard();
            setCard(cardData);
          }
        };
        loadData();
      }, [dbController]);

    const handleBuyMenu = async () => {
      const uid = await storageController.getUid();
      console.log('UID:', uid);
      if (!name || !surname || !card || !card.cardNumber) {
      Alert.alert('Errore', 'Profilo non completato');
      return;
      }
      // const ordersOnDelivery = await communicationController.ordersOnDelivery();
      // if (ordersOnDelivery) {
      // Alert.alert('Errore', 'Hai già un ordine in consegna');
      // return;
      // }
      Alert.alert(
      'Conferma Acquisto',
      'Sei sicuro di voler acquistare questo menù?',
      [
        {
        text: 'Annulla',
        style: 'cancel',
        },
        {
        text: 'Conferma',
        onPress: async () => {
          setTransaction(true);
          try {    
          const result = await communicationController.buyMenu(mid);
          await dbController.saveOrder(result.oid);
          console.log('Acquisto completato:', result.oid);
          setTransaction(false);
          Alert.alert('Successo', 'Acquisto completato con successo!');
          navigation.navigate('OrderStatus', { status: result.status, orderData: result });
          } catch (error) {
          if (error.message === 'Carta non valida') {
            Alert.alert('Errore', 'La carta non è valida. Per favore, aggiorna i dati della carta.');
          } else {
            Alert.alert('Errore', 'Errore durante l\'acquisto del menù. Per favore, riprova più tardi.');
            console.log(error);
          }
          } finally {
          setTransaction(false);
          }
        },
        },
      ],
      { cancelable: false }
      );
    };

    const placeholderImage = 'https://via.placeholder.com/300'; // URL dell'immagine placeholder

    const formatCardNumber = (cardNumber) => {
      if (!cardNumber) return '';
      const visibleDigits = cardNumber.slice(-4);
      const censoredDigits = '••••';
      return `${censoredDigits} ${visibleDigits}`;
    };

  return (
    <View>
    <ScrollView contentContainerStyle={styles.container}>
      <Image color="black" size={200}/>
      <View style={styles.details}>
        {menu ? (
        <>
           <Text style={styles.name}>{menu.name}</Text>
        <Text style={styles.price}>€{menu.price ? menu.price.toFixed(2) : 'N/A'}</Text>
        <Text style={styles.deliveryTime}>
          Tempo di spedizione: {menu.deliveryTime} min
        </Text>
        <Text style={styles.descriptionShort}>{menu.longDescription}</Text>
        </>
        ) : (
          <Text style={styles.descriptionShort}>Recupero informazioni...</Text>
        )}
       
        
        <View style={styles.cardInfo}>
          <CreditCard color="black" size={30} />
          {card && card.cardName && card.cardNumber ? (
            <>
              <Text style={styles.cardText}>{card.cardName}</Text>
              <Text style={styles.cardText}>{formatCardNumber(card.cardNumber)}</Text>
            </>
          ) : (
            <Text style={styles.cardText}>Nessuna carta inserita</Text>
          )}
        </View>
        <View style={styles.deliveryInfo}>
          <MapPin color="black" size={30}/>
          <Text style={styles.deliveryText}>Consegna a:</Text>
          <Text style={styles.deliveryText2}>La tua posizione</Text>
        </View>
        <TouchableOpacity style={styles.detailsButton}
        onPress={handleBuyMenu}
        >
          <Text style={styles.detailsButtonText}>Acquista</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    {transaction && (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )}
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    scrollgrow: 1,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionShort: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deliveryTime: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  descriptionLong: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
    lineHeight: 24,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginLeft: 10,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deliveryText: {
    fontSize: 16,
    marginLeft: 10,
  },
  deliveryText2: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    color: '#666',
  },
  detailsButton: {
    backgroundColor: '#FFD700', // Colore giallo più scuro
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  detailsButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsScreen;
