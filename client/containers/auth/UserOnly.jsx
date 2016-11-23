import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import AddTodo from '../AddTodo.jsx'
import TodoList from '../../components/TodoList.jsx'
import AddBoard from '../AddBoard.jsx'
import BoardList from '../../components/BoardList.jsx'
import { selectOrAddBoard, fetchBoardsByApiIfNeeded } from '../../actions/BoardActions.jsx';
import { fetchTodosIfNeeded } from '../../actions/Todo.jsx';

class UserOnly extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    // isTodosFetching: PropTypes.bool.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
    }).isRequired).isRequired,
    isFetching: PropTypes.bool.isRequired,
    // boards: PropTypes.arrayOf(PropTypes.shape({
    //   id: PropTypes.number.isRequired,
    //   date: PropTypes.string.isRequired,
    // }).isRequired).isRequired,
    children: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    selectedBoard: PropTypes.object.isRequired,
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
    const { dispatch, boards, todos } = this.props;
    dispatch(fetchBoardsByApiIfNeeded(boards));

    // let d = new Date();
    // let year = d.getFullYear();
    // let month = d.getMonth()+1;
    // let date = d.getDate();
    // let today = `${year}${month}${date}`;
    // dispatch(selectOrAddBoard(today));
  }

  guestWillTransfer(props, router) {
    if (!props.auth.isLoggedIn) {
      router.push('/login');
    }
  }

  render() {
    const { isFetching, todos, auth, selectedBoard } = this.props;

    let isTodosEmpty = true;

    if (todos !== undefined) {
      isTodosEmpty = todos.length === 0;
    }

    return (
      <div className="row">
        <div className="col-sm-8">
        </div>
        <div className="col-sm-4">
          <AddBoard selectedBoard={selectedBoard} />
          <AddTodo />

          {isTodosEmpty
            ? (isFetching ? <h2>Loading...</h2> : <h2>Todoリストを作ってみよう！</h2>)
            : <TodoList todos={todos} />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { selectedBoard } = state;

  const {
    isFetching,
    todos
  } = selectedBoard.board || {
    isFetching: true,
    todos: []
  };

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
