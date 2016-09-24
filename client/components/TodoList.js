import React, { PropTypes, Component } from 'react'
import Todo from './Todo'

class TodoList extends Component {

    render() {
        // todos = this.props.todos
        return (
            <div>
                <ul>
                    {this.props.todos.map(todo =>
                        <Todo
                            key={todo.id}
                            {...todo}
                        />
                    )}
                </ul>
            </div>
        )
    }
}


TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired).isRequired
}

export default TodoList