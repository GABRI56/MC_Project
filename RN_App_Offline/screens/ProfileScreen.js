import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DBController from '../model/DBController';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { CreditCard } from 'lucide-react-native';
import OrderCard from '../components/OrderCard';
import CommunicationController from '../model/communicationController';
import { BackHandler } from 'react-native';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [card, setCard] = useState(null);
  const navigation = useNavigation();
  const [dbController, setDbController] = useState(null);
  const [lastOid, setLastOid] = useState(null);
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
    const initDB = async () => {
      const db = new DBController();
     await db.openDB();
      setDbController(db);
    };
    initDB();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        if (dbController) {
          const userName = await dbController.getUserName();
          setName(userName);
          const surname = await dbController.getUserSurname();
          setSurname(surname);
          const userCard = await dbController.getCard();
          setCard(userCard);
          const lastOid = await dbController.checkLastOrder();
          setLastOid(lastOid);
        }
      };
      loadData();
    }, [dbController])
  );

  const handleEditName = () => {
    navigation.navigate('EditName', { currentName: name, currentSurname: surname });
  };

  const handleEditCard = () => {
    navigation.navigate('EditCard', { currentCard: card });
  };

  const formatCardNumber = (cardNumber) => {
    if (!cardNumber) return '';
    const visibleDigits = cardNumber.slice(-4);
    const censoredDigits = '••••';
    return `${censoredDigits} ${visibleDigits}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>
          {name && surname ? `${name} ${surname}` : 'Inserisci nome e cognome'}
        </Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditName}>
          <Text style={styles.editButtonText}>Modifica Nome</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <CreditCard color="black" size={40} />
        {card && card.cardNumber && card.cardExpireMonth && card.cardExpireYear ? (
          <>
            <Text>{card.cardName}</Text>
            <Text>{formatCardNumber(card.cardNumber)}</Text>
            <Text>Scadenza: {card.cardExpireMonth}/{card.cardExpireYear}</Text>
          </>
        ) : (
          <Text>Nessuna carta inserita</Text>
        )}
        <TouchableOpacity style={styles.editButton} onPress={handleEditCard}>
          <Text style={styles.editButtonText}>Modifica Carta</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.ordersTitle}>I tuoi ordini</Text>
      {lastOid ? (
        <OrderCard orderId={lastOid} />
      ) : (
        <Text style ={styles.plainText}>Nessun ordine effettuato</Text>
      )}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('OrderList')}
      >
        <Text style={styles.ordersButtonText}>Visualizza tutti gli ordini</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    paddingTop: 10,
  },
  nameContainer: {
    alignItems: 'left',
    padding: 20,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  box: {
    width: '90%',
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingTop: 10,
    marginHorizontal: 10,
    marginRight: 20,
  },
  editButton: {
    borderRadius: 5,
    alignItems: 'left',
  },
  editButtonText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  ordersButtonText: {
    color: '#FFD700',
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  ordersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    paddingLeft: 10,
  },
  plainText: {
    margin: 10,
    paddingLeft: 10,
  },
});

export default ProfileScreen;
