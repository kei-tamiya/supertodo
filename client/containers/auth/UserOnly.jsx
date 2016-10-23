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
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
    }).isRequired).isRequired,
    isFetching: PropTypes.bool.isRequired,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.todos !== this.props.todos) {
      const { dispatch, todos } = nextProps;
      dispatch(fetchTodosIfNeeded(todos));
    }
  }

  guestWillTransfer(props, router) {
    if (!props.auth.isLoggedIn) {
      router.replace('/login');
    }
  }

  render() {
    const { todos, isFetching, auth } = this.props;

    let isEmpty = true;
    if (todos !== null) {
      isEmpty = todos.length === 0;
    }
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
  const {
    isFetching,
    items: todos,
  } =  todosByPetatto.items || {
    isFetching: true,
    items: [],
  };
  const auth = state.auth;
  return {
    todos,
    isFetching,
    auth,
  };
};

export default connect(mapStateToProps)(UserOnly);
