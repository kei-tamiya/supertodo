import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchTodosIfNeeded } from '../actions/Todo.jsx';
import { fetchToken } from '../actions/Token.jsx';
import TodoList from '../components/TodoList.jsx';
import AddTodo from './AddTodo.jsx';
import Board from './Board.jsx'
import Header from '../components/Header.jsx'

class App extends Component {
  componentDidMount() {
    const { dispatch, todos } = this.props;
    dispatch(fetchToken());
    dispatch(fetchTodosIfNeeded(todos));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.todos !== this.props.todos) {
      const { dispatch, todos } = nextProps;
      dispatch(fetchTodosIfNeeded(todos));
    }
  }

//
// handleRefreshClick = e => {
//     e.preventDefault()
//
//     const { dispatch, selectedReddit } = this.props
//     dispatch(invalidateReddit(selectedReddit))
//     dispatch(fetchPostsIfNeeded(selectedReddit))
// }

  render() {
    const { todos, isFetching } = this.props;

    let isEmpty = true;
    if (todos !== null) {
      isEmpty = todos.length === 0;
    }
    return (
      <div className="container-fluid">
        <header>
          <Header />
        </header>

        <div className="row">
          <div className="col-sm-8">
            <Board />
          </div>
          <div className="col-sm-4">
            <AddTodo />
            {isEmpty
              ? (isFetching ? <h2>Loading...</h2> : <h2>Todoリストを作ってみよう！</h2>)
              : <TodoList todos={todos} />
            }
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
  const { todosByPetatto } = state;
  const {
    isFetching,
    items: todos,
  } =  todosByPetatto.items || {
    isFetching: true,
    items: [],
  };
  return {
    todos,
    isFetching,
  };
};

export default connect(mapStateToProps)(App);
