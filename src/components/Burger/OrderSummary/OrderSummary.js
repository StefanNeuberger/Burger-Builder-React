import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients).map((ingredient, index) => {
            return (
                <li key={ingredient + index}>
                    <span
                        style={{textTransform: 'capitalize'}}>{ingredient}:</span> {this.props.ingredients[ingredient]}
                </li>
            )
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.purchaseCancel} btnType={'Danger'}>CANCEL</Button>
                <Button clicked={this.props.purchaseContinue} btnType={'Success'}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;

// const orderSummary = (props) => {
//     const ingredientSummary = Object.keys(props.ingredients).map((ingredient, index) => {
//        return (
//            <li key={ingredient + index}><span style={{textTransform: 'capitalize'}}>{ingredient}:</span> {props.ingredients[ingredient]}</li>
//        )
//     });
//
//     return (
//         <Aux>
//             <h3>Your Order</h3>
//             <p>A delicious burger with following ingredients:</p>
//             <ul>
//                 {ingredientSummary}
//             </ul>
//             <p><strong>Total Price: {props.price}</strong></p>
//             <p>Continue to Checkout?</p>
//             <Button clicked={props.purchaseCancel} btnType={'Danger'}>CANCEL</Button>
//             <Button clicked={props.purchaseContinue} btnType={'Success'}>CONTINUE</Button>
//         </Aux>
//     )
// };
//
// export default orderSummary;