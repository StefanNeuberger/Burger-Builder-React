import * as actionTypes from '../actions';

const BASE_BURGER_PRICE = 4;

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    bacon: 0.7,
    meat: 1.5
};

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: BASE_BURGER_PRICE
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            let updatedPrice = (state.totalPrice * 10 + INGREDIENT_PRICES[action.ingredientName] * 10) / 10;
            return {
                ...state,
                totalPrice: updatedPrice,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }
            };
        case actionTypes.REMOVE_INGREDIENT:
            updatedPrice = state.totalPrice;
            if (state.ingredients[action.ingredientName] > 0) {
                updatedPrice = (state.totalPrice * 10 - INGREDIENT_PRICES[action.ingredientName] * 10) / 10;
                return {
                    ...state,
                    totalPrice: updatedPrice,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                    }
                }
            }

            return {
                ...state
            };
        case actionTypes.PRINT_STATE:
            console.log('reducer state: ', state);
            break;
        default:
            return {
                ...state
            }
    }
    return state;
};

export default reducer;