import React, { PropTypes } from 'react';
import mui, {AppBar} from 'material-ui';
import Logged from './Logged.jsx';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';
import { GREEN } from '../constant/Color.jsx';

const tabStyles = {
  rootContainer: {
    backgroundColor: GREEN,
    height: 36,
  },
  headline: {
    fontSize: 24,
    paddingTop: 6,
    marginBottom: 6,
    fontWeight: 400,
  },
};

const Header = ({ auth, handleLogout, handleTabChange }) => (
  <div>
    {auth.isLoggedIn
      ? (
        <header>
          <AppBar
            title="Petatto - My Todo App"
            showMenuIconButton={false}
            iconElementRight={<FlatButton label="Logout" onClick={handleLogout} />}
          />
        </header>
      )
      : (
        <header>
          <AppBar
            title="Petatto - My Todo App"
            showMenuIconButton={false}
          >

          </AppBar>
          <nav>
            <Tabs
              onChange={(e) => handleTabChange(e)}
              initialSelectedIndex={0}
            >
              <Tab label="Login" value="login" style={tabStyles.rootContainer}>
              </Tab>
              <Tab label="SignUp" value="signup" style={tabStyles.rootContainer}>
              </Tab>
            </Tabs>
          </nav>
        </header>
      )
    }
  </div>
);

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleTabChange: PropTypes.func.isRequired,
};

export default Header;
