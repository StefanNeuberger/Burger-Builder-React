import React from 'react';
import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong> €</p>
        {controls.map((control) => (
            <BuildControl
                key={control.label}
                label={control.label}
                addedIngredient={() => props.addedIngredient(control.type)}
                removedIngredient={() => props.removedIngredient(control.type)}
                disabled={props.disabled[control.type]}
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordering}
        >
            ORDER NOW
        </button>
    </div>
);

export default buildControls;