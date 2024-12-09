// Importiamo gli hook necessari da React e Redux
import { useEffect } from 'react' // useEffect serve per eseguire effetti collaterali
import { useSelector } from 'react-redux' // useSelector serve per leggere lo stato di Redux

// Creiamo un hook personalizzato che logga lo stato dello store Redux
const useStoreLogger = () => {
  // Otteniamo l'intero stato dello store Redux usando useSelector
  // state => state è una funzione che restituisce l'intero stato
  const state = useSelector(state => state)
  
  // useEffect viene eseguito ogni volta che lo stato cambia
  // Il secondo parametro [state] indica che l'effetto si attiva quando state cambia
  useEffect(() => {
    // Logghiamo in console lo stato aggiornato per debugging
    console.log('Store aggiornato:', state)
  }, [state])
}

// Esportiamo l'hook così può essere usato in altri componenti
export default useStoreLogger 