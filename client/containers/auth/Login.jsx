import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { loginByApi } from '../../actions/AuthActions.jsx';
import Loading from '../../components/Loading.jsx';

class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  handleSubmit(e) {
    const target = e.target;
    e.preventDefault();
    this.props.dispatch(loginByApi({
      email: target.name.value.trim(),
      password: target.password.value.trim()
    }));
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
              <p>name</p>
              <p><input type="text" name="name" required /></p>
            </li>
            <li>
              <p>Password</p>
              <p><input type="password" name="password" required /></p>
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
