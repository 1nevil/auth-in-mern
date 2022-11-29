import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (email === "" || password === "" || passwordCheck === "") {
      setError("Every feild is required");
    } else if (password !== passwordCheck) {
      setError("Password and Check password must be same");
    } else {
      setError("");
      try {
        const res = await axios.post("http://localhost:5000/users/login", {
          email,
          password,
        });
        if (res.data) {
          localStorage.setItem("token", res.data);
          alert("login");
          // navigate("/");
          window.location.href = "/";
        } else {
          alert("email and pass");
        }
      } catch (error) {
        setError("You are not an user sign up first");
      }
      // const data = await res.data;
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setPasswordCheck("");
  };
  return (
    <>
      <Container>
        <Row>
          <Col md="4"></Col>
          <Col sm="12" md="4">
            <h5 className="text-center h3 m-3 text-primary">Log In</h5>
            <Form>
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
              <Link to="/register" className="mb-2 nav-link text-primary">
                Not an User SignUp ?
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
            {/* {email + " " + password + " " + passwordCheck} */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
