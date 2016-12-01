import React from 'react';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';

const Logged = props => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <Link to="/signup"><MenuItem primaryText="SignUp" desktop={false} /></Link>
    <Link to="/login"><MenuItem primaryText="Login" desktop={false} /></Link>
  </IconMenu>
);

export default Logged;
