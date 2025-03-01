import StorageController from "./storageController";
import PositionController from "./positionController";
import DBController from "./DBController";

export default class CommunicationController {

    async fetchSidAndUid() {
        // try {
        //     const response = await fetch('https://develop.ewlab.di.unimi.it/mc/2425/user', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({})
        //     });
        //     if (!response.ok) {
        //         throw new Error('Errore nella richiesta');
        //     }
        //     const data = await response.json();
        //     const { sid, uid } = data;
        //     if (sid && uid) {
        //         console.log('SID:', sid, 'UID:', uid);
        //         return { sid, uid };
        //     } else {
        //         console.error('SID o UID non presente nella risposta');
        //     }
        // } catch (error) {
        //     console.error('Error fetching SID and UID:', error);
        // }

        const {sid, uid} = {'sid': 'abc123', 'uid': 123};
        return {sid, uid};
    }

    async fetchMenus() {
        // try {
        //     const positionController = new PositionController();
        //     const position = await positionController.getCurrentPosition();
        //     const lat = position.latitude;
        //     const lng = position.longitude;
        //     const sid = await StorageController.getSid(); // Assicurati di ottenere il SID correttamente

        //     console.log('SID:', sid);
        //     const params = { lat, lng, sid };
        //     const queryString = new URLSearchParams(params).toString();
        //     const response = await fetch(`https://develop.ewlab.di.unimi.it/mc/2425/menu?${queryString}`, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     if (!response.ok) {
        //         throw new Error('Errore nella richiesta');
        //     }
        //     const data = await response.json();
        //    // console.log('Data:', data);
        //     return data;
        // } catch (error) {
        //     console.error('Error fetching menus:', error);
        // }

        const data = [
            {
                "mid": 12,
                "name": "Pasta Alla Carbonara",
                "price": 10,
                "location": {
                  "lat": 45.4642,
                  "lng": 9.19
                },
                "imageVersion": 0,
                "deliveryTime": 0,
                "shortDescription": "Pasta alla carbonara"
              },
              {
                "mid": 13,
                "name": "Pasta Alla Carbonara",
                "price": 10,
                "location": {
                  "lat": 45.4642,
                  "lng": 9.19
                },
                "imageVersion": 0,
                "deliveryTime": 0,
                "shortDescription": "Pasta alla carbonara"
              },
              {
                "mid": 14,
                "name": "Pasta Alla Carbonara",
                "price": 10,
                "location": {
                  "lat": 45.4642,
                  "lng": 9.19
                },
                "imageVersion": 0,
                "deliveryTime": 0,
                "shortDescription": "Pasta alla carbonara"
              },
        ];
        return data;
    }

    async fetchMenuDetails(mid) {
        // try {
        //     const positionController = new PositionController();
        //     const position = await positionController.getCurrentPosition();
        //     const lat = position.latitude;
        //     const lng = position.longitude;
        //     const sid = await StorageController.getSid(); // Assicurati di ottenere il SID correttamente
        //     console.log('SID:', sid);
        //     const params = { lat, lng, sid };
        //     const queryString = new URLSearchParams(params).toString();
        //     const response = await fetch(`https://develop.ewlab.di.unimi.it/mc/2425/menu/${mid}?${queryString}`, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     if (!response.ok) {
        //         throw new Error('Errore nella richiesta');
        //     }
        //     const data = await response.json();
        //     console.log('Data:', data);
        //     return data;
        // } catch (error) {
        //     console.error('Error fetching menu details:', error);
        // }

        const data = {
            "mid": 12,
            "name": "Pasta Alla Carbonara",
            "price": 10,
            "imageVersion": 0,
            "shortDescription": "Pasta alla carbonara",
            "location": {
              "lat": 45.4642,
              "lng": 9.19
            },
            "longDescription": "Pasta alla carbonara, descrizione più lunga",
            "deliveryTime": 0
          };
        return data;
    }

