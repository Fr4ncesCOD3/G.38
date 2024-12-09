// Importiamo gli hook necessari da React e React Router
import { useEffect, useState } from "react";
// Importiamo i componenti di layout da React Bootstrap
import { Container, Row, Col } from "react-bootstrap";
// Importiamo il componente Job che useremo per mostrare ogni lavoro
import Job from "./Job";
// useParams ci permette di leggere i parametri dall'URL
import { useParams } from "react-router-dom";

// Componente che mostra i risultati della ricerca per azienda
const CompanySearchResults = () => {
  // Stato per memorizzare l'array dei lavori
  const [jobs, setJobs] = useState([]);
  // Otteniamo i parametri dall'URL (in questo caso il nome dell'azienda)
  const params = useParams();

  // URL base per le chiamate API
  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?company=";

  // useEffect viene eseguito al montaggio del componente
  useEffect(() => {
    getJobs();
    // Disabilitiamo l'avviso ESLint per le dipendenze
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Funzione asincrona per recuperare i lavori dall'API
  const getJobs = async () => {
    try {
      // Facciamo la chiamata API concatenando il nome dell'azienda
      const response = await fetch(baseEndpoint + params.company);
      if (response.ok) {
        // Se la risposta è ok, estraiamo i dati e aggiorniamo lo stato
        const { data } = await response.json();
        setJobs(data);
      } else {
        // Se c'è un errore, mostriamo un alert
        alert("Error fetching results");
      }
    } catch (error) {
      // In caso di errori durante la chiamata, li logghiamo in console
      console.log(error);
    }
  };

  // Renderizziamo l'interfaccia
  return (
    <Container>
      <Row>
        <Col className="my-3">
          {/* Mostriamo il nome dell'azienda nel titolo */}
          <h1 className="display-4">Job posting for: {params.company}</h1>
          {/* Mappiamo l'array dei lavori per creare un componente Job per ognuno */}
          {jobs.map(jobData => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;
