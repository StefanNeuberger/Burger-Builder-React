import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const BASE_BURGER_PRICE = 4;
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    bacon: 0.7,
    meat: 1.5
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            cheese: 0,
            bacon: 0,
            salad: 0,
            meat: 0
        },
        totalPrice: BASE_BURGER_PRICE,
        purchasable: false,
        purchasing: false
    };

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    };

    cancelPurchaseHandler = () => {
        this.setState({
            purchasing: false
        })
    };

    continuePurchaseHandler = () => {
        alert('You continue!');
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients).reduce((acc, next) => acc + next);
        const purchasable = sum > 0;
        this.setState({
            purchasable: purchasable
        });
    };

    addIngredientHandler = (type) => {
        const ingredients = {...this.state.ingredients};
        ingredients[type]++;
        const updatedPrice = (this.state.totalPrice * 10 + INGREDIENT_PRICES[type] * 10) / 10;
        this.setState({
            ingredients: ingredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(ingredients);
    };

    removeIngredientHandler = (type) => {
        const ingredients = {...this.state.ingredients};
        ingredients[type]--;
        const updatedPrice = (this.state.totalPrice * 10 - INGREDIENT_PRICES[type] * 10) / 10;
        this.setState({
            ingredients: ingredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(ingredients);
    };

    render() {

        const disabledInfo = {...this.state.ingredients};

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    cancelPurchase={this.cancelPurchaseHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice.toFixed(2)}
                        purchaseCancel={this.cancelPurchaseHandler}
                        purchaseContinue={this.continuePurchaseHandler}/>
                </Modal>
                <Burger
                    ingredients={this.state.ingredients}
                    purchasing={this.state.purchasing}/>
                <BuildControls
                    addedIngredient={this.addIngredientHandler}
                    removedIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordering={this.purchaseHandler}
                    purchasing={this.state.purchasing}
                />
            </Aux>
        )
    };
}

export default BurgerBuilder;