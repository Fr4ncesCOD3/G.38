// Importiamo i componenti necessari da React Bootstrap per il layout e l'interfaccia utente
import { Container, Row, Col, ListGroup, Button, Alert } from 'react-bootstrap'
// Importiamo gli hook di Redux per gestire lo stato globale
import { useSelector, useDispatch } from 'react-redux'
// Importiamo Link da React Router per la navigazione
import { Link } from 'react-router-dom'

// Componente che mostra la lista delle aziende preferite
const Favourites = () => {
  // Otteniamo l'array dei preferiti dallo store Redux
  const favourites = useSelector(state => state.favourites)
  // Otteniamo la funzione dispatch per inviare azioni a Redux
  const dispatch = useDispatch()

  // Funzione per rimuovere un'azienda dai preferiti
  const handleRemove = (companyName) => {
    // Inviamo un'azione a Redux per rimuovere l'azienda
    dispatch({
      type: 'REMOVE_FROM_FAVOURITES',
      payload: companyName
    })
  }

  return (
    // Container principale per il layout
    <Container>
      <Row>
        {/* Colonna centrale che occupa 10/12 dello spazio disponibile */}
        <Col xs={10} className="mx-auto my-3">
          <h1 className="display-4">Aziende Preferite</h1>
          {/* Controlliamo se ci sono preferiti da mostrare */}
          {favourites.length > 0 ? (
            // Se ci sono preferiti, mostriamo una lista
            <ListGroup>
              {/* Mappiamo ogni azienda in un elemento della lista */}
              {favourites.map((company, i) => (
                <ListGroup.Item key={i} className="d-flex justify-content-between align-items-center">
                  {/* Link cliccabile con il nome dell'azienda */}
                  <Link to={`/${company}`}>{company}</Link>
                  {/* Pulsante per rimuovere l'azienda dai preferiti */}
                  <Button 
                    variant="danger"
                    onClick={() => handleRemove(company)}
                  >
                    Rimuovi
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            // Se non ci sono preferiti, mostriamo un messaggio informativo
            <Alert variant="info">
              Non hai ancora aggiunto aziende ai preferiti. Torna alla <Link to="/">home</Link> per cercarne alcune!
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  )
}

// Esportiamo il componente per usarlo in altre parti dell'app
export default Favourites 