import React, { PropTypes } from 'react';
import Rnd from 'react-rnd';
import RaisedButton from 'material-ui/RaisedButton';
import TodoTitleInput from './TodoTitleInput.jsx';
import { GREEN } from '../constant/Color.jsx';

const Todo = ({
  id,
  completed,
  title,
  pos_top,
  pos_left,
  width,
  height,
  deleteTodo,
  changeTodoTitle,
  updateTodo,
  toggleTodoCompleted,
  changeTodoPosition,
  updateTodoSize,
}) => (
  <Rnd
    initial={{
      x: pos_left,
      y: pos_top,
      width,
      height,
    }}
    minWidth={200}
    minHeight={80}
    maxWidth={800}
    maxHeight={600}
    className={'todo'}
    style={{
      opacity: completed ? '0.8' : '1',
      backgroundColor: GREEN,
    }}
    onDragStop={(e, ui) => changeTodoPosition(e, ui, id)}
    onResizeStop={(direction, styleSize, clientSize) => updateTodoSize(clientSize, id)}
  >
    <span className="box">
      <TodoTitleInput
        id={id}
        title={title}
        changeTodoTitle={e => changeTodoTitle(e, id)}
        updateTodo={() => updateTodo(id)}
      />
      <ul
        className="todoBtnList"
      >
        <li>
          <RaisedButton
            label="Complete"
            onClick={() => toggleTodoCompleted(id)}
          />
        </li>
        <li>
          <RaisedButton
            onClick={() => deleteTodo(id)}
          >
            ×
          </RaisedButton>
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
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  toggleTodoCompleted: PropTypes.func.isRequired,
  changeTodoPosition: PropTypes.func.isRequired,
  updateTodoSize: PropTypes.func.isRequired,
};

export default Todo;
