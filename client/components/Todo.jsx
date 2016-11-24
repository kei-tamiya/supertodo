import React, { PropTypes } from 'react';
import Rnd from 'react-rnd'
import TodoTitleInput from './TodoTitleInput.jsx';

const Todo = ({ id, completed, title, deleteTodo }) => (
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
         onClick={() => deleteTodo(id)}
        >
         <button>×</button>
        </li>
      </ul>
    </span>

  </Rnd>
);

Todo.propTypes = {
  // onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
};

export default Todo;
