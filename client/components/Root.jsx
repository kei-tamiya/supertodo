import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { increase, decrease } from '../actions/Count.jsx';
import { fetchToken } from '../actions/Token.jsx';

class Root extends Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchToken())
  }
  //
  // componentWillReceiveProps(nextProps) {
  //     console.log("okofsadfsafdsafsdkok")
  //
  //     if (nextProps.token !== this.props.token) {
  //         console.log("okokok")
  //         const { dispatch, token } = nextProps
  //         dispatch(fetchToken())
  //     }
  // }

  render() {
    const { token, number } = this.props
    return (
      <div>
        Some state changes:
        {number}
        <button onClick={() => increase(1)}>Increase</button>
        <button onClick={() => decrease(1)}>Decrease</button>
      </div>
    )
  }
}

Root.PropTypes = {
  token: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    token: state.item,
  };
};

export default connect(mapStateToProps)(Root);
