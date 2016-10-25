import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { loginByApi } from '../../actions/AuthActions.jsx';
import Loading from '../../components/Loading.jsx';

class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isLoggedIn) {
      console.log("test")
      this.context.router.replace("/");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(loginByApi(this.refs.email.value.trim(), this.refs.password.value.trim()));

    this.refs.email.value = '';
    this.refs.password.value = '';
  }

  renderSubmit() {
    return this.props.auth.isFetching ? <Loading /> : <input type="submit" value="Send" />;
  }

  render() {
    const { auth } = this.props;

    return (
      <div>
        <h1>Log in</h1>

        <form onSubmit={::this.handleSubmit}>
          <ul>
            <li>
              <p>email</p>
              <p><input type="text" name="email" ref="email" required /></p>
            </li>
            <li>
              <p>Password</p>
              <p><input type="password" name="password" ref="password" required /></p>
            </li>
          </ul>

          {auth.error &&
          <p>{auth.error}</p>
          }

          {this.renderSubmit()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
};

export default connect(mapStateToProps)(Login);
