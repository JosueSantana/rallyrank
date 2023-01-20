import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import { registerUser } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import useNavigation from "../../hooks/use-navigation";

function RegisterPage() {
  const dispatch = useDispatch();
  const { navigate, currentPath } = useNavigation();

  async function handleRegisterSubmission(event) {
    event.preventDefault();

    const firstName = event.target[0].value;
    const lastName = event.target[1].value;
    const email = event.target[2].value;
    const password = event.target[3].value;

    let response = await dispatch(
      registerUser({
        email,
        password,
        profileInfo: {
          firstName,
          lastName,
        },
      })
    );

    console.log(response);

    // navigate(`${"/"}`);
  }

  return (
    <Container className="d-flex align-items-center justify-content-center main-content">
      <Card className="w-50 px-3 py-3 login-limits">
        <Card.Body>
          <Card.Title className="fs-2 mb-5">Register</Card.Title>
          <Form onSubmit={handleRegisterSubmission}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label className="fs-5">First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label className="fs-5">Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fs-5">Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="enterPassword">
              <Form.Label className="fs-5">Enter Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="reenterPassword">
              <Form.Label className="fs-5">Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="d-flex justify-content-between pb-4">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <Button variant="primary" type="submit" size="lg">
                Continue
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterPage;
