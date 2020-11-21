import React from 'react';
import classes from './Item.css';

const Item = (props) => (
    <li className={classes.Item}>
        {props.children}
    </li>
)
export default Item;