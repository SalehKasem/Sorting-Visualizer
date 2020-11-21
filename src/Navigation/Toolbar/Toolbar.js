import React from 'react';
import classes from './Toolbar.css';
import Items from '../Items/Items';
import Logo from '../../Logo/Logo';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Logo/>
        <Items/>
    </header>
)


export default Toolbar;