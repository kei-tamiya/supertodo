import React, { PropTypes } from 'react';
import { GREEN, BLUE, ORANGE } from '../constant/Color.jsx';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const TodoTitleInput = ({id, title, changeTodoTitle}) => (
  <input
    type="text"
    value={title}
    onChange={(e) => changeTodoTitle(e, id)}
  />
  // <Paper zDepth={2}>
  //   <TextField ref='addTodoInput' hintText='New To Do' underlineStyle={styles.underlineStyle} value={newTodoTitle} onChange={(event) => changeTodoTitle(event)} />
  // <Divider />
  // </Paper>
);

TodoTitleInput.PropTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
};

export default TodoTitleInput;
