import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const About = () => {
  const musicDiv = document.getElementById("container");
  if (musicDiv) document.body.removeChild(musicDiv);

  console.log("test");

  return (
    <div id="about">
      <Typography variant="p" color="white">
        Marimba sampler made with Tone.js using sound pack created by Samulis
        (https://freesound.org/people/Samulis/packs/15684/)
      </Typography>
    </div>
  );
};

export default About;
