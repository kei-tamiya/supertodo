import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { fetchTodosIfNeeded } from '../actions/Todo'
import TodoList from '../components/TodoList'
import AddTodo from '../containers/AddTodo'

class App extends Component {
    // PropTypes: {
    //     todos: PropTypes.array.isRequired
    // }

    // static propTypes = {
    //     selectedTodo: PropTypes.string.isRequired,
    //     todos: PropTypes.array.isRequired,
    //     isFetching: PropTypes.string.isRequired,
    //     dispatch: PropTypes.func.isRequired
    // }


    componentDidMount() {
        const { dispatch, todos } = this.props
        dispatch(fetchTodosIfNeeded(todos))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.todos !== this.props.todos) {
            const { dispatch, todos } = nextProps
            dispatch(fetchTodosIfNeeded(todos))
        }
    }

    // handleChange = nextReddit => {
    //     this.props.dispatch(selectReddit(nextReddit))
    // }
    //
    // handleRefreshClick = e => {
    //     e.preventDefault()
    //
    //     const { dispatch, selectedReddit } = this.props
    //     dispatch(invalidateReddit(selectedReddit))
    //     dispatch(fetchPostsIfNeeded(selectedReddit))
    // }



    render() {
        const { todos } = this.props
        // const { todos, isFetching } = this.props
        // const isEmpty = todos.length === 0

        return (
            <div>
                <AddTodo />
                <TodoList todos={todos} />
                {/*{isFetching*/}
                    {/*? <h2>Loading...</h2>*/}
                    {/*: <TodoList todos={todos} />*/}
                {/*}*/}
            </div>
        )
    }
}

App.propTypes = {
    todos: PropTypes.array.isRequired
}

// const mapStateToProps = state => ({
//     todos: state
// })

const mapStateToProps = () => {
    // const todosByPetatto = state
    const {
        isFetching,
        items: todos
    } = {
        isFetching: true,
        items: []
    }

    return {
        todos,
        isFetching
    }
}

export default connect(mapStateToProps)(App)