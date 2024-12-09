// Importiamo i componenti necessari da React Bootstrap per creare l'interfaccia
import { Container, Row, Col, Card, Button, ListGroup, Nav, Tab } from 'react-bootstrap'
// Importiamo gli hook di Redux per gestire lo stato globale
import { useSelector, useDispatch } from 'react-redux'
// Importiamo i componenti per la navigazione
import { Link, useNavigate } from 'react-router-dom'
// Importiamo l'hook useEffect per eseguire effetti collaterali
import { useEffect } from 'react'

// Componente principale della pagina utente
const UserPage = () => {
  // Otteniamo i dati dell'utente dallo store Redux
  const user = useSelector(state => state.user)
  // Otteniamo l'array dei preferiti dallo store Redux
  const favourites = useSelector(state => state.favourites)
  // Otteniamo la funzione dispatch per inviare azioni a Redux
  const dispatch = useDispatch()
  // Otteniamo la funzione navigate per la navigazione programmatica
  const navigate = useNavigate()

  // Effetto che controlla se l'utente è loggato, altrimenti reindirizza al login
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  // Funzione che gestisce il logout dell'utente
  const handleLogout = () => {
    // Invia l'azione di logout a Redux
    dispatch({ type: 'LOGOUT' })
    // Reindirizza alla home
    navigate('/')
  }

  // Se non c'è un utente, non mostra nulla
  if (!user) return null

  return (
    // Container principale con sfondo chiaro e padding
    <Container fluid className="bg-light min-vh-100 py-5">
      <Container>
        <Row>
          {/* Colonna sinistra con i dati del profilo */}
          <Col lg={4} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                {/* Sezione immagine profilo */}
                <div className="mb-4">
                  <img
                    src={user.avatar || 'https://via.placeholder.com/150'}
                    alt={user.name}
                    className="rounded-circle img-thumbnail"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                </div>
                {/* Informazioni utente */}
                <h3 className="mb-0">{user.name}</h3>
                <p className="text-muted">{user.email}</p>
                <p className="mb-4">{user.bio || 'Nessuna biografia disponibile'}</p>
                {/* Pulsanti azioni profilo */}
                <div className="d-grid gap-2">
                  <Button variant="outline-primary">Modifica Profilo</Button>
                  <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* Colonna destra con tab di navigazione */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                {/* Container per le tab con preferiti come tab attiva di default */}
                <Tab.Container defaultActiveKey="favourites">
                  {/* Menu di navigazione tra le tab */}
                  <Nav variant="tabs" className="mb-4">
                    <Nav.Item>
                      <Nav.Link eventKey="favourites">Aziende Preferite</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="applications">Candidature</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  {/* Contenuto delle tab */}
                  <Tab.Content>
                    {/* Tab dei preferiti */}
                    <Tab.Pane eventKey="favourites">
                      {/* Mostra la lista se ci sono preferiti, altrimenti mostra messaggio */}
                      {favourites.length > 0 ? (
                        <ListGroup variant="flush">
                          {/* Mappa l'array dei preferiti per mostrare ogni azienda */}
                          {favourites.map((company, i) => (
                            <ListGroup.Item 
                              key={i}
                              className="d-flex justify-content-between align-items-center py-3"
                            >
                              <div>
                                <h6 className="mb-0">
                                  <Link to={`/${company}`} className="text-decoration-none">
                                    {company}
                                  </Link>
                                </h6>
                              </div>
                              {/* Pulsante per rimuovere dai preferiti */}
                              <Button 
                                variant="outline-danger"
                                size="sm"
                                onClick={() => dispatch({
                                  type: 'REMOVE_FROM_FAVOURITES',
                                  payload: company
                                })}
                              >
                                Rimuovi
                              </Button>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      ) : (
                        // Messaggio quando non ci sono preferiti
                        <div className="text-center py-5 text-muted">
                          <p>Non hai ancora aggiunto aziende ai preferiti</p>
                          <Link to="/" className="btn btn-primary">
                            Cerca Aziende
                          </Link>
                        </div>
                      )}
                    </Tab.Pane>
                    {/* Tab delle candidature */}
                    <Tab.Pane eventKey="applications">
                      {/* Messaggio quando non ci sono candidature */}
                      <div className="text-center py-5 text-muted">
                        <p>Non hai ancora inviato candidature</p>
                        <Link to="/" className="btn btn-primary">
                          Cerca Lavori
                        </Link>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default UserPage
