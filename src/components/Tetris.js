import React, { useState } from "react";

// GraphQL
import gql from "graphql-tag";
import { Query } from "react-apollo";

// Helpers
import { createStage, checkCollision } from "../gameHelpers";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import Leaderboard from "./Leaderboard";

// Styled Components
import {
  StyledTetris,
  StyledTetrisWrapper,
  StyledDataWrapper,
} from "./styles/StyledTetris";

// Semantic UI
import { Modal, Button, Form, Icon } from "semantic-ui-react";

// Custom Hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";

// GraphQL Queries
const LEADERBOARD_QUERY = gql`
  query LeaderboardQuery {
    leaderboard {
      name
      score
      date
    }
  }
`;

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  console.log("re-render");

  const onSubmit = (e) => {
    e.preventDefault();
    setModalOpen(true);
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
          <Leaderboard />
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
                FINAL SCORE: 123
              </label>
              <input
                placeholder="Enter your name here..."
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
