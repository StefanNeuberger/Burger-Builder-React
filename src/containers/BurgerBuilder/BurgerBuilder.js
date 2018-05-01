import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            cheese: 1,
            bacon: 1,
            salad: 1,
            meat: 2
        }
    };

    addIngredientHandler = (type) => {
        const ingredients = {...this.state.ingredients};
        ingredients[type]++;
        this.setState({
            ingredients: ingredients
        });
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const ingredients = {...this.state.ingredients};
            ingredients[type]--;
            this.setState({
                ingredients: ingredients
            });
        }
    };

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls addedIngredient={this.addIngredientHandler} removedIngredient={this.removeIngredientHandler}/>
            </Aux>
        )
    };
}

export default BurgerBuilder;