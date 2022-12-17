import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  //   const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (
      user === "" ||
      email === "" ||
      password === "" ||
      passwordCheck === ""
    ) {
      setError("Every feild is required");
    } else if (password !== passwordCheck) {
      setError("Password and Check password must be same");
    } else if (!emailRegex.test(email)) {
      setError("Enter the valid email");
    } else {
      setError("");
      const res = await axios.post("http://localhost:5000/users/register", {
        user,
        email,
        password,
      });
      console.log(res.data.message);
      if (res.data.message) {
        setError(res.data.message);
      } else {
        navigate("/login");
      }
    }
  };
  const handleReset = () => {
    setUser("");
    setEmail("");
    setPassword("");
    setPasswordCheck("");
  };
  return (
    <>
      <Container>
        <Row>
          <Col md="4"></Col>
          <Col md="4">
            <h5 className="text-center h3 m-3 text-primary"> Sign Up</h5>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicUser">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic cPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
              </Form.Group>
              <h6 className="text-danger">{error}</h6>
              <Link to="/login" className="mb-2 nav-link text-primary">
                Already User?
              </Link>
              <Button
                variant="primary"
                type="button"
                className=" col-sm-12"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                variant="danger"
                type="button"
                className="mt-2 col-sm-12"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Form>
            {/* {user + " " + email + " " + password + " " + passwordCheck} */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
