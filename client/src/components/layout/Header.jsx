import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header = () => {
  const navigate = useNavigate();
  useEffect(() => {}, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    // window.location.reload(true);
    navigate("/login");
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link className="nav-link" to="/">
              Auth
            </Link>
          </Navbar.Brand>
          <Nav className="ms-auto">
            {localStorage.getItem("token") != null ? (
              <>
                <Link className="nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/allusers">
                  allusers
                </Link>
                <button onClick={handleLogout} class="btn btn-dark">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">
                  login
                </Link>
                <Link className="nav-link" to="/register">
                  register
                </Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
