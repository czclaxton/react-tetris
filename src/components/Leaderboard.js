import React from "react";

// Semantic UI
import { Table } from "semantic-ui-react";

const Leaderboard = (data) => (
  <Table
    celled
    style={{
      backgroundColor: "black",
      color: "grey",
      fontFamily: "Pixel",
      border: "4px solid #333",
    }}
  >
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell
          style={{
            backgroundColor: "black",
            color: "grey",
            borderBottom: "4px solid #333",
            borderRight: "4px solid #333",
          }}
        >
          Name
        </Table.HeaderCell>
        <Table.HeaderCell
          style={{
            backgroundColor: "black",
            color: "grey",
            borderBottom: "4px solid #333",
            borderRight: "4px solid #333",
          }}
        >
          Score
        </Table.HeaderCell>
        <Table.HeaderCell
          style={{
            backgroundColor: "black",
            color: "grey",
            borderBottom: "4px solid #333",
          }}
        >
          Date
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell
          style={{
            backgroundColor: "black",
            color: "grey",
            borderBottom: "4px solid #333",
            borderRight: "4px solid #333",
          }}
        >
          Cell
        </Table.Cell>
        <Table.Cell
          style={{
            backgroundColor: "black",
            color: "grey",
            borderBottom: "4px solid #333",
            borderRight: "4px solid #333",
          }}
        >
          Cell
        </Table.Cell>
        <Table.Cell
          style={{
            backgroundColor: "black",
            color: "grey",
            borderBottom: "4px solid #333",
          }}
        >
          Cell
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default Leaderboard;
