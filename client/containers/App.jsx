import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchToken } from '../actions/Token.jsx';
import { clearBoards } from '../actions/BoardActions.jsx';
import { clearTodos } from '../actions/Todo.jsx';
import { logoutByApi, fetchLoggedInUser } from '../actions/AuthActions.jsx';
import Header from '../components/Header.jsx'
import UserOnly from './auth/UserOnly.jsx'
import GuestOnly from './auth/GuestOnly.jsx'
// import Loading from '../components/Loading.jsx'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(fetchToken());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, token } = this.props;
    if (nextProps.isFetchTokenCompleted && token !== nextProps.token) {
      dispatch(fetchLoggedInUser());
    }
  }

  handleLogout() {
    this.props.dispatch(clearTodos());
    this.props.dispatch(clearBoards());
    this.props.dispatch(logoutByApi());
  }

  render() {
    const { auth, children } = this.props;
    // const children = React.Children.map(this.props.children, function (child) {
    //   return React.cloneElement(child, {
    //     foo: this.state.foo
    //   })
    // });
    return (
      <div>
        <header>
          <Header
            auth={auth}
            handleLogout={::this.handleLogout}
          />
        </header>

        {auth.isLoggedIn
          ? <UserOnly auth={auth} children={children} />
          : <GuestOnly children={children} />
        }
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  isFetchTokenCompleted: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    token: state.token.token,
    isFetchTokenCompleted: state.token.isCompleted,
  };
};

export default connect(mapStateToProps)(App);
