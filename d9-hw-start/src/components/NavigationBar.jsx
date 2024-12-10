// Importiamo i componenti necessari da React Bootstrap per creare la barra di navigazione
// Container: un contenitore che centra e aggiunge margini al contenuto
// Nav: il componente base per creare menu di navigazione
// Navbar: la barra di navigazione principale
// NavDropdown: un menu a tendina per raggruppare più link
// Image: componente per mostrare immagini in modo ottimizzato
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'

// Link: permette di creare link tra le pagine senza ricaricare la pagina
// useNavigate: un hook che permette di cambiare pagina via codice
import { Link, useNavigate } from 'react-router-dom'

// useSelector: hook per leggere dati dallo store Redux
// useDispatch: hook per inviare azioni allo store Redux
import { useSelector, useDispatch } from 'react-redux'

// Questo è il componente principale della barra di navigazione
const NavigationBar = () => {
  // Leggiamo i dati dell'utente dallo store Redux
  // Se non c'è un utente loggato, user sarà null
  const user = useSelector(state => state.user)
  
  // dispatch è una funzione che usiamo per inviare azioni a Redux
  // è come un postino che consegna messaggi allo store
  const dispatch = useDispatch()
  
  // navigate è una funzione che usiamo per cambiare pagina
  // esempio: navigate('/profile') ci porta alla pagina del profilo
  const navigate = useNavigate()

  // Questa funzione viene chiamata quando l'utente clicca su "Logout"
  const handleLogout = () => {
    // Inviamo un'azione a Redux per dire che l'utente sta facendo logout
    dispatch({ type: 'LOGOUT' })
    // Dopo il logout, riportiamo l'utente alla home page
    navigate('/')
  }

  return (
    // La Navbar principale con sfondo bianco e una leggera ombra
    // expand="lg" significa che il menu si espande su schermi grandi
    <Navbar bg="white" expand="lg" className="mb-3 shadow-sm">
      <Container>
        {/* Il logo di LinkedIn che funziona anche come link alla home */}
        <Navbar.Brand as={Link} to="/">
          <img 
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.freepnglogos.com%2Fuploads%2Fofficial-linkedin-logo----17.png&f=1&nofb=1&ipt=e5d433ce22edaadac1189f0bc3c465cfa3c82f0ae447e48341476007d7eca99f&ipo=images" 
            alt="LinkedIn"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        {/* Il pulsante che appare su mobile per aprire/chiudere il menu */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Questa parte si nasconde dietro il pulsante hamburger su mobile */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Links principali a sinistra */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/jobs">Lavori</Nav.Link>
          </Nav>
          {/* Menu utente sulla destra */}
          <Nav>
            {/* Usiamo un operatore ternario per mostrare contenuti diversi in base allo stato dell'utente
                Se user esiste (utente loggato) mostriamo il menu dropdown
                Altrimenti mostriamo il link per accedere */}
            {user ? (
              <NavDropdown 
                title={
                  <Image 
                    src={user.avatar || 'https://via.placeholder.com/30'} 
                    roundedCircle 
                    width={30} 
                    height={30}
                  />
                } 
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/profile">Profilo</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/favourites">Preferiti</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">Accedi</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

// Esportiamo il componente per poterlo importare in altre parti dell'applicazione
export default NavigationBar 