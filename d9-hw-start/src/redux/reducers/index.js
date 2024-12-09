// Stato iniziale dell'applicazione con array vuoto per i preferiti,
// utente non loggato (null), caricamento falso e nessun errore
const initialState = {
  favourites: [], // Array che contiene le aziende preferite
  user: null, // Oggetto utente, null quando non loggato
  isLoading: false, // Indica se c'è un caricamento in corso
  error: null // Contiene eventuali messaggi di errore
}

// Il reducer principale che gestisce tutte le modifiche allo stato
// Prende lo stato corrente e l'azione da eseguire come parametri
const mainReducer = (state = initialState, action) => {
  // Switch che gestisce i diversi tipi di azioni
  switch (action.type) {
    // Quando aggiungiamo un'azienda ai preferiti
    case 'ADD_TO_FAVOURITES':
      return {
        ...state, // Mantiene tutto lo stato precedente
        //payload è il dato che viene passato dall'azione
        favourites: state.favourites.includes(action.payload) 
          ? state.favourites // Se esiste già, lascia l'array com'è
          : [...state.favourites, action.payload] // Altrimenti aggiunge la nuova azienda
      }
    
    // Quando rimuoviamo un'azienda dai preferiti
    case 'REMOVE_FROM_FAVOURITES':
      return {
        ...state,
        // Filtra l'array rimuovendo l'azienda specificata
        favourites: state.favourites.filter(company => company !== action.payload)
      }

    // Quando un utente effettua il login
    case 'SET_USER':
      return {
        ...state,
        user: action.payload // Salva i dati dell'utente
      }

    // Quando un utente effettua il logout
    case 'LOGOUT':
      return {
        ...state,
        user: null, // Rimuove i dati utente
        favourites: [] // Svuota l'array dei preferiti
      }

    // Quando si verifica un errore
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload // Salva il messaggio di errore
      }

    // Se l'azione non corrisponde a nessun caso
    default:
      return state // Ritorna lo stato invariato
  }
}

// Esporta il reducer per utilizzarlo nello store
export default mainReducer
