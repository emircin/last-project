import { Nav, NavDropdown, Container, Navbar } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { currentuser, logout } = useContext(AuthContext)


  return (
    <div>
      <Navbar bg="info" className="py-3" expand="lg">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center justify-content-center">
            <div className="mx-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#F2CB57"
                className="bi bi-diagram-3"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
                />
              </svg>
            </div>
              <Navbar.Brand
                onMouseDown={() => navigate("/")}
                className="text-light"
                style={{ cursor: 'pointer', fontSize: "22px" }}
              >
                  Information Tech.
                  <span style={{ color: "#F2CB57", fontSize: "24px" }}>
                    <b> Blog</b>
                  </span>
              </Navbar.Brand>
          </div>

          <div>
            <Nav className="me-auto text-light">
              <NavDropdown
                title={
                  <span className="text-light rounded p-2" style={{backgroundColor: "#F2CB57"}}>
                    Hi, {currentuser ? currentuser : "Guest" }
                  </span>
                }
                id="basic-nav-dropdown"
              >
                {!currentuser ? (
                  <>
                    <NavDropdown.Item
                      onMouseDown={() => navigate("/login")}
                      className="text-info border-bottom"
                    >
                      Log In
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      onMouseDown={() => navigate("/register")}
                      className="text-info"
                    >
                      Sign Up
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item
                      onMouseDown={() => navigate("/profile")}
                      className="text-info border-bottom"
                    >
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onMouseDown={() => navigate("/new-card")}
                      className="text-info border-bottom py-2"
                    >
                      New Card
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={logout}
                      className="text-info"
                    >
                      Sign Out
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
