import * as Location from "expo-location";
import { Alert } from 'react-native';
import CommunicationController from "./communicationController";

export default class PositionController {

    async getCurrentPosition() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                const permissionGranted = await this.requestPermissionAgain();
                if (!permissionGranted) {
                    console.error('Permesso negato');
                    return;
                }
            }
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            console.log('Latitudine:', latitude, 'Longitudine:', longitude);
            return { latitude, longitude };
        } catch (error) {
            console.error('Error getting current position:', error);
        }
    }

    async requestPermissionAgain() {
        return new Promise((resolve) => {
            Alert.alert(
                'Autorizzazione alla posizione',
                'L\'app ha bisogno dell\'autorizzazione alla posizione per funzionare correttamente. Per favore, autorizza l\'uso della posizione.',
                [
                    {
                        text: 'OK',
                        onPress: async () => {
                            const { status } = await Location.requestForegroundPermissionsAsync();
                            resolve(status === 'granted');
                        },
                    },
                ],
                { cancelable: false }
            );
        });
    }

    async fetchOrderLocation(oid) {
        try {
            const communicationController = new CommunicationController();
            const order = await communicationController.fetchOrderDetails(oid);
            return order.currentPosition;
        } catch (error) {
            console.error('Error fetching order location:', error);
        }
    }
}