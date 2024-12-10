// Importiamo l'azione SET_SEARCH_RESULTS che useremo in questo reducer
import { SET_SEARCH_RESULTS } from '../actions/actionTypes';

// Definiamo lo stato iniziale del reducer - un oggetto con un array vuoto
const initialState = {
  searchResults: []
};

// Il reducer è una funzione che prende lo stato attuale e un'azione
// e restituisce il nuovo stato in base all'azione ricevuta
const searchResultsReducer = (state = initialState, action) => {
  // Usiamo uno switch per gestire i diversi tipi di azioni
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      // Quando riceviamo SET_SEARCH_RESULTS, aggiorniamo i risultati della ricerca
      // ...state mantiene eventuali altre proprietà dello stato
      // searchResults viene aggiornato con i nuovi risultati (payload)
      return {
        ...state,
        searchResults: action.payload
      };
    default:
      // Se riceviamo un'azione che non ci interessa, restituiamo lo stato invariato
      return state;
  }
};

// Esportiamo il reducer per usarlo nello store Redux
export default searchResultsReducer; 