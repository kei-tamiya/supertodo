import React, { PropTypes } from 'react';

const Board = ({ date }) => (
  <li>{date}</li>
);

Board.propTypes = {
  date: PropTypes.string.isRequired,
};

export default Board;
