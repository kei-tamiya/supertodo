import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';

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
    onDismiss: PropTypes.func
}

const mapStateToProps = () => {
    return {}
}


export default connect(mapStateToProps)(Material);