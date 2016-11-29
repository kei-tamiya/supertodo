import React, { PropTypes } from 'react';
import Rnd from 'react-rnd';
import RaisedButton from 'material-ui/RaisedButton';
import TodoTitleInput from './TodoTitleInput.jsx';
import { GREEN, BLUE, ORANGE } from '../constant/Color.jsx';

const Todo = ({ id, completed, title, pos_top, pos_left, deleteTodo, changeTodoTitle, updateTodo, toggleTodoCompleted, changeTodoPosition }) => (
  <Rnd
    initial={{
      x: pos_left,
      y: pos_top,
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
    onDragStop={(e, ui) => changeTodoPosition(e, ui, id)}
  >
    <span className="box">
      <TodoTitleInput title={title} changeTodoTitle={(e) => changeTodoTitle(e, id)} updateTodo={() => updateTodo(id)} />
      <ul
        className={"todoBtnList"}
      >
        <li
          onClick={() => toggleTodoCompleted(id)}
        >
          <RaisedButton label="Complete" />
        </li>
        <li
         onClick={() => deleteTodo(id)}
        >
         <RaisedButton label="×"></RaisedButton>
        </li>
      </ul>
    </span>
  </Rnd>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  pos_top: PropTypes.number.isRequired,
  pos_left: PropTypes.number.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  toggleTodoCompleted: PropTypes.func.isRequired,
};

export default Todo;
