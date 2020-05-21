import { useState, useEffect } from "react";

import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage) =>
      newStage.reduce((acc, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          // Check row for any empty cells
          // if all cells are tetromino then we clear the row
          setRowsCleared((prev) => prev + 1);
          acc.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          // return added clear row to top and ignore full row
          return acc;
        }
        acc.push(row);
        return acc;
      }, []);

    const updateStage = (prevStage) => {
      // Clear stage
      // TODO: refactor map to for loop for run time
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      // draw out tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });

      // Then check for collision
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
