// Importiamo i tipi di azioni che abbiamo definito in actionTypes.js
// Questi sono come etichette che useremo per dire a Redux quale operazione fare
import {
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES, 
  SET_USER,
  LOGOUT,
  SET_ERROR,
  SET_SEARCH_RESULTS
} from './actionTypes';

// Questa funzione crea un'azione per aggiungere un'azienda ai preferiti
// Un'azione in Redux è un semplice oggetto con un 'type' (il tipo di azione)
// e un 'payload' (i dati che vogliamo passare)
export const addToFavourites = (company) => ({
  type: ADD_TO_FAVOURITES,
  payload: company // company è il nome dell'azienda da aggiungere ai preferiti
});

// Simile alla precedente, ma rimuove un'azienda dai preferiti
// Quando questa azione viene gestita dal reducer, l'azienda verrà rimossa dalla lista
export const removeFromFavourites = (company) => ({
  type: REMOVE_FROM_FAVOURITES,
  payload: company
});

// Questa azione viene usata quando un utente fa il login
// Il payload contiene tutte le informazioni dell'utente (email, nome, ecc.)
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

// Azione semplice per il logout - non ha bisogno di payload
// Quando il reducer riceve questa azione, cancellerà i dati dell'utente
export const logout = () => ({
  type: LOGOUT
});

// Questa azione serve per gestire gli errori nell'applicazione
// Il payload è il messaggio di errore che vogliamo mostrare
export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});

// Azione per salvare i risultati di una ricerca
// Il payload contiene l'array dei risultati trovati
export const setSearchResults = (results) => ({
  type: SET_SEARCH_RESULTS,
  payload: results
});

// Questa è una funzione speciale che fa una richiesta API
// È diversa dalle altre perché è "asincrona", cioè deve aspettare una risposta dal server
// Usa 'async/await' per gestire le operazioni asincrone
export const fetchSearchResults = (query) => {
  // Ritorna una funzione che riceve dispatch come parametro
  // dispatch è il modo in cui inviamo azioni a Redux
  return async (dispatch) => {
    try {
      // Fa una richiesta al server con la query di ricerca
      const response = await fetch(`https://api.example.com/search?q=${query}`);
      // Converte la risposta in formato JSON
      const data = await response.json();
      // Invia i risultati a Redux usando l'azione setSearchResults
      dispatch(setSearchResults(data.results));
    } catch (error) {
      // Se qualcosa va storto, invia un'azione di errore
      dispatch(setError(error.message));
    }
  };
};
