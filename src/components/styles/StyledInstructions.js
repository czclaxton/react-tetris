import styled from "styled-components";

export const StyledInstructions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  margin: 20px 20px 0 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 20%;
  border-radius: 10px;
  color: ${(props) => (props.gameOver ? "red" : "#999")};
  background: #000;
  font-size: 1rem;
`;
