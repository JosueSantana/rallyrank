import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

function Footer() {
  return (
    <Container fluid className="splash-footer-background">
      <Row className="py-5">
        <Col>
          <Nav className="justify-content-center border-bottom pb-3 pt-5 mb-3">
            <Nav.Item>
              <Nav.Link href="/" className="px-2 text-muted"><span className="splash-header-text">About</span></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/" className="px-2 text-muted"><span className="splash-header-text">Legal</span></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/" className="px-2 text-muted"><span className="splash-header-text">Privacy Policy</span></Nav.Link>
            </Nav.Item>
          </Nav>
          <p className="text-center text-muted"><span className="splash-header-text">RallyRank © 2023</span></p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
