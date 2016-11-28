import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

class GuestOnly extends Component {
  static propTypes = {
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

  render() {
    const { auth } = this.props;
    return (
      <div>
        {this.props.children}

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