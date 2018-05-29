import React, {Component} from 'react';
import axios from '../../axios-orders';

import dateFormat from 'dateformat';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const BASE_BURGER_PRICE = 4;
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    bacon: 0.7,
    meat: 1.5
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: BASE_BURGER_PRICE,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(res => this.setState({ingredients: res.data}))
            .catch(error => {
                this.setState({error: true})
            })
    };

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    };

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const date = dateFormat(new Date(), 'isoDateTime');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Stefan Neuberger',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '48587',
                    country: 'Germany'
                },
                email: 'stef.neuberger@gmail.com'
            },
            deliveryMethod: 'fastest',
            date: date
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false})
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false})
            });
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

        let orderSummary = null;

        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can´t be loaded!</p> : <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <Aux>
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
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice.toFixed(2)}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    };
}

export default withErrorHandler(BurgerBuilder, axios);