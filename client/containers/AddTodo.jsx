import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { changeNewTodoTitle, addTodoByApi } from '../actions/Todo.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { GREEN, BLUE, ORANGE } from '../constant/Color.jsx';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class AddTodo extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleChange = this.handleChange.bind(this);
  // }

  handleChange(e) {
    e.preventDefault();
    this.props.dispatch(changeNewTodoTitle(e.target.value))
  }

  render() {
    const { dispatch, newTodoTitle } = this.props;
    const styles = {
      errorStyle: {
        color: ORANGE,
      },
      underlineStyle: {
        borderColor: ORANGE,
      },
      floatingLabelStyle: {
        color: ORANGE,
      },
      floatingLabelFocusStyle: {
        color: BLUE,
      },
    };

    return (
      <form onSubmit={e => {
        e.preventDefault();
        let addTodoInput = this.refs.addTodoInput;
        let todoTitle = addTodoInput.getValue().trim();
        if (!todoTitle) {
            return
        }
        dispatch(addTodoByApi(todoTitle));
      }}>
        <Paper zDepth={2}>
          <TextField ref='addTodoInput' hintText='New To Do' underlineStyle={styles.underlineStyle} value={newTodoTitle} onChange={(event) => this.handleChange(event)} />
          <Divider />
        </Paper>
        <FloatingActionButton backgroundColor={GREEN} type='submit'>
          <ContentAdd />
        </FloatingActionButton>
      </form>
    );
  }
}

AddTodo.propTypes = {
  newTodoTitle: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    newTodoTitle: state.selectedBoard.newTodoTitle,
  };
};

export default connect(mapStateToProps)(AddTodo);
