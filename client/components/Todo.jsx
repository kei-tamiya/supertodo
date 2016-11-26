import React, { PropTypes } from 'react';
import Rnd from 'react-rnd'
import TodoTitleInput from './TodoTitleInput.jsx';
import { GREEN, BLUE, ORANGE } from '../constant/Color.jsx';

const Todo = ({ id, completed, title, deleteTodo, changeTodoTitle, updateTodo, toggleTodoCompleted }) => (
  <Rnd
    initial={{
      x: 0,
      y: 0,
      width: 320,
      height: 240,
    }}
    minWidth={300}
    minHeight={160}
    maxWidth={800}
    maxHeight={300}
    className={'todo'}
    style={{
      opacity: completed ? '0.8' : '1',
      backgroundColor: GREEN
    }}
  >
    <span className="box">
      <TodoTitleInput title={title} changeTodoTitle={(e) => changeTodoTitle(e, id)} updateTodo={() => updateTodo(id)} />
      <ul
        className={"todoBtnList"}
      >
        <li
         onClick={() => toggleTodoCompleted(id)}
        >
         <button className={"finishBtn btn btn-default"}>Finish</button>
        </li>
        <li
         onClick={() => deleteTodo(id)}
        >
         <button className={"removeBtn btn  btn-default"}>×</button>
        </li>
      </ul>
    </span>
  </Rnd>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  toggleTodoCompleted: PropTypes.func.isRequired,
};

export default Todo;
