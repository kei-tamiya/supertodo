import React, { PropTypes } from 'react';

const Todo = ({ completed, title }) => (
  <li
    style={{
        textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    {title}
    {completed
        ? 'truetrue' : 'falsefalse'
    }
  </li>
);

Todo.propTypes = {
  // onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Todo;
