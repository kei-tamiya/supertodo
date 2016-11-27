import React, { PropTypes } from 'react';
import mui, {AppBar} from 'material-ui';
import { Link } from 'react-router';


const Header = ({ auth, handleLogout }) => (
  <div>
    <AppBar title="Petatto - My Todo App" showMenuIconButton={false} />
    {auth.isLoggedIn
      ? <button onClick={handleLogout}>Logout</button>
      : (
        <div>
          <Link to="/signup">SignUp</Link>
          <Link to="/login">Login</Link>
        </div>
      )
    }
  </div>
);

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Header;
