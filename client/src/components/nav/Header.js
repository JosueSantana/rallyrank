import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./nav.css";

import { useDispatch, useSelector } from "react-redux";

import {
  registrationOk,
  registrationFailed,
  loginOk,
  loginFailed,
  logout,
  selectSessionToken,
} from "../../slices/authSlice";

function Header() {
  const dispatch = useDispatch();

  const handleLogout = async (event) => {
    const response = await dispatch(logout());
    localStorage.removeItem("sessionToken");
  };

  return (
    <Container fluid className="px-0 splash-header">
      <Row className="gx-1">
        <Navbar expand="lg" className="py-4 px-3 splash-header-background">
          <Navbar.Brand href="/">
            <span className="splash-header-text">RallyRank</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {console.log(useSelector(selectSessionToken))}
          <Navbar.Collapse id="basic-navbar-nav">
            {useSelector(selectSessionToken) ? (
              <Nav className="me-auto">
                <Nav.Link href="/match-me">
                  <span className="splash-header-text">Match Me</span>
                </Nav.Link>
                <Nav.Link href="/opponents">
                  <span className="splash-header-text">Find an Opponent</span>
                </Nav.Link>
                <Nav.Link href="/scoreboard">
                  <span className="splash-header-text">Scoreboard</span>
                </Nav.Link>
                <Nav.Link href="/buddies">
                  <span className="splash-header-text">Buddies</span>
                </Nav.Link>
              </Nav>
            ) : null}
            {!useSelector(selectSessionToken) ? (
              <Nav>
                <Nav.Link href="/login">
                  <span className="splash-header-text">Login</span>
                </Nav.Link>
                <Nav.Link href="/register">
                  <span className="splash-header-text">Register</span>
                </Nav.Link>
              </Nav>
            ) : null}
            {useSelector(selectSessionToken) ? (
              <Nav>
                <Nav.Link href="/profile">
                  <span className="splash-header-text">My Profile</span>
                </Nav.Link>
                <Nav.Link href="/settings">
                  <span className="splash-header-text">Settings</span>
                </Nav.Link>
                <Nav.Link href="/" onClick={handleLogout}>
                  <span className="splash-header-text">Log Out</span>
                </Nav.Link>
              </Nav>
            ) : null}
          </Navbar.Collapse>
        </Navbar>
      </Row>
    </Container>
  );
}

export default Header;
