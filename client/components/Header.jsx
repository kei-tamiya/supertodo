import React, { PropTypes } from 'react';
import mui, {AppBar} from 'material-ui';

const Header = ({ auth, handleLogout }) => (
  <div>
    <AppBar title="Petatto - My Todo App" />
    {auth.isLoggedIn &&
      <button onClick={handleLogout}>Logout</button>
    }
  </div>
);

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Header;
