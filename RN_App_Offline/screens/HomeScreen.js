// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MenuCard from '../components/MenuCard';
import CommunicationController from '../model/communicationController';
import { UserRound } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
//import DBController from '../model/DBController';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true); // Stato per gestire il caricamento


  useEffect(() => {
    async function fetchData() {
      const communicationController = new CommunicationController();
      const data = await communicationController.fetchMenus();
      setMenus(data);
      setLoading(false); // Imposta lo stato a false quando il caricamento è completato
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>M&B</Text>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
          <UserRound size={30} color="black" />
        </TouchableOpacity>
      </View>
      { loading ? (
      <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#FFD700" style={{ transform: [{ scale: 1.5 }] }} />
      </View>
    ) : (
      <FlatList
        data={menus}
        renderItem={({ item }) => <MenuCard menu={item} />}
        keyExtractor={(item) => item.mid.toString()}
        contentContainerStyle={styles.list}
      />   
  )
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFD700', // Colore giallo più scuro
    width: '100%',
  },
  appName: {
    paddingTop: 30,
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  profileButton: {
    paddingTop: 30,
  },
  profileButtonText: {
    color: 'black',
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
    alignItems: 'center',
    width: '90%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default HomeScreen;
