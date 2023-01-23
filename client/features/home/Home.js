import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Matter, { Body } from "matter-js";
import * as Tone from "tone";
import { Button } from "@mui/material";

/**
 * COMPONENT
 */
const Home = () => {
  const [running, setRunning] = useState(false);
  // module aliases
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint,
    Collision = Matter.Collision;

  // create an engine
  var engine = Engine.create();

  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "container");

  document.body.appendChild(newDiv);

  // create a renderer
  var render = Render.create({
    element: newDiv,
    engine: engine,
    options: {
      width: 1300,
    },
  });

  // create two boxes and a ground
  var ballA = Bodies.circle(210, 200, 40, 40);
  var ballB = Bodies.circle(530, 200, 40, 40);
  const ballC = Bodies.circle(770, 200, 40, 40);
  const ballD = Bodies.circle(1090, 200, 40, 40);
  var ground = Bodies.rectangle(650, 601, 1310, 10, { isStatic: true });
  var ceiling = Bodies.rectangle(650, 1, 1310, 10, { isStatic: true });
  var leftWall = Bodies.rectangle(0, 300, 10, 800, { isStatic: true });
  var rightWall = Bodies.rectangle(1300, 300, 10, 800, { isStatic: true });
  const c3Block = Bodies.rectangle(50, 570, 70, 30, { isStatic: true });
  const d3Block = Bodies.rectangle(130, 570, 70, 30, { isStatic: true });
  const e3Block = Bodies.rectangle(210, 570, 70, 30, { isStatic: true });
  const g3Block = Bodies.rectangle(290, 570, 70, 30, { isStatic: true });
  const a3Block = Bodies.rectangle(370, 570, 70, 30, { isStatic: true });
  const c4Block = Bodies.rectangle(450, 570, 70, 30, { isStatic: true });
  const d4Block = Bodies.rectangle(530, 570, 70, 30, { isStatic: true });
  const e4Block = Bodies.rectangle(610, 570, 70, 30, { isStatic: true });
  const g4Block = Bodies.rectangle(690, 570, 70, 30, { isStatic: true });
  const a4Block = Bodies.rectangle(770, 570, 70, 30, { isStatic: true });
  const c5Block = Bodies.rectangle(850, 570, 70, 30, { isStatic: true });
  const d5Block = Bodies.rectangle(930, 570, 70, 30, { isStatic: true });
  const e5Block = Bodies.rectangle(1010, 570, 70, 30, { isStatic: true });
  const g5Block = Bodies.rectangle(1090, 570, 70, 30, { isStatic: true });
  const a5Block = Bodies.rectangle(1170, 570, 70, 30, { isStatic: true });
  const c6Block = Bodies.rectangle(1250, 570, 70, 30, { isStatic: true });

  const balls = [ballA, ballB, ballC, ballD];
  const blocks = [
    c3Block,
    d3Block,
    e3Block,
    g3Block,
    a3Block,
    c4Block,
    d4Block,
    e4Block,
    g4Block,
    a4Block,
    c5Block,
    d5Block,
    e5Block,
    g5Block,
    a5Block,
    c6Block,
  ];

  const canvMouse = Matter.Mouse.create(
    document.getElementsByClassName("canvas")[0]
  );
  Matter.Mouse.setOffset(canvMouse, { x: -60, y: -125 });
  const mouseC = MouseConstraint.create(engine, { mouse: canvMouse });

  // add all of the bodies to the world
  Composite.add(engine.world, [
    ballA,
    ballB,
    ballC,
    ballD,
    ground,
    mouseC,
    ceiling,
    leftWall,
    rightWall,
    c3Block,
    d3Block,
    e3Block,
    g3Block,
    a3Block,
    c4Block,
    d4Block,
    e4Block,
    g4Block,
    a4Block,
    c5Block,
    d5Block,
    e5Block,
    g5Block,
    a5Block,
    c6Block,
  ]);

  c3Block.note = "C3";
  d3Block.note = "D3";
  e3Block.note = "E3";
  g3Block.note = "G3";
  a3Block.note = "A3";
  c4Block.note = "C4";
  d4Block.note = "D4";
  e4Block.note = "E4";
  g4Block.note = "G4";
  a4Block.note = "A4";
  c5Block.note = "C5";
  d5Block.note = "D5";
  e5Block.note = "E5";
  g5Block.note = "G5";
  a5Block.note = "A5";
  c6Block.note = "C6";

  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const sampler = new Tone.Sampler({
    urls: {
      B3: "255677__samulis__marimba-b3.wav",
      A6: "255678__samulis__marimba-a6.wav",
      A4: "255679__samulis__marimba-a4.wav",
      A2: "255680__samulis__marimba-a2.wav",
      C7: "255681__samulis__marimba-c7.wav",
      C5: "255682__samulis__marimba-c5.wav",
      C3: "255683__samulis__marimba-c3.wav",
      B5: "255684__samulis__marimba-b5.wav",
      D6: "255685__samulis__marimba-d6.wav",
      D4: "255686__samulis__marimba-d4.wav",
      E5: "255687__samulis__marimba-e5.wav",
      E3: "255688__samulis__marimba-e3.wav",
      G4: "255689__samulis__marimba-g4.wav",
      F2: "255690__samulis__marimba-f2.wav",
      F6: "255691__samulis__marimba-f6.wav",
      G3: "255692__samulis__marimba-g3.wav",
      F4: "255693__samulis__marimba-f4.wav",
    },
    baseUrl: "/resources/15684__samulis__marimba-samples/",
  }).toDestination();

  const collisionHandler = (event) => {
    balls.forEach((ball) => {
      blocks.forEach((block) => {
        if (Collision.collides(ball, block) !== null) {
          sampler.triggerAttackRelease(block.note, 3);
          Body.setAngle(ball, 180);
          Body.setAngularVelocity(ball, 1);
        }
      });
    });
  };

  Events.on(engine, "collisionStart", (event) => collisionHandler());

  // run the renderer
  useEffect(() => {
    if (!running) {
      Render.run(render);
      setRunning(false);
    }
  });

  // create runner
  var runner = Runner.create();

  const startHandler = () => {
    Tone.start();
    Runner.run(runner, engine);
  };

  return (
    <div id="buttonContainer">
      <Button variant="contained" id="startButton" onClick={startHandler}>
        Begin
      </Button>
      ;
    </div>
  );
};

export default Home;
