import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

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
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.purchaseCancel} btnType={'Danger'}>CANCEL</Button>
            <Button clicked={props.purchaseContinue} btnType={'Success'}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;