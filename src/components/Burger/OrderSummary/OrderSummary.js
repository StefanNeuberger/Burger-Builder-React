import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((ingredient, index) => {
       return (
           <li key={ingredient + index}><span style={{textTransform: 'capitalize'}}>{ingredient}:</span> {props.ingredients[ingredient]}</li>
       )
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    )
};

export default orderSummary;