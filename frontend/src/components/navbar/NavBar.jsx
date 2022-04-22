import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { RiMessengerLine } from "react-icons/ri";
import { MdPersonAdd } from "react-icons/md";
import "./navbar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem("loginData"))
  );

  const { email } = localData;

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/data/${email}`, {
        method: "GET",
      });

      const data = await res.json();
      setUserDetails(data);
    }
    fetchData();
  }, []);

  console.log(userDetails);

  return (
    <div>
      <Navbar
      // style={{
      //   position: "sticky",
      //   top: 0,
      //   zIndex: 1000,
      // }}
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src="/assets/images/logo.png"
              width="105"
              height="80"
              className="d-inline-block align-top"
              alt="ttn-logo"
            />
          </Navbar.Brand>
          <span className="headingStyle">PeerGram</span>
          <Nav className="me-right">
            <Navbar.Brand href="/self-profile">
              <img
                src={userDetails.picture}
                radius="30"
                height="40"
                className="d-inline-block align-top personImg"
                alt="user-img"
              />
              {/* </Link> */}
              <span style={{ fontWeight: "450" }}>
                {userDetails.firstName + " " + userDetails.lastName}
              </span>
            </Navbar.Brand>
            <Nav.Link href="">
              <RiMessengerLine />
            </Nav.Link>
            <Nav.Link href="">
              <MdPersonAdd />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <Body items={items} /> */}
    </div>
  );
}

export default NavBar;
