import * as React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

//import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const pages = ["men", "women", "boys", "girls"];
const pageItems = [
  ["t-shirts", "shirts", "jackets", "trousers"],
  [
    "dress",
    "jumpsuits",
    "kurtis,tunics,tops",
    "trousers and capris",
    "sweaters and sweatshirts",
  ],
  ["t-shirts", "trousers"],
  ["dress"],
];

const Header = ({ items }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={classes.navbar}>
      <Container>
        <Navbar.Brand onClick={() => history.push("/")}>
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {pages.map((page, i) => (
              <Nav.Link
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textTransform: "capitalize",
                }}
              >
                <span onClick={() => history.push(`/products/${page}`)}>
                  {page}
                </span>
                <NavDropdown title="" id="basic-nav-dropdown">
                  {pageItems[i].map((item, i) => (
                    <NavDropdown.Item
                      key={i}
                      onClick={() => history.push(`/products/${page}/${item}`)}
                    >
                      {item}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
        <Box
          style={{ display: "flex", marginLeft: "auto", alignItems: "center" }}
        >
          <Nav.Link onClick={() => history.push("/myBag")}>
            <Badge badgeContent={items} color="error">
              <ShoppingCartIcon style={{ color: "grey" }} />
            </Badge>
          </Nav.Link>
          <NavDropdown
            title={
              <IconButton sx={{ p: 0, color: "grey" }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#action/3.1">profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">bag</NavDropdown.Item>
          </NavDropdown>
        </Box>
      </Container>
    </Navbar>
  );
};
export default Header;
