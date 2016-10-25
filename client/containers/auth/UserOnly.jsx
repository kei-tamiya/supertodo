import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import AddTodo from '../AddTodo.jsx'
import TodoList from '../../components/TodoList.jsx'
import Board from '../Board.jsx'
import { fetchTodosIfNeeded } from '../../actions/Todo.jsx';

class UserOnly extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
    }).isRequired).isRequired,
    children: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.guestWillTransfer(this.props, this.context.router);
  }

  componentWillUpdate(nextProps) {
    this.guestWillTransfer(nextProps, this.context.router);
  }

  componentDidMount() {
    const { dispatch, todos } = this.props;
    dispatch(fetchTodosIfNeeded(todos));
  }

  guestWillTransfer(props, router) {
    if (!props.auth.isLoggedIn) {
      router.push('/login');
    }
  }

  render() {
    const { todos, isFetching, auth } = this.props;

    let isEmpty = true;
    if (todos !== undefined) {
      isEmpty = todos.length === 0;
    }
    console.log("todos jsonstringify:  " + JSON.stringify(todos))

    return (
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
    );

  }
}

const mapStateToProps = (state) => {
  const { todosByPetatto } = state;
  const isFetching = todosByPetatto.isFetching || true;
  const todos = todosByPetatto.todos || [];

  // const auth = state.auth;
  // const authedUser = auth.user;

  return {
    isFetching,
    todos,
    // auth,
    // authedUser,
  };
};

export default connect(mapStateToProps)(UserOnly);
