import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

class GuestOnly extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    GuestOnly.userWillTransfer(this.props, this.context.router);
  }

  componentWillUpdate(nextProps) {
    GuestOnly.userWillTransfer(nextProps, this.context.router);
  }

  static userWillTransfer(props, router) {
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

GuestOnly.propTypes = {
  auth: PropTypes.object.isRequired,
};

GuestOnly.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(GuestOnly);
