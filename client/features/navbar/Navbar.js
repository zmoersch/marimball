import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const aboutHandler = (event) => {
    event.preventDefault();
    navigate("/about");
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3" color="white" mt={2} mb={2}>
          <NavLink to="/">Marimball</NavLink>
        </Typography>
      </Box>
    </>
  );
};

export default Navbar;
