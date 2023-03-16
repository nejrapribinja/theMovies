import React, { useState } from "react";
import { Button, Modal, Form, Col, FloatingLabel } from "react-bootstrap";
import { userLogin, getAccount } from "../api/api";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    const success = await userLogin(username, password);
    if (success) {
      props.setIsLoggedIn(true);
      location.reload();
      props.onHide();

      const account = await getAccount();
      //console.log(account);
    } else {
      alert("Neuspješna prijava! Provjerite podatke i pokušajte ponovno.");
    }
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body className="text-center">
        <h1>Log in</h1>
      </Modal.Body>

      <Modal.Footer>
        <Col xs={12} className=" align-items-center text-center">
          <Form className="mb-5" onSubmit={login}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Enter username" className="mb-2">
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
        </Col>
      </Modal.Footer>
    </Modal>
  );
}

export default Login;
