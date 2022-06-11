import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";
import { makeStyles } from '@mui/styles';
import { Footer } from "../Footer";

const pages = [
  {
    link: "#",
    label: "Solutions",
  },
  {
    link: "#",
    label: "Products",
  },
  {
    link: "#",
    label: "Partners",
  },
  {
    link: "#",
    label: "Resources",
  },
  {
    link: "#",
    label: "Company",
  },
  {
    link: "sign-in",
    label: "Sign In",
    class: 'signin'
  },
];
const useStyles = makeStyles(() => ({
  toolBar: {
    margin: "auto",
    maxWidth: 800,
    width: "100%"
  },
}));
const Layout = ({ children }: any) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className="appHeader" sx={{ backgroundColor: "#226C7C" }} >
        <Toolbar  sx={{ backgroundColor: "#226C7C" }} className={classes.toolBar} >
          <Box
            component="img"
            sx={{
              height: 26,
              width: 90,
              marginRight: "100px"
            }}
            alt="viACT"
            src="mainLogo.webp"
            
          />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" },  backgroundColor: "#226C7C"  }}>
            {pages.map((page: any, index: number) => (
              <Button
                key={index}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to={page.link} style={{color: "#fff" , textTransform: "capitalize" , textDecoration: "none"}} className={page.class}>{page.label}</Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <main className="layout">{children}</main>
      {/* Footer */}
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
