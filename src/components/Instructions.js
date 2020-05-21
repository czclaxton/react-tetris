import React from "react";

import { StyledInstructions } from "./styles/StyledInstructions";

const Instructions = () => {
  return (
    <StyledInstructions>
      <h3>Controls:</h3>
      <div>1. Use the arrow keys to move the tetromino.</div>
      <div>2. The up arrow key is used for rotation.</div>
      <hr />
      <h3>Objective:</h3>
      <div>
        Your goal is to arrange the falling pieces to fill a row. A filled row
        will clear and award points.
      </div>
      <hr />
      <div>
        The game is over if you allow the pieces to reach the top of the grid.{" "}
      </div>
    </StyledInstructions>
  );
};

export default Instructions;
