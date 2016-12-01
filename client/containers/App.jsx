import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchToken } from '../actions/TokenActions.jsx';
import { clearBoards } from '../actions/BoardActions.jsx';
import { clearTodos } from '../actions/TodoActions.jsx';
import { logoutByApi, fetchLoggedInUser } from '../actions/AuthActions.jsx';
import Header from '../components/Header.jsx';
import UserOnly from './auth/UserOnly.jsx';
import GuestOnly from './auth/GuestOnly.jsx';
// import Loading from '../components/Loading.jsx'

class App extends Component {
  static handleTabChange(value) {
    switch (value) {
      case 'login':
        return browserHistory.push('/login');
      case 'signup':
        return browserHistory.push('/signup');
      default:
        return browserHistory.push('/login');
    }
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
    return (
      <div>
        <Header
          auth={auth}
          handleLogout={this.handleLogout}
          handleTabChange={App.handleTabChange}
        />

        {auth.isLoggedIn
          ? <UserOnly auth={auth} />
          : <GuestOnly auth={auth} children={children} />
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
  children: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  token: state.token.token,
  isFetchTokenCompleted: state.token.isCompleted,
});

export default connect(mapStateToProps)(App);
