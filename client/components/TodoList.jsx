import React, { PropTypes } from 'react';
import Todo from './Todo.jsx';

const TodoList = ({
  todos,
  deleteTodo,
  changeTodoTitle,
  updateTodo,
  toggleTodoCompleted,
  changeTodoPosition,
  updateTodoSize,
}) => (
  <div>
    <ul>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          deleteTodo={id => deleteTodo(id)}
          changeTodoTitle={(e, id) => changeTodoTitle(e, id)}
          updateTodo={id => updateTodo(id)}
          toggleTodoCompleted={id => toggleTodoCompleted(id)}
          changeTodoPosition={(e, ui, id) => changeTodoPosition(e, ui, id)}
          updateTodoSize={(clientSize, id) => updateTodoSize(clientSize, id)}
          {...todo}
        />,
      )}
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    pos_top: PropTypes.number.isRequired,
    pos_left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  toggleTodoCompleted: PropTypes.func.isRequired,
  changeTodoPosition: PropTypes.func.isRequired,
  updateTodoSize: PropTypes.func.isRequired,
};

export default TodoList;
