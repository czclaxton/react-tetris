import React from "react";
import { TETROMINOS } from "../TETROMINOS";
import { StyledCell } from "./styles/StyledCell";

const Cell = ({ type }) => (
  <StyledCell type={"L"} color={TETROMINOS["L"]["color"]}>
    cell
  </StyledCell>
);

export default Cell;
