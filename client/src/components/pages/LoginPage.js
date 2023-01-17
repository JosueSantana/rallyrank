import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

function LoginPage() {
  return (
    <Container className="d-flex align-items-center justify-content-center main-content">
      <Card className="w-50 px-3 py-3 login-limits">
        <Card.Body>
          <Card.Title className="fs-2 mb-5">Log In</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fs-5">Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fs-5">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="d-flex justify-content-between pb-4">
              <Form.Check type="checkbox" label="Remember me" />
              <Card.Link href="/" className="text">
                Forgot Password?
              </Card.Link>
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <Button variant="primary" type="submit" size="lg" >
                Continue
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;
