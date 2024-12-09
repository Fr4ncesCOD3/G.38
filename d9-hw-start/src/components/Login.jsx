// Importiamo i componenti necessari da React Bootstrap per creare il form di login
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
// Importiamo useState per gestire lo stato del form
import { useState } from 'react'
// Importiamo useDispatch per inviare azioni a Redux
import { useDispatch } from 'react-redux'
// Importiamo useNavigate per la navigazione programmatica
import { useNavigate } from 'react-router-dom'

// Componente Login che gestisce il form di accesso
const Login = () => {
  // Creiamo due stati per email e password usando useState
  const [email, setEmail] = useState('') // Stato per l'email
  const [password, setPassword] = useState('') // Stato per la password
  
  // Otteniamo la funzione dispatch per inviare azioni a Redux
  const dispatch = useDispatch()
  // Otteniamo la funzione navigate per cambiare pagina
  const navigate = useNavigate()

  // Funzione che gestisce l'invio del form
  const handleSubmit = (e) => {
    e.preventDefault() // Preveniamo il comportamento di default del form
    // Simula login - in un'app reale, qui faresti una chiamata API
    dispatch({
      type: 'SET_USER', // Azione per impostare i dati utente
      payload: {
        email, // Usiamo l'email inserita
        name: 'Utente Demo', // Nome demo fisso
        avatar: 'https://via.placeholder.com/150' // Avatar demo fisso
      }
    })
    navigate('/profile') // Dopo il login, andiamo alla pagina profilo
  }

  return (
    // Container principale con margine verticale
    <Container className="my-5">
      {/* Riga centrata */}
      <Row className="justify-content-center">
        {/* Colonna che occupa metà larghezza su desktop */}
        <Col md={6}>
          {/* Card per contenere il form */}
          <Card>
            <Card.Body>
              {/* Titolo del form */}
              <h2 className="text-center mb-4">Accedi</h2>
              {/* Form che chiama handleSubmit quando viene inviato */}
              <Form onSubmit={handleSubmit}>
                {/* Gruppo per il campo email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" // Input di tipo email
                    value={email} // Valore controllato dallo stato
                    onChange={(e) => setEmail(e.target.value)} // Aggiorna lo stato
                    required // Campo obbligatorio
                  />
                </Form.Group>
                {/* Gruppo per il campo password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" // Input di tipo password (nascosto)
                    value={password} // Valore controllato dallo stato
                    onChange={(e) => setPassword(e.target.value)} // Aggiorna lo stato
                    required // Campo obbligatorio
                  />
                </Form.Group>
                {/* Pulsante di invio che occupa tutta la larghezza */}
                <Button variant="primary" type="submit" className="w-100">
                  Accedi
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

// Esportiamo il componente per usarlo in altre parti dell'app
export default Login 