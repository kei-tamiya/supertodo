import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { loginByApi } from '../../actions/AuthActions.jsx';
import Loading from '../../components/Loading.jsx';

import { GREEN, BLUE, ORANGE } from '../../constant/Color.jsx';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  errorStyle: {
    color: ORANGE,
  },
  underlineStyle: {
    borderColor: ORANGE,
  },
  floatingLabelStyle: {
    color: ORANGE,
  },
  floatingLabelFocusStyle: {
    color: BLUE,
  },
  inputMargin: {
    marginBottom: 20,
  }
};

class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isLoggedIn) {
      browserHistory.replace("/");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.refs.email.getInputNode().value.trim();
    const password = this.refs.password.getInputNode().value.trim();
    if (!email || !password) {
      return
    }
    this.props.dispatch(loginByApi(email, password));

    this.refs.email.getInputNode().value = '';
    this.refs.password.getInputNode().value = '';
  }

  render() {
    const { auth } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <h1>Log in</h1>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <Paper zDepth={2} style={styles.inputMargin}>
                <TextField ref='email' name='email' hintText='Email' floatingLabelText='Email' className={'todoText'} underlineStyle={styles.underlineStyle} />
                <Divider />
              </Paper>
              <Paper zDepth={2} style={styles.inputMargin}>
                <TextField ref='password' name='password' type='password' hintText='Password' floatingLabelText='Password' className={'todoText'} underlineStyle={styles.underlineStyle} />
                <Divider />
              </Paper>

              {auth.error &&
                <p>{auth.error}</p>
              }

              {this.props.auth.isFetching ? <Loading /> : <input type="submit" label="Login" />}
            </form>
          </div>
        </div>
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
