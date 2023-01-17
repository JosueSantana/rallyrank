import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <Container fluid>
      <Row className="gx-1">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">RallyRank</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="testy" href="/match-me">Match Me</Nav.Link>
              <Nav.Link href="/opponents">Find an Opponent</Nav.Link>
              <Nav.Link href="/buddies">Buddies</Nav.Link>
              <Nav.Link href="/scoreboard">Scoreboard</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/profile">My Profile</Nav.Link>
              <Nav.Link href="/settings">Settings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
    </Container>
  );
}

export default Header;
