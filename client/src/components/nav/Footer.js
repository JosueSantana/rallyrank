import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

function Footer() {
  return (
    <Container>
      <Row className="py-3 my-4">
        <Col>
          <Nav className="justify-content-center border-bottom pb-3 mb-3">
            <Nav.Item>
              <Nav.Link href="/" className="px-2 text-muted">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/" className="px-2 text-muted">Legal</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/" className="px-2 text-muted">Privacy Policy</Nav.Link>
            </Nav.Item>
          </Nav>
          <p className="text-center text-muted">RallyRank@ 2022</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
