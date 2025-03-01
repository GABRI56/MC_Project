// components/MenuCard.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DBController from '../model/DBController';
import CommunicationController from '../model/communicationController';
import { UtensilsCrossed } from 'lucide-react-native';

const placeholderImage = 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'; // URL dell'immagine placeholder

const MenuCard = ({ menu }) => {
  const navigation = useNavigation();
  const [dbController, setDbController] = useState(null);
  const communicationController = new CommunicationController();
  const [image, setImage] = useState(placeholderImage);

  useEffect(() => {
    const initDB = async () => {
      const db = new DBController();
      await db.openDB();
      setDbController(db);
    };
    initDB();
  }, []);

  // useEffect(() => {
  //   const checkImageVersion = async () => {
  //     if (dbController) {
  //       const image = await dbController.getMenuImage(menu.mid);
  //       if (image) {
  //         if (image.imageVersion !== menu.imageVersion) {
  //           console.log('Image version mismatch, updating image');
  //           const base64 = await communicationController.fetchMenuImage(menu.mid);
  //           await dbController.saveMenuImage(menu.mid, menu.imageVersion, base64);
  //           setImage(`data:image/png;base64,${base64}`);
  //         } else {
  //           setImage(`data:image/png;base64,${image.base64}`);
  //         }
  //       } else {
  //         console.log('Image not found, fetching image');
  //         const base64 = await communicationController.fetchMenuImage(menu.mid);
  //         await dbController.saveMenuImage(menu.mid, menu.imageVersion, base64);
  //         setImage(`data:image/png;base64,${base64}`);
  //       }
  //     }
  //   };
  //   checkImageVersion();
  // }, [dbController]);

  return (
    <View style={styles.box}>
      
     <UtensilsCrossed color="black" size={30} marginRight={20}/>
     
      <View style={styles.textContainer}>
        <Text style={styles.name}>{menu.name}</Text>
        <Text style={styles.description}>{menu.shortDescription}</Text>
        <Text style={styles.price}>€{menu.price.toFixed(2)}</Text>
        <Text style={styles.deliveryTime}>
          Tempo di consegna: {menu.deliveryTime} min
        </Text>
        <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('Details', { mid: menu.mid, image: image })}>
          <Text style={styles.detailsButtonText}>Dettagli</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    width: '100%', // Assicurati che la card occupi tutta la larghezza disponibile
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deliveryTime: {
    fontSize: 14,
    color: '#444',
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
});

export default MenuCard;
