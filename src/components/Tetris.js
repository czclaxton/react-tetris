import React, { useState, useEffect } from "react";
import axios from "axios";
import Particles from "react-particles-js";

// Helpers
import { createStage, checkCollision } from "../gameHelpers";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import Leaderboard from "./Leaderboard";
import Instructions from "./Instructions";

// Styled Components
import {
  StyledTetris,
  StyledTetrisWrapper,
  StyledDataWrapper,
} from "./styles/StyledTetris";

// Semantic UI
import { Modal, Button, Form } from "semantic-ui-react";

// Custom Hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  const [name, setName] = useState("");
  const [leaderboard, SetLeaderboard] = useState(null);

  console.log("re-render");

  useEffect(() => {
    axios
      .get("https://react-tetris-leaderboard.herokuapp.com/api/leaderboard/")
      .then((res) => {
        SetLeaderboard(res.data);
        console.log("leaderboard", leaderboard);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e, { value }) => {
    setName(value);
  };

  const handleSubmit = () => {
    axios.post(
      "https://react-tetris-leaderboard.herokuapp.com/api/leaderboard/",
      { name, score }
    );
    setModalOpen(false);
  };

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    console.log("started");
    // Reset game
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
    setName("");
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);

      // Increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log("Game Over");
        setGameOver(true);
        setDropTime(null);
        setModalOpen(true);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        console.log("interval on");
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    console.log("interval off");
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        // move left
        movePlayer(-1);
      } else if (keyCode === 39) {
        // move right
        movePlayer(1);
      } else if (keyCode === 40) {
        // move down
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <Instructions />
      <Particles
        style={{ position: "absolute", zIndex: -1 }}
        params={{
          particles: {
            number: {
              value: 70,
              density: {
                enable: true,
                value_area: 1500,
              },
            },
            line_linked: {
              enable: false,
              opacity: 0.0,
            },
            move: {
              direction: "none",
              speed: 0.25,
              trail: {
                enable: true,
                length: 10,
              },
            },
            size: {
              value: 1,
            },
            opacity: {
              animation: {
                enable: true,
                speed: 1,
                opacity_min: 0.35,
              },
              random: {
                enable: true,
              },
            },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 1,
              },
            },
          },
        }}
      />
      <StyledTetris>
        <Stage stage={stage} />
        <StyledDataWrapper>
          <aside>
            {gameOver ? (
              <Display gameOver={gameOver} text={`Game Over: ${score}`} />
            ) : (
              <div>
                <Display text={`Score: ${score}`} />
                <Display text={`Rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
              </div>
            )}
            <StartButton callback={startGame} />
          </aside>
          {leaderboard ? (
            <Leaderboard leaderboard={leaderboard} />
          ) : (
            <div>loading...</div>
          )}
        </StyledDataWrapper>
      </StyledTetris>
      <Modal
        size="mini"
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        basic
        dimmer="blurring"
        closeIcon
      >
        <Modal.Header
          style={{
            color: "red",
            fontFamily: "Pixel",
          }}
        >
          GAME OVER{" "}
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label
                style={{
                  color: "red",
                  fontFamily: "Pixel",
                  marginBottom: "15px",
                }}
              >
                FINAL SCORE: {score}
              </label>
              <Form.Input
                placeholder="Enter your name here..."
                name="name"
                value={name}
                onChange={handleChange}
                style={{
                  backgroundColor: "black",
                  color: "grey",
                  fontFamily: "Pixel",
                  border: "4px solid #333",
                }}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="grey"
            icon="arrow right"
            labelPosition="right"
            content="Submit"
            type="submit"
            onClick={handleSubmit}
            style={{
              fontFamily: "Pixel",
            }}
          />
        </Modal.Actions>
      </Modal>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
