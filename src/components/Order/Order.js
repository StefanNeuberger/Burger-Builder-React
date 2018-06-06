import React from 'react';

import classes from './Order.css';

const order = (props) => (
    <div className={classes.Order}>
        <p>SALAD: 1</p>
        <p>PRICE: <strong>USD 5.50</strong></p>
    </div>
);

export default order;