    async updateUserName(name, surname) {
        try {
            const sid = await StorageController.getSid(); // Assicurati di ottenere il SID correttamente
            const uid = await StorageController.getUid(); // Assicurati di ottenere il UID correttamente
            console.log('SID:', sid);
            const response = await fetch(`https://develop.ewlab.di.unimi.it/mc/2425/user/${uid}?${sid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                "firstName": name,
                "lastName": surname,
                "sid": sid })
            });
            if (!response.ok && response.status !== 204) {
            throw new Error('Errore nella richiesta');
            }
            if (response.status === 204) {
            console.log('User name updated successfully with no content');
            return;
            }
            const data = await response.json();
            console.log('Data:', data);
            return data;
        } catch (error) {
            console.error('Error updating user name:', error);
        }
    }

    async updateCard(cardName, cardNumber, cardExpireMonth, cardExpireYear, cardCVC) {
        try {
            const sid = await StorageController.getSid(); // Assicurati di ottenere il SID correttamente
            const uid = await StorageController.getUid(); // Assicurati di ottenere il UID correttamente
            console.log('SID:', sid);
            const response = await fetch(`https://develop.ewlab.di.unimi.it/mc/2425/user/${uid}?${sid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                "cardFullName": cardName,
                "cardNumber": cardNumber,
                "cardExpireMonth": cardExpireMonth,
                "cardExpireYear": cardExpireYear,
                "cardCVV": cardCVC,
                "sid": sid })
            });
            if (!response.ok && response.status !== 204) {
            throw new Error('Errore nella richiesta');
            }
            if (response.status === 204) {
            console.log('Card updated successfully with no content');
            return;
            }
            const data = await response.json();
            console.log('Data:', data);
            return data;
        } catch (error) {
            console.error('Error updating card:', error);
        }
    }

    async buyMenu(mid) {
        // const sid = await StorageController.getSid(); // Assicurati di ottenere il SID correttamente
        // const positionController = new PositionController();
        //     const position = await positionController.getCurrentPosition();
        //     const lat = position.latitude;
        //     const lng = position.longitude;
        // try {
        //     const response = await fetch(`https://develop.ewlab.di.unimi.it/mc/2425/menu/${mid}/buy`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ "sid": sid,
        //             "deliveryLocation": {
        //                 "lat": lat,
        //                 "lng": lng }
        //         })
                
        //     });
        //     if (response.status === 403) {
        //         throw new Error('Carta non valida');
        //     }
        //     if (!response.ok) {
        //         throw new Error('Errore durante l\'acquisto del menù');
        //     }
        //     const data = await response.json();
        //     console.log('Acquisto completato:', data);
        //     return data;
        // } catch (error) {
        //     // console.error('Error buying menu:', error);
        //      throw error;
        // }

        data = {
            "oid": 9009,
            "mid": 12,
            "uid": 42851,
            "creationTimestamp": "2025-03-01T09:27:30.877Z",
            "status": "COMPLETED",
            "deliveryLocation": {
              "lat": 45.4642,
              "lng": 9.19
            },
            "currentPosition": {
              "lat": 45.4642,
              "lng": 9.19
            },
            "deliveryTimestamp": "2025-03-01T09:27:30.885Z"
          };
        return data;
    }

    async ordersOnDelivery() {
        try {
            const sid = await StorageController.getSid(); // Assicurati di ottenere il SID correttamente
            const uid = await StorageController.getUid(); // Assicurati di ottenere il UID correttamente
            const params = { sid, uid: parseInt(uid, 10) }; // Converti UID in intero
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`https://develop.ewlab.di.unimi.it/mc/2425/user/${uid}?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            const data = await response.json();
            console.log('Data:', data);
            if (data.orderStatus === 'ON_DELIVERY') {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error fetching orders on delivery:', error);
        }
    }

 

    async fetchOrderDetails(oid) {
        // try {
        //     const sid = await StorageController.getSid(); // Assicurati di ottenere il SID correttamente
        //     const params = { oid: parseInt(oid, 10), sid: String(sid) };
        //     const queryString = new URLSearchParams(params).toString();
        //     const response = await fetch(`https://develop.ewlab.di.unimi.it/mc/2425/order/${oid}?${queryString}`, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     if (!response.ok) {
        //         throw new Error('Errore nella richiesta');
        //     }
        //     const data = await response.json();
        //     console.log('Data:', data);
        //     return data;
        // } catch (error) {
        //     console.error('Error fetching order details:', error);
        // }

        const data = {
            "oid": 9009,
            "mid": 12,
            "uid": 42851,
            "creationTimestamp": "2025-03-01T09:27:30.877Z",
            "status": "COMPLETED",
            "deliveryLocation": {
              "lat": 45.4642,
              "lng": 9.19
            },
            "currentPosition": {
              "lat": 45.4642,
              "lng": 9.19
            },
            "deliveryTimestamp": "2025-03-01T09:27:30.885Z"
          };
        return data;
    }

    async getLastOid() {
        try {
            const sid = await StorageController.getSid(); // Assicurati di ottenere il SID correttamente
            const uid = await StorageController.getUid(); // Assicurati di ottenere il UID correttamente
            const params = { sid, uid: parseInt(uid, 10) }; // Converti UID in intero
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`https://develop.ewlab.di.unimi.it/mc/2425/user/${uid}?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            const data = await response.json();
            return data.lastOid;
        } catch (error) {
            console.error('Error fetching orders on delivery:', error);
        }
    }

async fetchMenuImage(mid) {
    //     try {
    //     const sid = await StorageController.getSid(); // Assicurati di ottenere il SID correttamente
    //     const params = { mid: parseInt(mid, 10), sid: String(sid) };
    //     const queryString = new URLSearchParams(params).toString();    
    //     const response = await fetch(`https://develop.ewlab.di.unimi.it/mc/2425/menu/${mid}/image?${queryString}`, {
    //         method: 'GET',
    //         headers: {
    //         'Content-Type': 'application/json'
    //         }
    //     });
    //         if (!response.ok) {
    //             throw new Error('Errore nella richiesta');
    //         }
    //         const data = await response.json();
            
    //         return data.base64;
    //     } catch (error) {
    //         console.error('Error fetching menu image:', error);
    //     }

    return null;

}

} 
 