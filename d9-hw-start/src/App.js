// Importiamo gli stili di Bootstrap e il nostro CSS personalizzato
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Importiamo tutti i componenti che useremo nell'app
import MainSearch from "./components/MainSearch"; // Componente per la ricerca principale
import CompanySearchResults from "./components/CompanySearchResults"; // Mostra i risultati della ricerca per azienda
import Favourites from "./components/Favourites"; // Mostra i preferiti dell'utente
import NavigationBar from "./components/NavigationBar"; // La barra di navigazione in alto
import UserPage from "./components/UserPage"; // La pagina del profilo utente
import Login from "./components/Login"; // La pagina di login

// Importiamo i componenti necessari per il routing da react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importiamo il nostro hook personalizzato per loggare lo stato Redux
import useStoreLogger from './hooks/useStoreLogger'

function App() {
  // Usiamo l'hook per loggare i cambiamenti dello store Redux
  useStoreLogger()

  return (
    // BrowserRouter è il contenitore principale per il routing
    <BrowserRouter>
      {/* NavigationBar sarà sempre visibile in tutte le pagine */}
      <NavigationBar />
      
      {/* Routes contiene tutte le possibili route dell'applicazione */}
      <Routes>
        {/* Route per la homepage con la ricerca principale */}
        <Route path="/" element={<MainSearch />} />
        {/* Route dinamica per i risultati di ricerca di un'azienda specifica */}
        <Route path="/:company" element={<CompanySearchResults />} />
        {/* Route per la pagina dei preferiti */}
        <Route path="/favourites" element={<Favourites />} />
        {/* Route per la pagina del profilo utente */}
        <Route path="/profile" element={<UserPage />} />
        {/* Route per la pagina di login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

// Esportiamo il componente App per usarlo come radice dell'applicazione
export default App;
