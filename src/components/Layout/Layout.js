import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class layout extends Component {

    state = {
        showSideDrawer: true
    };

    sideDrawerCloseHandler = () => {
        this.setState( {
            showSideDrawer: false
        })
    };

    sideDrawToggleHandler = () => {
      this.setState( ( prevState ) => {
         return { showSideDrawer: !prevState.showSideDrawer}
      });
    };

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawToggleHandler}/>
                <SideDrawer
                    show={this.state.showSideDrawer}
                    close={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}



export default layout;