import React from 'react';
import classes from './Logo.css';
import reactLogo from './logo192.png';

const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={reactLogo} alt="Sorting Visualizer" />
    </div>
)

export default logo;