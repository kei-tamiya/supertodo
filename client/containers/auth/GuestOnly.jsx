import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import { Tabs, Tab } from 'material-ui/Tabs';
import { GREEN } from '../../constant/Color.jsx';

const tabStyles = {
  rootContainer: {
    backgroundColor: GREEN,
    height: 36,
  },
  headline: {
    fontSize: 24,
    paddingTop: 6,
    marginBottom: 6,
    fontWeight: 400,
  },
};

class GuestOnly extends Component {
  static propTypes = {
    // children: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.userWillTransfer(this.props, this.context.router);
  }

  componentWillUpdate(nextProps) {
    this.userWillTransfer(nextProps, this.context.router);
  }

  userWillTransfer(props, router) {
    if (props.auth.isLoggedIn) {
      router.push('/');
    }
  }

  handleTabChange(value) {
    console.log("chang value ;  " + value);
    switch(value) {
      case 'login':
        return browserHistory.push('/login');
      case 'signup':
        return browserHistory.push('/signup');
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <div>
        <nav>
          <Tabs
            onChange={this.handleTabChange}
            initialSelectedIndex={0}
          >
            <Tab label="Login" value="login" style={tabStyles.rootContainer}>
            </Tab>
            <Tab label="SignUp" value="signup" style={tabStyles.rootContainer}>
            </Tab>
          </Tabs>
        </nav>
        <div>{this.props.children}</div>

        {auth.error &&
          <p>{auth.error.message}</p>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
};

export default connect(mapStateToProps)(GuestOnly);