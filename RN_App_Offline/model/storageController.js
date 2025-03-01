import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunicationController from './communicationController';

export default class StorageController {
    static async checkFirstRun() {
        const hasAlreadyRun = await AsyncStorage.getItem("hasAlreadyRun");
        if (hasAlreadyRun) {
            console.log("Not first run", hasAlreadyRun, typeof hasAlreadyRun);
        } else {
            console.log("first run");
            await AsyncStorage.setItem("hasAlreadyRun", "true");
            const { sid, uid } = await new CommunicationController().fetchSidAndUid();
            if (sid && uid) {
                await AsyncStorage.setItem("sid", sid);
                await AsyncStorage.setItem("uid", uid.toString());
            }
        }
    }

    static async getSid() {
        return await AsyncStorage.getItem("sid");
    }

    static async getUid() {
        return await AsyncStorage.getItem("uid");
    }

    static async getLastScreen() {
        const lastScreenData = await AsyncStorage.getItem('lastScreen');
      if (lastScreenData) {
        const { screen, params } = JSON.parse(lastScreenData);
        return { screen, params };
    }
}
}