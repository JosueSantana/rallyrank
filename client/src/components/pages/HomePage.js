import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './home-page.css';

function HomePage() {
  return (
    <Container fluid className="overflow-hidden px-0">
      <section className="py-5 text-center splash-section-a-background">
        <div className="py-5 m-5">
          <h1 className="display-4 fw-bold splash-section-a-text">Bringing Tennis to Everyone</h1>
          <p className="fs-3 splash-section-a-text">
            Find other players looking to play in your city. No matter your
            experience level or age, there's a tennis buddy out there for you!
          </p>
        </div>
      </section>
      <Container fluid className="py-5 splash-section-c-background">
        <Row className="py-5">
          <Col>
            <h2 className="display-5">Leave it to Us...</h2>
            <p className="fs-4">
              We will match you with the best fits based on your preferences.
              Pick and choose at your own leisure by choosing to send a buddy
              request or scrolling past to the next suggestion.
            </p>
          </Col>
          <Col>Image here</Col>
        </Row>
      </Container>
      <Container fluid className="py-5 text-end splash-section-b-background">
        <Row className="py-5">
          <Col>Image here</Col>
          <Col>
            <h2 className="display-5">...or Take the Lead!</h2>
            <p className="fs-4">
              Browse through a list of players in your city and pick your
              choice. Toggle through various filters to narrow down your search.
            </p>
          </Col>
        </Row>
      </Container>
      <Container fluid className="py-5 splash-section-c-background">
        <Row className="py-5">
          <Col>
            <h2 className="display-5">See How You Stack Up!</h2>
            <p className="fs-4">
              Browse the scoreboard to see how you rank against players in your
              city. Choose the 'Friends' view to see who among your friends sits
              at the top!
            </p>
          </Col>
          <Col className="text-center">Image here</Col>
        </Row>
      </Container>
    </Container>
  );
}

export default HomePage;
