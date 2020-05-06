import React from "react";
import { TETROMINOS } from "../TETROMINOS";
import { StyledCell } from "./styles/StyledCell";

const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type]["color"]}>
    {console.log("re-render")}
  </StyledCell>
);

export default React.memo(Cell);
