import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DBController from '../model/DBController';
import CommunicationController from '../model/communicationController';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const EditNameScreen = ({ navigation, route }) => {
  const { currentName, currentSurname } = route.params; // Dati attuali passati dalla schermata Profilo
  const [name, setName] = useState(currentName || '');
  const [surname, setSurname] = useState(currentSurname || '');
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
     await db.openDB();
      setDbController(db);
    };
    initDB();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Errore', 'Il nome non può essere vuoto.');
      return;
    }
    if (!surname.trim()) {
      Alert.alert('Errore', 'Il cognome non può essere vuoto.');
      return;
    }
    if (name.length > 15) {
      Alert.alert('Errore', 'Il nome non può superare i 15 caratteri.');
      return;
    }
    if (surname.length > 15) {
      Alert.alert('Errore', 'Il cognome non può superare i 15 caratteri.');
      return;
    }
    if (dbController) {
      await dbController.saveUserName(name, surname);
      // const communicationController = new CommunicationController();
      // await communicationController.updateUserName(name, surname);
      
      Alert.alert('Successo', 'Nome aggiornato correttamente!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert('Errore', 'Database non inizializzato.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Modifica Nome e Cognome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nome"
      />
      <TextInput
      style={styles.input}
      value={surname}
      onChangeText={setSurname}
      placeholder="Cognome"
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
});

export default EditNameScreen;
