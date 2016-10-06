// import React, { PropTypes, Component } from 'react';
//
// import mui, {AppBar} from 'material-ui';
// import themeDecorator from 'material-ui/styles/theme-decorator';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
//
// class Header extends Component {
//
//     render() {
//         return (
//             <header className="header">
//                 <h1>AppBar Component</h1>
//                 <AppBar title="React + Redux + Material UI Boilerplate" />
//             </header>
//         );
//     }
// }
//
// export default themeDecorator(getMuiTheme(null, { userAgent: 'all' }))(Header);

import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

class Main extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <AppBar title="My AppBar" />
      </MuiThemeProvider>
    );
  }
}

export default Main;
