// Questo file contiene tutte le costanti che identificano i tipi di azioni in Redux
// Le azioni sono come "etichette" che dicono a Redux quale operazione deve eseguire

// Azione per aggiungere un'azienda ai preferiti
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';

// Azione per rimuovere un'azienda dai preferiti
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';

// Azione per salvare i dati dell'utente quando fa il login
export const SET_USER = 'SET_USER';

// Azione per cancellare i dati dell'utente quando fa il logout
export const LOGOUT = 'LOGOUT';

// Azione per gestire e mostrare messaggi di errore nell'applicazione
export const SET_ERROR = 'SET_ERROR';

// Azione per salvare i risultati di una ricerca
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';