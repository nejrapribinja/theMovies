import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Col, Row, FormCheck, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState(0);
  const [log, setLog] = useState(true);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      // Dohvati zahtjevnicu za pristupni token
      const responseToken = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
      );
      const requestToken = responseToken.data.request_token;

      // Pošalji zahtjevnicu i korisničke podatke za provjeru
      const responseValidation = await axios.post(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        {
          username: email,
          password: password,
          request_token: requestToken,
        }
      );

      // Provjera odgovora od servera
      if (responseValidation.data.success === true) {
        // Stvori sesiju za korisnika
        const responseSession = await axios.post(
          `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`,
          {
            request_token: requestToken,
          }
        );
        const sessionId = responseSession.data.session_id;

        // Spremi sesiju u lokalnu pohranu
        localStorage.setItem("sessionId", sessionId);
        navigate("/");
        props.onHide();
      } else {
        alert("Neuspješna prijava! Provjerite podatke i pokušajte ponovno.");
      }
    } catch (error) {
      console.error(error);
      alert("Neuspješna prijava! Došlo je do pogreške na serveru.");
    }
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      await fetch("/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, lastName, user }),
      });
      setName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setLog(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body className="text-center">{log ? <h1>Log in</h1> : <h1>Sign in</h1>}</Modal.Body>

      <Modal.Footer>
        {log ? (
          <Col xs={12} className=" align-items-center text-center">
            <Form className="mb-5" onSubmit={login}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel controlId="floatingInput" label="Enter email" className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingInput" label="Enter password" className="mb-2">
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Button id="btn" type="submit">
                Log in
              </Button>
            </Form>
            <div>
              <p>
                Don't have an account?{" "}
                <a
                  className="link"
                  href="#"
                  onClick={() => {
                    setLog(false);
                  }}>
                  Sign in
                </a>
              </p>
            </div>
          </Col>
        ) : (
          <Col xs={12} className="text-center">
            <Form className="mb-5" onSubmit={register}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel controlId="floatingInput" label="Enter name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel controlId="floatingInput" label="Enter last name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel controlId="floatingInput" label="Enter email" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingInput" label="Enter password" className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <fieldset>
                <Form.Group as={Row} className="mb-3">
                  {/* <Form.Label as="legend" column sm={2}>
                    Radios
                  </Form.Label> */}
                  <Col sm={6} className="d-flex justify-content-center align-items-center">
                    <Form.Check
                      type="radio"
                      label="Customer"
                      value="1"
                      name="gr"
                      onChange={(e) => setUser(e.target.value)}
                      required
                    />
                  </Col>
                  <Col sm={6} className="d-flex justify-content-center align-items-center">
                    <Form.Check
                      type="radio"
                      label="Seller"
                      value="2"
                      name="gr"
                      onChange={(e) => setUser(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>
              </fieldset>
              <Button id="btn" type="submit">
                Sign in
              </Button>
            </Form>
            <div>
              <p>
                Already have an account?{" "}
                <a className="link" href="#" onClick={() => setLog(true)}>
                  Log in
                </a>
              </p>
            </div>
          </Col>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default Login;
