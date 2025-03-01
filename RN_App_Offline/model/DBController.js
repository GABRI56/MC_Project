import * as SQLite from 'expo-sqlite';

export default class DBController {
    constructor() {
        this.db = null;
    }
    
    async openDB() {
        this.db = await SQLite.openDatabaseAsync('AppDB');
        const queryUser = 'CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, surname TEXT, cardName TEXT, cardNumber TEXT, cardExpireMonth TEXT, cardExpireYear TEXT, cardCVC INTEGER)';
        const queryOrders = 'CREATE TABLE IF NOT EXISTS Orders (oid INTEGER PRIMARY KEY)';
        const queryMenuImages = 'CREATE TABLE IF NOT EXISTS MenuImages (mid INTEGER PRIMARY KEY, imageVersion INTEGER, base64 TEXT)';
        await this.db.runAsync(queryUser);
        await this.db.runAsync(queryOrders);
        await this.db.runAsync(queryMenuImages);
    }

    async saveUserName(name, surname) {
        console.log('saveusername', this.db);
        const queryCheck = 'SELECT id FROM User';
        let result = await this.db.getFirstAsync(queryCheck);
        console.log('Risultato1: ', result);
        let query;
        if (result) {
            query = `UPDATE User SET name = '${name}', surname = '${surname}' WHERE id = ${result.id}`;
            console.log('eseguo update');
        } else {
            query = `INSERT INTO User (name, surname) VALUES ('${name}', '${surname}')`;
            console.log('eseguo insert');
        }
        console.log(query);

        try {
            await this.db.runAsync(query);
           console.log('Risultato2: ',result);

        } catch (error) {
            console.log('Errore: ', error);
        }


    }
    
    async saveCard(cardName, cardNumber, cardExpireMonth, cardExpireYear, cardCVC) {
        console.log('saveCard', this.db);
        const queryCheck = 'SELECT id FROM User';
        const result = await this.db.getFirstAsync(queryCheck);
        let query;
        if (result) {
            query = `UPDATE User SET cardName = '${cardName}', cardNumber = '${cardNumber}', cardExpireMonth = '${cardExpireMonth}', cardExpireYear = '${cardExpireYear}', cardCVC = ${cardCVC} WHERE id = ${result.id}`;
            console.log('eseguo update');
        } else {
            query = `INSERT INTO User (cardName, cardNumber, cardExpireMonth, cardExpireYear, cardCVC) VALUES ('${cardName}', '${cardNumber}', '${cardExpireMonth}', '${cardExpireYear}', ${cardCVC})`;
            console.log('eseguo insert');
        }
        console.log(query);

        try {
            await this.db.runAsync(query);
            console.log('Risultato2: ', result);
        } catch (error) {
            console.log('Errore: ', error);
        }
    }

    async saveOrder(oid) {
        try {
            let newOid = oid;
            let existingOrder = await this.getOrder(newOid);
    
            // Increment oid until a unique one is found
            while (existingOrder) {
                newOid += 1;
                existingOrder = await this.getOrder(newOid);
            }
    
            // Insert the order with the new unique oid
            const query = `INSERT INTO Orders (oid) VALUES (${newOid})`;
            await this.db.runAsync(query);
            console.log('Order saved with oid:', newOid);
        } catch (error) {
            console.error('Error saving order:', error);
        }
    }

    async getOrder(oid) {
        try {
            const query = `SELECT * FROM Orders WHERE oid = ${oid}`;
            const result = await this.db.getFirstAsync(query);
            return result;
        } catch (error) {
            console.error('Error fetching order:', error);
            return null;
        }
    }

    async saveMenuImage(mid, imageVersion, base64) {
        try {
            const query = `INSERT INTO MenuImages (mid, imageVersion, base64) VALUES (${mid}, ${imageVersion}, '${base64}')`;
            await this.db.runAsync(query);
        } catch (error) {
            console.log('Errore: ', error);
        }
    }

    async getUserName() {
        console.log('getusername', this.db);
        const query = 'SELECT name FROM User';
        const result = await this.db.getFirstAsync(query);
        return result ? result.name : null;
    }

    async getUserSurname() {
        const query = 'SELECT surname FROM User';
        const result = await this.db.getFirstAsync(query);
        return result ? result.surname : null;
    }

    async getCard() {
        const query = 'SELECT cardName, cardNumber, cardExpireMonth, cardExpireYear, cardCVC FROM User';
        const result = await this.db.getFirstAsync(query);
        console.log('Risultato: ', result);
        return result ? result : null;
    }

    async getOrders() {
        const query = 'SELECT oid FROM Orders';
        const result = await this.db.getAllAsync(query);
        return result;
    }

    async getMenuImage(mid) {
        const query = `SELECT imageVersion, base64 FROM MenuImages WHERE mid = ${mid}`;
        const result = await this.db.getFirstAsync(query);
        return result;
    }

    async updateMenuImage(mid, imageVersion, base64) {
        const query = `UPDATE MenuImages SET imageVersion = ${imageVersion}, base64 = ${base64} WHERE mid = ${mid}`;
        await this.db.runAsync(query);
    }

    async checkLastOrder() {
        const query = 'SELECT oid FROM Orders ORDER BY oid DESC LIMIT 1';
        const result = await this.db.getFirstAsync(query);
        return result ? result.oid : null;
    }
}