export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  // Create grid from multi-dimensional array
  // An array for each cell of the height and nested inside is a cell for each row for the width
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      if (player.tetromino[y][x] !== 0) {
        // 1. Check that we're on a tetromino cell
        if (
          !stage[y + player.pos.y + moveY] ||
          // 2. Check that our move is inside game area vertically

          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 3. Check that our move is inside game area horizontally

          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
          // 4. Check that the cell we're moving to isn't 'clear'
        ) {
          return true;
        }
      }
    }
  }
};
