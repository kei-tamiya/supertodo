import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { signupByApi } from '../../actions/AuthActions.jsx';
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

class Signup extends Component {
  handleSubmit() {
    const email = this.refs.email.getInputNode().value.trim();
    const name = this.refs.name.getInputNode().value.trim();
    const password = this.refs.password.getInputNode().value.trim();
    if (!email || !name || !password) {
      return
    }
    this.props.dispatch(signupByApi(email, name, password));
    this.refs.email.getInputNode().value = '';
    this.refs.name.getInputNode().value = '';
    this.refs.password.getInputNode().value = '';
  }

  renderSubmit() {
    return this.props.auth.isFetching ? <Loading /> : <RaisedButton label="Login"><input type="submit" value="" className="submitBtn" /></RaisedButton>;
  }

  render() {
    const { auth } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <h1>Sign Up</h1>
            <form onSubmit={() => this.handleSubmit()}>
              <Paper zDepth={2} style={styles.inputMargin}>
                <TextField ref='email' name='email' hintText='Email' floatingLabelText='Email' className={'todoText'} underlineStyle={styles.underlineStyle} />
                <Divider />
              </Paper>
              <Paper zDepth={2} style={styles.inputMargin}>
                <TextField ref='name' name='name' hintText='Name' floatingLabelText='Name' className={'todoText'} underlineStyle={styles.underlineStyle} />
                <Divider />
              </Paper>
              <Paper zDepth={2} style={styles.inputMargin}>
                <TextField ref='password' name='password' type='password' hintText='Password' floatingLabelText='Password' className={'todoText'} underlineStyle={styles.underlineStyle} />
                <Divider />
              </Paper>

              {auth.error &&
                <p>{auth.error}</p>
              }

              {this.renderSubmit()}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
};

export default connect(mapStateToProps)(Signup);
