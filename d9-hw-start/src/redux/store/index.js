// Importiamo configureStore da Redux Toolkit che ci aiuta a creare lo store
import { configureStore } from '@reduxjs/toolkit'
// Importiamo il nostro reducer principale che gestisce lo stato dell'app
import mainReducer from '../reducers'

// Creiamo un middleware personalizzato per loggare le azioni e i cambiamenti di stato
// (Un middleware è una funzione che viene eseguita tra il dispatch di un'azione e il reducer)
const loggerMiddleware = store => next => action => {
  // Logghiamo l'azione che sta per essere eseguita
  console.log('Dispatching:', action)
  // Logghiamo lo stato prima che l'azione venga eseguita
  console.log('Stato precedente:', store.getState())
  // Eseguiamo l'azione e salviamo il risultato
  const result = next(action)
  // Logghiamo il nuovo stato dopo che l'azione è stata eseguita
  console.log('Nuovo stato:', store.getState())
  // Restituiamo il risultato dell'azione
  return result
}

// Creiamo lo store Redux usando configureStore
const store = configureStore({
  // Specifichiamo il reducer principale che gestirà lo stato
  reducer: mainReducer,
  // Aggiungiamo il nostro middleware di logging a quelli predefiniti
  // getDefaultMiddleware() ottiene i middleware predefiniti di Redux Toolkit
  // concat() aggiunge il nostro middleware personalizzato alla lista
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(loggerMiddleware)
})

// Esportiamo lo store per usarlo nell'app
export default store
