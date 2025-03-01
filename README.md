# Mangia e Basta - MC 2024/2025

## Descrizione del Progetto

**Mangia e Basta** è un'app mobile sviluppata in **React Native** per il corso di Mobile Computing. L'app consente agli utenti di acquistare menù preconfigurati e riceverli rapidamente tramite droni.

### Funzionalità Principali

- **Registrazione implicita**: al primo avvio, l'app genera un numero di sessione (SID) univoco.
- **Gestione profilo**: possibilità di inserire dati personali e della carta di credito.
- **Elenco menù**: visualizzazione dei menù disponibili con nome, immagine, prezzo e tempi di consegna.
- **Dettagli menù**: visualizzazione estesa con descrizione approfondita e opzione di acquisto.
- **Acquisto menù**: l'utente può acquistare un menù se ha completato il profilo e non ha ordini in corso.
- **Monitoraggio consegna**: aggiornamento in tempo reale dello stato della consegna con mappa interattiva.
- **Persistenza dati**: salvataggio dello stato dell'ultima schermata visualizzata per un'esperienza utente fluida.

## Implementazione Tecnica

- **Linguaggi e framework**: React Native, JavaScript.
- **Navigazione**: implementata con React Navigation.
- **Persistenza dati**: AsyncStorage per memorizzare sessione utente e ultima schermata visualizzata; SQLite per memorizzazione dati utente, immagini e ordini.
- **Mock API**: dati hardcoded sostituiscono l'API originale, che verrà dismessa a settembre 2025.
- **Mappa interattiva**: utilizzo di `react-native-maps` per la visualizzazione delle posizioni di consegna.
- **Icone**: utilizzo della libreria di Lucide.

## Versione Offline

Questa versione dell'app è stata adattata per funzionare **offline**, poiché l'API utilizzata durante il progetto sarà eliminata a settembre 2025. I dati sono stati inseriti **hardcoded** per permettere la dimostrazione delle funzionalità senza dipendere dal server originale.

## Requisiti

- Node.js v16+
- Expo CLI (se si utilizza Expo)
- Emulatori Android/iOS o dispositivo fisico (consigliato Pixel 7 API 34)

## Note Finali

Questa app è un prototipo accademico e non è destinata all'uso in produzione. Tutti i dati  sono fittizi e non vengono utilizzati sistemi di sicurezza avanzati.


