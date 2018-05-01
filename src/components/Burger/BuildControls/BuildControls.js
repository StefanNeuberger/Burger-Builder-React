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
        {controls.map((control) => {
            return (
              <BuildControl
                  key={control.label}
                  label={control.label}
                  addedIngredient={() => props.addedIngredient(control.type)}
                  removedIngredient={() => props.removedIngredient(control.type)}
              />
            );
        })}
    </div>
);

export default buildControls;