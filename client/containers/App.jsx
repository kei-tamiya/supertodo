import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchToken } from '../actions/Token.jsx';
import { loginByApi, logoutByApi } from '../actions/AuthActions.jsx';
import Header from '../components/Header.jsx'
import UserOnly from './auth/UserOnly.jsx'
import GuestOnly from './auth/GuestOnly.jsx'
// import Loading from '../components/Loading.jsx'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchToken());

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.token !== '' && this.props.token !== nextProps.token) {
      this.props.dispatch(loginByApi());
    }
  }

  handleLogout() {
    this.props.dispatch(logoutByApi());
  }

  render() {
    const { auth } = this.props;
    // const children = React.Children.map(this.props.children, function (child) {
    //   return React.cloneElement(child, {
    //     foo: this.state.foo
    //   })
    // });
    return (
      <div className="container-fluid">
        <header>
          {auth.isPrepared ? (
            <div>
              <Header
                auth={auth}
                handleLogout={::this.handleLogout}
              />
            </div>) : (
            <div>
              <Header
                auth={auth}
                handleLogout={::this.handleLogout}
              />
              {this.props.children}
            </div>)
          }
        </header>

        {auth.isLoggedIn
          ? <UserOnly />
          : <GuestOnly />
        }
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    token: state.token.token,
  };
};

export default connect(mapStateToProps)(App);
