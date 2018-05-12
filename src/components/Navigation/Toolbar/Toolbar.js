import React from 'react';
import classes from './Toolbar.css';
import BurgerLogo from '../../../components/Logo/Logo';
import NavigationItems from '../../../components/Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.box}>
            <div className={classes.left}>
                <DrawerToggle clicked={props.drawerToggleClicked}/>
            </div>
        </div>
        <div className={[classes.box, classes.logoBox].join(' ')}><BurgerLogo/></div>
        <div className={classes.box}>
            <nav className={classes.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </div>
    </header>
);

export default toolbar;