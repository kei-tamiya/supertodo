import React, { PropTypes } from 'react';
import mui, {AppBar} from 'material-ui';
import Logged from './Logged.jsx';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

const Header = ({ auth, handleLogout }) => (
  <div>
    {auth.isLoggedIn
      ? (
        <AppBar
          title="Petatto - My Todo App"
          showMenuIconButton={false}
          iconElementRight={<FlatButton label="Logout" onClick={handleLogout} />}
        />
      )
      : (
        <AppBar
          title="Petatto - My Todo App"
          showMenuIconButton={false}
          iconElementRight={
            <Logged />
          }
        />
      )
    }
  </div>
);

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Header;
