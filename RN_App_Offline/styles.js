// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Stili per la schermata Home
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007bff',
  },
  appName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileButton: {
    color: '#fff',
    fontSize: 16,
  },
  list: {
    paddingBottom: 20, // Spazio in basso per evitare sovrapposizione con il tasto di aggiornamento
  },
  refreshButton: {
    padding: 15,
    backgroundColor: '#007bff',
    alignItems: 'center',
    marginBottom: 10, // Margine inferiore per distanziare dal bordo
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Stili per la card del menù
  card: {
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  deliveryTime: {
    color: '#444',
    marginVertical: 5,
  },
  detailsButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20, // Spazio in basso per evitare sovrapposizione con il tasto di aggiornamento
  },
  refreshButton: {
    padding: 15,
    backgroundColor: '#007bff',
    alignItems: 'center',
    marginBottom: 10, // Margine inferiore per distanziare dal bordo
  },

});

export default styles;
