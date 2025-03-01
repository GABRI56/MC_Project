import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import StorageController from './model/storageController';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditNameScreen from './screens/EditNameScreen';
import EditCardScreen from './screens/EditCardScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderStatusScreen from './screens/OrderStatusScreen';

const Stack = createStackNavigator();

export default function App() {
  const [sid, setSid] = useState(null);
  const [uid, setUid] = useState(null);
  const [initialRoute, setInitialRoute] = useState(null);
  const [initialParams, setInitialParams] = useState(null);

  useEffect(() => {
    async function initialize() {
      await StorageController.checkFirstRun();
      setSid(await StorageController.getSid());
      setUid(await StorageController.getUid());
      console.log('UID:', uid, 'SID:', sid);
    }
    initialize();
  }, []);

  useEffect(() => {
    async function getLastScreen() {
      const lastScreen = await StorageController.getLastScreen();
      if (lastScreen) {
        setInitialRoute(lastScreen.screen);
        setInitialParams(lastScreen.params || {});
      } else {
        setInitialRoute('Home');
      }
    }
    getLastScreen();
  });

  if (!initialRoute) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Loader mentre carica
  }

  return (
    <NavigationContainer
    onStateChange={async (state) => {
      const currentRoute = state.routes[state.index];
      const { name, params } = currentRoute;

      await AsyncStorage.setItem(
        'lastScreen',
        JSON.stringify({ screen: name, params: params || {} }) // Salva anche i parametri
      );
    }}
    >
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Dettagli' }} initialParams={initialParams} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profilo Utente' }}/>
        <Stack.Screen name="EditName" component={EditNameScreen} options={{ title: 'Modifica Nome' }} initialParams={initialParams}/>
        <Stack.Screen name="EditCard" component={EditCardScreen} options={{ title: 'Modifica Carta' }} initialParams={initialParams}/>
        <Stack.Screen name="OrderList" component={OrderListScreen} options={{ title: 'I tuoi ordini' }}/>
        <Stack.Screen name="OrderStatus" component={OrderStatusScreen} options={{ title: 'Stato Ordine' }} initialParams={initialParams}
/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
