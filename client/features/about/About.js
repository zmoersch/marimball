import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  navigate(0);

  return (
    <div id="about">
      <Typography variant="h3">Marimball</Typography>
    </div>
  );
};

export default About;
