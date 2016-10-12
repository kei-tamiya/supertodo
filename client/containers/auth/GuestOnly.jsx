import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class GuestOnly extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.userWillTransfer(this.props, this.context.router);
  }

  componentWillUpdate(nextProps) {
    this.userWillTransfer(nextProps, this.context.router);
  }

  userWillTransfer(props, router) {
    if (props.auth.isLoggedIn) {
      router.replace('/');
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
};

export default connect(mapStateToProps)(GuestOnly);