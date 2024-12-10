// Importiamo i componenti di React Bootstrap che ci servono per creare una bella interfaccia
// Container = un contenitore che tiene tutto ordinato
// Row = una riga che può contenere colonne
// Col = una colonna che può contenere contenuto
// Form = per creare moduli da compilare
// Button = per creare pulsanti cliccabili
// Card = un riquadro con bordi e ombra per raggruppare contenuti
// Modal = una finestra che appare sopra la pagina
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap'

// useState è una funzione speciale di React che ci permette di salvare dati che possono cambiare
import { useState } from 'react'

// useDispatch è una funzione che ci permette di inviare messaggi a Redux (il nostro "magazzino" di dati)
import { useDispatch } from 'react-redux'

// useNavigate ci permette di cambiare pagina quando vogliamo
import { useNavigate } from 'react-router-dom'

// Questo è il nostro componente Login - è come una pagina web dove gli utenti possono accedere
const Login = () => {
  // Creiamo delle "scatole" dove salvare l'email e la password che l'utente scrive
  // setEmail e setPassword sono funzioni che useremo per aggiornare questi valori
  const [email, setEmail] = useState('') // All'inizio l'email è vuota
  const [password, setPassword] = useState('') // All'inizio la password è vuota
  const [showModal, setShowModal] = useState(false) // Questo controlla se mostrare il messaggio di benvenuto
  
  // Prepariamo la funzione dispatch che useremo per inviare dati a Redux
  const dispatch = useDispatch()
  // Prepariamo la funzione navigate che useremo per cambiare pagina
  const navigate = useNavigate()

  // Questa funzione viene chiamata quando l'utente clicca su "Accedi"
  const handleSubmit = (e) => {
    e.preventDefault() // Questo impedisce alla pagina di ricaricarsi quando inviamo il form
    // Qui fingiamo di fare il login - in un'app vera qui ci collegheremmo a un server
    dispatch({
      type: 'SET_USER', // Diciamo a Redux che stiamo impostando un nuovo utente
      payload: {
        email, // Usiamo l'email che l'utente ha scritto
        name: 'Utente Demo', // Per ora usiamo un nome fisso
        avatar: 'https://via.placeholder.com/150' // E un'immagine del profilo fissa
      }
    })
    
    // Mostriamo il messaggio di benvenuto
    setShowModal(true)
  }

  // Questa funzione viene chiamata quando chiudiamo il messaggio di benvenuto
  const handleCloseModal = () => {
    setShowModal(false) // Nascondiamo il messaggio
    navigate('/') // Andiamo alla pagina principale
  }

  return (
    // Container è come una scatola che tiene tutto in ordine
    <Container className="my-5">
      {/* Row è una riga che centra il contenuto orizzontalmente */}
      <Row className="justify-content-center">
        {/* Col è una colonna che occupa metà dello spazio su schermi grandi */}
        <Col md={6}>
          {/* Card è come un foglio di carta con un'ombra */}
          <Card>
            <Card.Body>
              {/* Il titolo della nostra pagina di login */}
              <h2 className="text-center mb-4">Accedi</h2>
              {/* Form è il modulo che l'utente deve compilare */}
              <Form onSubmit={handleSubmit}>
                {/* Questo è il gruppo per l'input dell'email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" // Questo dice che vogliamo un'email
                    value={email} // Il valore corrente dell'email
                    onChange={(e) => setEmail(e.target.value)} // Quando l'utente scrive, aggiorniamo l'email
                    required // L'utente deve compilare questo campo
                  />
                </Form.Group>
                {/* Questo è il gruppo per l'input della password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" // Questo nasconde la password mentre viene scritta
                    value={password} // Il valore corrente della password
                    onChange={(e) => setPassword(e.target.value)} // Quando l'utente scrive, aggiorniamo la password
                    required // L'utente deve compilare questo campo
                  />
                </Form.Group>
                {/* Il pulsante per inviare il form */}
                <Button variant="primary" type="submit" className="w-100">
                  Accedi
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Questo è il messaggio di benvenuto che appare dopo il login */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Benvenuto!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Sei pronto per iniziare la tua ricerca del lavoro dei sogni?</p>
          <p>Esplora le offerte disponibili e salva quelle che ti interessano nei preferiti!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Inizia a cercare
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

// Rendiamo il nostro componente Login disponibile per altre parti dell'applicazione
export default Login 