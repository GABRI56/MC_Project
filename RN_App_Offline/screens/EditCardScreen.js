import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DBController from '../model/DBController';
import CommunicationController from '../model/communicationController';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const EditCardScreen = ({ navigation, route }) => {
  const { currentCard } = route.params; // Dati attuali passati dalla schermata Profilo
  console.log('CARTA: ', currentCard);
  const [cardHolder, setCardHolder] = useState(currentCard?.cardName || '');
  const [cardNumber, setCardNumber] = useState(currentCard?.cardNumber || '');
  const [expirm, setExpirm] = useState(currentCard?.cardExpireMonth || '');
  const [expiry, setExpiry] = useState(currentCard?.cardExpireYear || '');
  const [cvv, setCvv] = useState(currentCard?.cardCVC || '');
  const [dbController, setDbController] = useState(null);

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
    await  db.openDB();
      setDbController(db);
    };
    initDB();
  }, []);

  const validateCardNumber = (number) => {
    const regex = /^\d{16}$/;
    return regex.test(number);
  };

  const validateExpiryMonth = (month) => {
    const regex = /^(0[1-9]|1[0-2])$/;
    return regex.test(month);
  };

  const validateExpiryYear = (year) => {
    const regex = /^\d{4}$/;
    return regex.test(year);
  };

  const validateCvv = (cvv) => {
    const regex = /^\d{3}$/;
    return regex.test(cvv);
  };

  const handleSave = async () => {
    console.log('Salvataggio in corso...');
    if (!cardHolder.trim()) {
      Alert.alert('Errore', 'Il nome sulla carta non può essere vuoto.');
      return;
    }
    if (cardHolder.length > 31) {
      Alert.alert('Errore', 'Il nome sulla carta non può superare i 31 caratteri.');
      return;
    }
    if (!validateCardNumber(cardNumber)) {
      Alert.alert('Errore', 'Il numero della carta di credito deve essere di 16 cifre.');
      return;
    }
    if (!validateExpiryMonth(expirm)) {
      Alert.alert('Errore', 'Il mese di scadenza deve essere un valore valido (01-12).');
      return;
    }
    if (!validateExpiryYear(expiry)) {
      Alert.alert('Errore', 'L\'anno di scadenza deve essere un valore valido di 4 cifre.');
      return;
    }
    if (!validateCvv(cvv)) {
      Alert.alert('Errore', 'Il CVV deve essere di 3 cifre.');
      return;
    }
    if (dbController) {
      console.log('Apro database...');
      await dbController.saveCard(cardHolder, cardNumber, expirm, expiry, cvv);
      console.log('Salvataggio completato!');
      // const communicationController = new CommunicationController();
      // await communicationController.updateCard(cardHolder, cardNumber, expirm, expiry, cvv);
      Alert.alert('Successo', 'Carta aggiornata correttamente!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Modifica Carta di Credito</Text>
      <TextInput
        style={styles.input}
        value={cardHolder}
        onChangeText={setCardHolder}
        placeholder="Nome sulla Carta"
      />
      <TextInput
        style={styles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
        placeholder="Numero Carta di Credito"
        keyboardType="numeric"
      />
      <View style={styles.expiryContainer}>
        <TextInput
          style={[styles.input, styles.expiryInput]}
          value={expirm}
          onChangeText={setExpirm}
          placeholder="MM"
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.expiryInput]}
          value={expiry}
          onChangeText={setExpiry}
          placeholder="AAAA"
          keyboardType="numeric"
        />
      </View>
      <TextInput
        style={styles.input}
        value={cvv}
        onChangeText={setCvv}
        placeholder="CVV"
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        disabled={!dbController} // Disabilita il pulsante se il database non è inizializzato
      >
        <Text style={styles.saveButtonText}>Salva</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  expiryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  expiryInput: {
    width: '48%',
  },
});

export default EditCardScreen;
