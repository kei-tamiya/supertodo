import React, { PropTypes } from 'react';
import { GREEN, BLUE, ORANGE, DEEPGREEN } from '../constant/Color.jsx';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const TodoTitleInput = ({id, title, changeTodoTitle, updateTodo}) => (
  <form onSubmit={(e) => {
    e.preventDefault();
    changeTodoTitle(e, id)}} >
    <Paper zDepth={2}>
      <TextField hintText='New To Do' className={'todoText'} underlineStyle={{borderColor: ORANGE}} value={title} onChange={(e) => changeTodoTitle(e, id)} onBlur={() => updateTodo(id)} />
    <Divider />
    </Paper>
  </form>
);

TodoTitleInput.PropTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
};

export default TodoTitleInput;
