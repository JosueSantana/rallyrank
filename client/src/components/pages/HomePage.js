import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function HomePage() {
  return (
    <Container className="overflow-hidden">
      <section className="py-5 my-5 text-center">
        <div className="py-5">
          <h1 className="display-4 fw-bold">Bringing Tennis to Everyone</h1>
          <p className="fs-3">
            Find other players looking to play in your city. No matter your
            experience level or age, there's a tennis buddy out there for you!
          </p>
        </div>
      </section>
      <Container className="py-5 my-5">
        <Row>
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
      <Container className="py-5 my-5 text-end">
        <Row>
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
      <Container className="py-5 my-5">
        <Row>
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
