// Importiamo i componenti di React Bootstrap che useremo per costruire l'interfaccia grafica
import { Container, Row, Col, Card, Button, ListGroup, Nav, Tab, Form } from 'react-bootstrap'
// Importiamo gli hook di Redux - useSelector per leggere i dati dallo store e useDispatch per inviare azioni
import { useSelector, useDispatch } from 'react-redux'
// Importiamo i componenti per la navigazione tra le pagine
import { Link, useNavigate } from 'react-router-dom'
// Importiamo gli hook di React - useEffect per eseguire codice quando qualcosa cambia, useState per gestire lo stato locale
import { useEffect, useState } from 'react'

// Questo è il componente principale della pagina del profilo utente
const UserPage = () => {
  // Prendiamo i dati dell'utente dallo store Redux usando useSelector
  const user = useSelector(state => state.user)
  // Prendiamo la lista dei preferiti dallo store Redux
  const favourites = useSelector(state => state.favourites.favourites)
  // dispatch ci permette di inviare azioni a Redux per modificare lo stato
  const dispatch = useDispatch()
  // navigate ci permette di cambiare pagina programmaticamente
  const navigate = useNavigate()

  // Creiamo degli stati locali per gestire i dati del form del profilo
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')

  // Quando l'utente viene caricato, aggiorniamo i campi del form con i suoi dati
  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setEmail(user.email || '')
      setBio(user.bio || '')
      setAvatar(user.avatar || '')
    }
  }, [user]) // Questo effetto si attiva ogni volta che user cambia

  // Se l'utente non è loggato, lo rimandiamo alla pagina di login
  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
  }, [user, navigate])

  // Questa funzione viene chiamata quando l'utente aggiorna il suo profilo
  const handleProfileUpdate = () => {
    // Inviamo un'azione a Redux per aggiornare i dati dell'utente
    dispatch({
      type: 'SET_USER',
      payload: { 
        ...user, // Manteniamo tutti i dati esistenti
        name, // E aggiungiamo quelli nuovi
        email, 
        bio, 
        avatar 
      }
    })
    alert("Profilo aggiornato con successo!")
  }

  // Questa funzione gestisce il logout dell'utente
  const handleLogout = () => {
    // Inviamo l'azione di logout a Redux
    dispatch({ type: 'LOGOUT' })
    // Rimandiamo l'utente alla home
    navigate('/')
  }

  // Se non c'è un utente loggato, non mostriamo nulla
  if (!user) return null

  return (
    // Container principale che occupa tutta l'altezza della pagina
    <Container fluid className="bg-light min-vh-100 py-5">
      <Container>
        <Row>
          {/* Colonna sinistra con il form del profilo */}
          <Col lg={4} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                {/* Sezione per l'immagine del profilo */}
                <div className="mb-4">
                  <img
                    src={avatar || 'https://via.placeholder.com/150'} // Usiamo un'immagine placeholder se non c'è avatar
                    alt={name}
                    className="rounded-circle img-thumbnail"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                </div>
                {/* Form per modificare i dati del profilo */}
                <Form>
                  {/* Campo per il nome */}
                  <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} // Aggiorniamo lo stato quando l'utente scrive
                      placeholder="Inserisci il tuo nome"
                    />
                  </Form.Group>
                  {/* Campo per l'email */}
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Inserisci la tua email"
                    />
                  </Form.Group>
                  {/* Campo per la biografia */}
                  <Form.Group className="mb-3">
                    <Form.Label>Biografia</Form.Label>
                    <Form.Control 
                      as="textarea" // Questo campo è un'area di testo più grande
                      rows={3} 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Racconta qualcosa di te..."
                    />
                  </Form.Group>
                  {/* Campo per l'URL dell'immagine profilo */}
                  <Form.Group className="mb-3">
                    <Form.Label>URL Immagine Profilo</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={avatar} 
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="Inserisci l'URL della tua immagine profilo"
                    />
                  </Form.Group>
                  {/* Pulsante per salvare le modifiche */}
                  <Button 
                    variant="primary" 
                    onClick={handleProfileUpdate}
                    className="w-100 mb-3"
                  >
                    Aggiorna Profilo
                  </Button>
                  {/* Pulsante per il logout */}
                  <Button 
                    variant="outline-danger" 
                    onClick={handleLogout}
                    className="w-100"
                  >
                    Logout
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          {/* Colonna destra con le tab per preferiti e candidature */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                {/* Sistema di tab per navigare tra preferiti e candidature */}
                <Tab.Container defaultActiveKey="favourites">
                  {/* Menu delle tab */}
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
                      {/* Mostriamo la lista dei preferiti se ce ne sono, altrimenti un messaggio */}
                      {favourites.length > 0 ? (
                        <ListGroup variant="flush">
                          {/* Per ogni azienda nei preferiti, creiamo un elemento della lista */}
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
                              {/* Pulsante per rimuovere l'azienda dai preferiti */}
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
                        // Messaggio mostrato quando non ci sono preferiti
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
                      {/* Per ora mostriamo solo un messaggio dato che non abbiamo ancora implementato le candidature */}
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

// Esportiamo il componente per poterlo usare in altre parti dell'app
export default UserPage
