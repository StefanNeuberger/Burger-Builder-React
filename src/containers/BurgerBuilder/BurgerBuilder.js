import React, {Component} from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

// const BASE_BURGER_PRICE = 4;
// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.7,
//     bacon: 0.7,
//     meat: 1.5
// };

class BurgerBuilder extends Component {

    state = {
        // ingredients: null,
        // totalPrice: BASE_BURGER_PRICE,
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    // componentDidMount() {
    //     axios.get('/ingredients.json')
    //         .then(res => {
    //             this.setState({ingredients: res.data})
    //         })
    //         .catch(error => {
    //             this.setState({error: true})
    //         });
    // };

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
        const queryParams = [];
        for (let ingredient in this.props.ingredients) {
            queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.props.ingredients[ingredient]));
        }
        queryParams.push('price=' + this.props.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    };

    // updatePurchaseState = (ingredients) => {
    //     const sum = Object.values(ingredients).reduce((acc, next) => acc + next);
    //     const purchasable = sum > 0;
    //     this.setState({
    //         purchasable: purchasable
    //     });
    // };

    // addIngredientHandler = (type) => {
    //     const ingredients = {...this.state.ingredients};
    //     ingredients[type]++;
    //     const updatedPrice = (this.state.totalPrice * 10 + INGREDIENT_PRICES[type] * 10) / 10;
    //     this.setState({
    //         ingredients: ingredients,
    //         totalPrice: updatedPrice
    //     });
    //     this.updatePurchaseState(ingredients);
    // };

    // removeIngredientHandler = (type) => {
    //     const ingredients = {...this.state.ingredients};
    //     ingredients[type]--;
    //     const updatedPrice = (this.state.totalPrice * 10 - INGREDIENT_PRICES[type] * 10) / 10;
    //     this.setState({
    //         ingredients: ingredients,
    //         totalPrice: updatedPrice
    //     });
    //     this.updatePurchaseState(ingredients);
    // };

    render() {

        const disabledInfo = {...this.props.ingredients};

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can´t be loaded!</p> : <Spinner/>;

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <button onClick={this.props.onPrintState}>PRINT STATE</button>
                    <Burger
                        ingredients={this.props.ingredients}/>
                    <BuildControls
                        addedIngredient={this.props.onAddIngredient}
                        removedIngredient={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.props.purchasable}
                        ordering={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice.toFixed(2)}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
            />;
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner/>
        // }

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

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
        onRemoveIngredient: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName}),
        onPrintState: () => dispatch({type: actionTypes.PRINT_STATE})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));