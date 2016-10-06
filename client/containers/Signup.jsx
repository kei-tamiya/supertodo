import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { signupByApi } from '../actions/User.jsx';

class Signup extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <article>
          <form onSubmit={e => {
            e.preventDefault();
            let email = this.refs.email.value.trim();
            let name = this.refs.name.value.trim();
            let password = this.refs.password.value.trim();
            if (!email || !name || !password) {
                console.log("invalid value");
                return
            }
            console.log("email: " + email);
            console.log("name:  " + name);
            console.log("password: "+ password);
            dispatch(signupByApi(email, name, password));
            console.log("email: " + email);
            console.log("name:  " + name);
            console.log("password: "+ password);
            this.refs.email.value = '';
            this.refs.name.value = '';
            this.refs.password.value = '';
            console.log("email: " + email);
            console.log("name:  " + name);
            console.log("password: "+ password);
          }}>
            {/*<input type="hidden" name="_csrf" value={token}/>*/}
            <label htmlFor="email">email</label>
            <input type="text" name="email" ref="email" />
            <label htmlFor="name">name</label>
            <input type="text" name="name" ref="name" />
            <label htmlFor="password">password</label>
            <input type="password" name="password" ref="password" />
            <input type="submit" value="signup"/>
          </form>
        </article>
      </div>
    )
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(Signup);
