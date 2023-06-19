import * as React from "react";
import { Navbar, Nav, NavDropdown, Container, NavLink } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

import Avatar from "@mui/material/Avatar";

import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
//CATEGORIES
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
          Insta-Fashion
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {pages.map((page, i) => (
              <NavLink
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
              </NavLink>
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
        </Box>
      </Container>
    </Navbar>
  );
};
export default Header;
