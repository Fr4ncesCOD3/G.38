// Importiamo gli hook e i componenti necessari
import { useState } from "react"; // useState ci permette di gestire lo stato del componente
import { Container, Row, Col, Form, Card } from "react-bootstrap"; // Componenti di React Bootstrap per il layout
import Job from "./Job"; // Importiamo il componente Job che mostra i dettagli di ogni lavoro

// Componente principale per la ricerca dei lavori
const MainSearch = () => {
  // Definiamo gli stati con useState:
  const [query, setQuery] = useState(""); // Stato per il testo di ricerca
  const [jobs, setJobs] = useState([]); // Stato per l'array dei lavori trovati

  // URL base per le chiamate API
  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?search=";

  // Funzione che gestisce il cambiamento nel campo di ricerca
  const handleChange = e => {
    setQuery(e.target.value); // Aggiorna lo stato query con il nuovo valore
  };

  // Funzione asincrona che gestisce l'invio del form
  const handleSubmit = async e => {
    e.preventDefault(); // Previene il comportamento di default del form
    try {
      // Facciamo la chiamata API concatenando la query di ricerca e limitando a 20 risultati
      const response = await fetch(baseEndpoint + query + "&limit=20");
      if (response.ok) {
        const { data } = await response.json(); // Estraiamo i dati dalla risposta
        setJobs(data); // Aggiorniamo lo stato jobs con i risultati
      } else {
        alert("Error fetching results"); // Mostriamo un alert in caso di errore
      }
    } catch (error) {
      console.log(error); // Logghiamo eventuali errori in console
    }
  };

  return (
    // Container principale con sfondo animato
    <Container 
      fluid 
      className="min-vh-100 position-relative"
      style={{
        backgroundImage: `url('https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXU3ZGpnNXdkdXVpenF5cGE4MGF1Z3Rua3ZmeWRyNmwxbTJoaHJnMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vRcrVqhBVSpJte0/giphy.gif')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay bianco semi-trasparente per migliorare la leggibilità */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          zIndex: 1
        }}
      />
      
      {/* Contenuto principale sopra l'overlay */}
      <Container className="position-relative" style={{ zIndex: 2 }}>
        {/* Sezione di ricerca */}
        <Row className="py-5">
          <Col xs={12} md={8} className="mx-auto text-center">
            <h1 className="display-4 mb-4">Trova il tuo lavoro dei sogni</h1>
            <p className="lead text-muted mb-5">
              Esplora migliaia di opportunità lavorative remote
            </p>
            {/* Form di ricerca */}
            <Form onSubmit={handleSubmit} className="search-form mb-5">
              <Form.Control 
                size="lg"
                type="search" 
                value={query} 
                onChange={handleChange} 
                placeholder="Cerca per ruolo, competenza o azienda"
                className="shadow-sm"
              />
            </Form>
          </Col>
        </Row>
        {/* Lista dei risultati */}
        <Row>
          {/* Mappiamo l'array jobs per mostrare ogni lavoro trovato */}
          {jobs.map(jobData => (
            <Col xs={12} key={jobData._id}>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <Job data={jobData} /> {/* Passiamo i dati del lavoro al componente Job */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

// Esportiamo il componente per usarlo in altre parti dell'app
export default MainSearch;
