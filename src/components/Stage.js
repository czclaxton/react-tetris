import React from "react";

// Components
import Cell from "./Cell";

const Stage = ({ stage }) => {
  return (
    <div>
      {stage.map(row => row.map((cell, i) => <Cell key={i} type={cell[0]} />))}
    </div>
  );
};

export default Stage;
