// Qui importiamo le parti di React Bootstrap che ci servono per costruire la nostra interfaccia
// Badge = per mostrare piccole etichette colorate
import { Row, Col, Button, Badge } from 'react-bootstrap'

// Link ci permette di creare collegamenti tra le pagine della nostra app
import { Link } from 'react-router-dom'

// Questi strumenti ci servono per parlare con Redux, il nostro "magazzino" di dati
// useDispatch = per inviare messaggi a Redux
// useSelector = per leggere dati da Redux
import { useDispatch, useSelector } from 'react-redux'

// Questo è il nostro componente Job che mostra le informazioni di un lavoro
// data contiene tutte le informazioni del lavoro che vogliamo mostrare
const Job = ({ data }) => {
  // Prepariamo dispatch che useremo per inviare messaggi a Redux
  const dispatch = useDispatch()
  
  // Andiamo a prendere la lista dei preferiti da Redux
  const favourites = useSelector(state => state.favourites.favourites)
  
  // Prendiamo le informazioni dell'utente da Redux
  const user = useSelector(state => state.user)
  
  // Controlliamo se questa azienda è tra i preferiti dell'utente
  const isFavourite = favourites.includes(data.company_name)

  // Questa funzione viene chiamata quando clicchiamo sul pulsante dei preferiti
  const handleFavouriteToggle = () => {
    // Se non c'è un utente loggato, mostriamo un messaggio
    if (!user) {
      alert("Devi essere loggato per salvare nei preferiti.")
      return
    }
    // Inviamo un messaggio a Redux per aggiungere o rimuovere dai preferiti
    dispatch({
      type: isFavourite ? 'REMOVE_FROM_FAVOURITES' : 'ADD_TO_FAVOURITES',
      payload: data.company_name
    })
  }

  return (
    // Creiamo una riga dove metteremo tutte le informazioni del lavoro
    <Row className="align-items-center">
      {/* Questa colonna contiene il nome dell'azienda e i dettagli del lavoro */}
      <Col xs={12} md={8}>
        <h5 className="mb-1">
          {/* Quando clicchiamo sul nome dell'azienda, andiamo alla sua pagina */}
          <Link to={`/${data.company_name}`} className="text-decoration-none">
            {data.company_name}
          </Link>
        </h5>
        {/* Mostriamo il titolo del lavoro in grigio */}
        <h6 className="mb-2 text-muted">{data.title}</h6>
        <div>
          {/* Queste sono le etichette colorate che mostrano il tipo di lavoro e la categoria */}
          <Badge bg="secondary" className="me-2">{data.job_type}</Badge>
          <Badge bg="info">{data.category}</Badge>
        </div>
      </Col>
      {/* Questa colonna contiene i pulsanti per interagire con l'offerta di lavoro */}
      <Col xs={12} md={4} className="text-md-end mt-3 mt-md-0">
        {/* Pulsante per aggiungere o rimuovere dai preferiti */}
        <Button 
          variant={isFavourite ? "danger" : "outline-danger"} // Cambia colore se è nei preferiti
          size="sm"
          className="me-2"
          onClick={handleFavouriteToggle}
        >
          {/* Mostra un cuore pieno se è nei preferiti, vuoto se non lo è */}
          {isFavourite ? '❤️' : '🤍'}
        </Button>
        {/* Pulsante per candidarsi che apre il sito dell'azienda in una nuova finestra */}
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

// Rendiamo il nostro componente disponibile per essere usato in altre parti dell'app
export default Job
