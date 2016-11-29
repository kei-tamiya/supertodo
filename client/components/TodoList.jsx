import React, { PropTypes, Component } from 'react';
import Todo from './Todo.jsx';

class TodoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      todos,
      deleteTodo,
      changeTodoTitle,
      updateTodo,
      toggleTodoCompleted,
      changeTodoPosition,
      updateTodoSize,
    } = this.props;

    return (
      <div>
        <ul>
          {todos.map((todo) =>
            <Todo
              key={todo.id}
              deleteTodo={() => deleteTodo(todo.id)}
              changeTodoTitle={(e) => changeTodoTitle(e, todo.id)}
              updateTodo={() => updateTodo(todo.id)}
              toggleTodoCompleted={() => toggleTodoCompleted(todo.id)}
              changeTodoPosition={(e, ui, id) => changeTodoPosition(e, ui, id)}
              updateTodoSize={(clientSize, id) => updateTodoSize(clientSize, id)}
              {...todo}
            />
          )}
        </ul>
      </div>
    );
  }
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      pos_top: PropTypes.number.isRequired,
      pos_left: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  toggleTodoCompleted: PropTypes.func.isRequired,
  changeTodoPosition: PropTypes.func.isRequired,
  updateTodoSize: PropTypes.func.isRequired,
};

export default TodoList;
