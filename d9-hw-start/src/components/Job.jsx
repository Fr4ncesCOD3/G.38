// Importiamo i componenti necessari da React Bootstrap per il layout e gli elementi UI
import { Row, Col, Button, Badge } from 'react-bootstrap'
// Importiamo Link da React Router per la navigazione tra pagine
import { Link } from 'react-router-dom'
// Importiamo gli hook di Redux per gestire lo stato globale
import { useDispatch, useSelector } from 'react-redux'

// Componente Job che riceve i dati del lavoro come prop
const Job = ({ data }) => {
  // Otteniamo la funzione dispatch per inviare azioni a Redux
  const dispatch = useDispatch()
  // Otteniamo l'array dei preferiti dallo store Redux
  const favourites = useSelector(state => state.favourites)
  // Controlliamo se questa azienda è tra i preferiti
  const isFavourite = favourites.includes(data.company_name)

  return (
    // Riga con allineamento verticale centrato
    <Row className="align-items-center">
      {/* Colonna principale che occupa 8/12 su desktop e 12/12 su mobile */}
      <Col xs={12} md={8}>
        <h5 className="mb-1">
          {/* Link al dettaglio dell'azienda, senza decorazione del testo */}
          <Link to={`/${data.company_name}`} className="text-decoration-none">
            {data.company_name}
          </Link>
        </h5>
        {/* Titolo del lavoro in grigio */}
        <h6 className="mb-2 text-muted">{data.title}</h6>
        <div>
          {/* Badge per il tipo di lavoro e la categoria */}
          <Badge bg="secondary" className="me-2">{data.job_type}</Badge>
          <Badge bg="info">{data.category}</Badge>
        </div>
      </Col>
      {/* Colonna dei pulsanti che occupa 4/12 su desktop e 12/12 su mobile */}
      <Col xs={12} md={4} className="text-md-end mt-3 mt-md-0">
        {/* Pulsante per aggiungere/rimuovere dai preferiti */}
        <Button 
          variant={isFavourite ? "danger" : "outline-danger"} // Cambia stile in base allo stato
          size="sm"
          className="me-2"
          onClick={() => dispatch({
            // Invia l'azione appropriata a Redux
            type: isFavourite ? 'REMOVE_FROM_FAVOURITES' : 'ADD_TO_FAVOURITES',
            payload: data.company_name
          })}
        >
          {/* Mostra cuore pieno o vuoto in base allo stato */}
          {isFavourite ? '❤️' : '🤍'}
        </Button>
        {/* Pulsante per candidarsi che apre il link in una nuova tab */}
        <Button 
          variant="primary" 
          size="sm"
          href={data.url}
          target="_blank"
        >
          Candidati
        </Button>
      </Col>
    </Row>
  )
}

// Esportiamo il componente per usarlo in altre parti dell'app
export default Job
