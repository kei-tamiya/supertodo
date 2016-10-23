import React, { PropTypes } from 'react';
import Rnd from 'react-rnd'

const Todo = ({ completed, title }) => (
  <Rnd
    initial={{
      x: 0,
      y: 0,
      width: 200,
      height: 200,
    }}
    minWidth={300}
    minHeight={160}
    maxWidth={800}
    maxHeight={300}
    className={'todo'}
  >
    <span className="box">
      {title}
      <ul
        className={"todoBtnList"}
      >
        <li
         className={"finishBtn"}
        >
         <button>Finish</button>
        </li>
        <li
         className={"updateBtn"}
        >
         <button>Update</button>
        </li>
        <li
         className={"removeBtn"}
        >
         <button>×</button>
        </li>
      </ul>
    </span>

  </Rnd>
);

Todo.propTypes = {
  // onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Todo;
