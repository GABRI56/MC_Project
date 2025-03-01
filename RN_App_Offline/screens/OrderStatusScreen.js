import React, { useState, useEffect } from 'react';
import OnDeliveryScreen from '../components/OnDeliveryScreen';
import CompletedScreen from '../components/CompletedScreen';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderStatusScreen = ({ route }) => {
  const { status: initialStatus, orderData } = route.params;
  const [status, setStatus] = useState(initialStatus);
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
    if (status === 'COMPLETED') {
      console.log('OrderData:', orderData);
    }
   }, [status]);

  if (status === 'ON_DELIVERY') {
    return <OnDeliveryScreen route={{ params: { orderData, setStatus } }} />;
  } else if (status === 'COMPLETED') {
    return <CompletedScreen route={{ params: { orderData } }} />;
  }

  return null;
 
};

export default OrderStatusScreen;
