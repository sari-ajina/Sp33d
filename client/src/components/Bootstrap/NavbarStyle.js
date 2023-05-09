import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SearchBar from '../SearchBar/SearchBar';
import ModalFilter from './ModalFilter';
import React from 'react';
import { useState } from 'react';

function NavbarStyle() {
    const [modalShow, setModalShow] = useState(false);

    const handleLogout = () => {
      localStorage.clear();
    }

  return (
    <>
      {['sm' ].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="/homepage">SP33D</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  SP33D
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link onClick={handleLogout} href="/login">Log out</Nav.Link>
                </Nav>
                <Nav className="justify-content-end pe-3">
                  <Nav.Link href="/userprofile">Profile</Nav.Link>
                </Nav>
                <Nav className="justify-content-end  pe-3">
                  <Nav.Link href="/items">Add Item</Nav.Link>
                </Nav>
                <Form className="d-flex">
                    {/* <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    /> */}
                    <SearchBar/>
                    <Button onClick={() => setModalShow(true)}>
                        Filter 
                    </Button>
                    <ModalFilter
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    {/* <Button variant="outline-success">Search</Button> */}
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarStyle;