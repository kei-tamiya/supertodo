import React, { PropTypes, Component } from 'react';

import mui, {AppBar} from 'material-ui';
import { themeDecorator } from 'material-ui/lib/styles/theme-decorator';
import { getMuiTheme } from 'material-ui/lib/styles/getMuiTheme';

class Header extends Component {

    render() {
        return (
            <header className="header">
                <h1>AppBar Component</h1>
                <AppBar title="React + Redux + Material UI Boilerplate" />
            </header>
        );
    }
}

export default themeDecorator(getMuiTheme(null, { userAgent: 'all' }))(Header);