import React, { PropTypes, Component } from 'react';
import Todo from './Todo.jsx';

class TodoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { todos, deleteTodo, changeTodoTitle, updateTodoTitle } = this.props;

    return (
      <div>
        <ul>
          {todos.map((todo) =>
            <Todo
              key={todo.id}
              deleteTodo={() => deleteTodo(todo.id)}
              changeTodoTitle={(e) => changeTodoTitle(e, todo.id)}
              updateTodoTitle={() => updateTodoTitle(todo.id)}
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
  }).isRequired).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
  updateTodoTitle: PropTypes.func.isRequired,
};

export default TodoList;
