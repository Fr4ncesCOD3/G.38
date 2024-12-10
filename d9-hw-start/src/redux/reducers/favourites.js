// Importiamo le azioni che useremo in questo reducer
import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../actions/actionTypes';

// Definiamo lo stato iniziale: un oggetto con un array vuoto di preferiti
const initialState = {
  favourites: []
};

// Il reducer è una funzione che gestisce lo stato dei preferiti
// Prende lo stato attuale e un'azione come parametri
const favouritesReducer = (state = initialState, action) => {
  // Usiamo uno switch per gestire i diversi tipi di azioni
  switch (action.type) {
    case ADD_TO_FAVOURITES:
      // Quando aggiungiamo un preferito:
      return {
        ...state, // Manteniamo le altre proprietà dello stato
        favourites: state.favourites.includes(action.payload)
          ? state.favourites // Se esiste già, non lo aggiungiamo di nuovo
          : [...state.favourites, action.payload] // Altrimenti lo aggiungiamo alla fine
      };
    case REMOVE_FROM_FAVOURITES:
      // Quando rimuoviamo un preferito:
      return {
        ...state, // Manteniamo le altre proprietà dello stato
        // Filtriamo l'array rimuovendo l'azienda specificata nel payload
        favourites: state.favourites.filter(company => company !== action.payload)
      };
    default:
      // Se riceviamo un'azione che non ci interessa, restituiamo lo stato invariato
      return state;
  }
};

// Esportiamo il reducer per usarlo nello store Redux
export default favouritesReducer;
