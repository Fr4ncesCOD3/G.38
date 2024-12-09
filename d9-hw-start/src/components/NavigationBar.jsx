// Importiamo i componenti necessari da React Bootstrap per creare la barra di navigazione
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'
// Importiamo i componenti per la navigazione e il routing
import { Link, useNavigate } from 'react-router-dom'
// Importiamo gli hook di Redux per gestire lo stato globale
import { useSelector, useDispatch } from 'react-redux'

// Componente per la barra di navigazione
const NavigationBar = () => {
  // Otteniamo i dati dell'utente dallo store Redux
  const user = useSelector(state => state.user)
  // Otteniamo la funzione dispatch per inviare azioni a Redux
  const dispatch = useDispatch()
  // Otteniamo la funzione navigate per la navigazione programmatica
  const navigate = useNavigate()

  // Funzione che gestisce il logout dell'utente
  const handleLogout = () => {
    // Inviamo l'azione di logout a Redux
    dispatch({ type: 'LOGOUT' })
    // Reindirizziamo l'utente alla home
    navigate('/')
  }

  return (
    // Navbar con sfondo bianco, espandibile su schermi grandi e ombreggiatura
    <Navbar bg="white" expand="lg" className="mb-3 shadow-sm">
      <Container>
        {/* Logo di LinkedIn che porta alla home quando cliccato */}
        <Navbar.Brand as={Link} to="/">
          <img 
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.freepnglogos.com%2Fuploads%2Fofficial-linkedin-logo----17.png&f=1&nofb=1&ipt=e5d433ce22edaadac1189f0bc3c465cfa3c82f0ae447e48341476007d7eca99f&ipo=images" 
            alt="LinkedIn"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        {/* Pulsante hamburger per menu mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Contenuto della navbar che si collassa su mobile */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Links di navigazione principali */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/jobs">Lavori</Nav.Link>
          </Nav>
          {/* Menu utente sulla destra */}
          <Nav>
            {/* Mostra menu dropdown se l'utente è loggato, altrimenti mostra login/signup */}
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
              <>
                <Nav.Link as={Link} to="/login">Accedi</Nav.Link>
                <Nav.Link as={Link} to="/signup">Registrati</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

// Esportiamo il componente per usarlo in altre parti dell'app
export default NavigationBar 