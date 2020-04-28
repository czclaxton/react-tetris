import React from "react";
import { TETROMINOS } from "../TETROMINOS";
import { StyledCell } from "./styles/StyledCell";

const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type]["color"]}></StyledCell>
);

export default Cell;
