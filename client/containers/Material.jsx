import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header.jsx';
import MainSection from '../components/MainSection.jsx';

class Material extends Component {
  render() {
    return (
      <div>
        <Header />
        <MainSection />
      </div>
    );
  }
}

Material.propTypes = {
  onDismiss: PropTypes.func,
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(Material);
