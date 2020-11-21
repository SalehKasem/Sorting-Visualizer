import React from 'react';
import classes from './Items.css';
import Item from './Item/Item';

const Items = (props) => (
    <ul className={classes.Items}>
        <Item>Quick Sort</Item>
        <Item>Bubble Sort</Item>
        <Item>Shuffle</Item>
    </ul>
)

export default Items;