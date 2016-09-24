import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { addTodoByApi } from '../actions/Todo'

class AddTodo extends Component {

    render() {
        const { dispatch } = this.props
        let input
        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                        return
                    }
                    dispatch(addTodoByApi(input.value))
                    input.value = ''
                }}>
                    <input ref={node => {
                        input = node
                    }} />
                    <button type="submit">
                        Add Todo
                    </button>
                </form>
            </div>
        )
    }
}

AddTodo.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStatoToProps = () => {
    return {}
}

export default connect(mapStatoToProps)(AddTodo)