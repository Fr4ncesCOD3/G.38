// Importiamo le costanti delle azioni che useremo in questo reducer
import { SET_USER, LOGOUT } from '../actions/actionTypes'

// Stato iniziale del reducer - null significa nessun utente loggato
const initialState = null

// Il reducer è una funzione che prende lo stato corrente e un'azione
// e restituisce il nuovo stato in base all'azione ricevuta
const userReducer = (state = initialState, action) => {
  // Usiamo uno switch per gestire i diversi tipi di azioni
  switch (action.type) {
    case SET_USER:
      // Quando riceviamo SET_USER, salviamo i dati dell'utente (payload)
      return action.payload
    case LOGOUT:
      // Quando riceviamo LOGOUT, resettiamo lo stato a null
      return null
    default:
      // Se riceviamo un'azione che non ci interessa, restituiamo lo stato invariato
      return state
  }
}

// Esportiamo il reducer per usarlo nello store Redux
export default userReducer 