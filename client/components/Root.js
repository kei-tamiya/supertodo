import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { increase, decrease } from '../actions/Count'

// class Root extends Component {
//     render() {
//         return (
//             <div>
//                 Some state changes:kokodskofksofkso
//                 {/*{number}*/}
//                 {/*<button onClick={() => increase(1)}>Increase</button>*/}
//                 {/*<button onClick={() => decrease(1)}>Decrease</button>*/}
//             </div>
//         )
//     }
//
// }
// Root.PropTypes = {
//     number: React.integer
// }


function Root({ number, increase, decrease }) {
    return (
        <div>
            Some state changes:
            {number}
            <button onClick={() => increase(1)}>Increase</button>
            <button onClick={() => decrease(1)}>Decrease</button>
        </div>
    )
}

Root.PropTypes = {
    number: PropTypes.number.isRequired
}

export default connect(
    state => ({ number: state.number }),
    { increase, decrease }
)(Root)