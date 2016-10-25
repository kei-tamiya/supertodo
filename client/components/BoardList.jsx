import React, { PropTypes, Component } from 'react';
import Board from './Board.jsx';

const BoardList = (boards) => (
  <div>
    <ul>
      {boards.map(board =>
        <Board
          key={board.id}
          {...board}
        />
      )}
    </ul>
  </div>
);

BoardList.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default BoardList;
