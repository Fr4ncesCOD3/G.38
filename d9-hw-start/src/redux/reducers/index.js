// Importiamo la funzione combineReducers da Redux che ci permette di unire più reducer in uno solo
import { combineReducers } from 'redux';
// Importiamo i nostri reducer individuali dai rispettivi file
import favouritesReducer from './favourites';
import searchResultsReducer from './searchResults';
import userReducer from './user';

// Creiamo il reducer principale (root) combinando tutti i reducer individuali
// Ogni reducer gestirà una parte specifica dello stato dell'applicazione:
// - favouritesReducer: gestisce l'elenco dei preferiti
// - searchResultsReducer: gestisce i risultati della ricerca
// - userReducer: gestisce i dati dell'utente loggato
const rootReducer = combineReducers({
  favourites: favouritesReducer,
  searchResults: searchResultsReducer,
  user: userReducer
  // Aggiungi altri reducer qui se necessario
});

// Esportiamo il reducer principale per usarlo nella configurazione dello store Redux
export default rootReducer;
