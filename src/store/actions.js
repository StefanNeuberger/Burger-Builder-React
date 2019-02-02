export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const PRINT_STATE = 'PRINT_STATE';

export const addIngredient = (ingredientName) => {
    return {
        type: ADD_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
}