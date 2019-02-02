import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {

    let orderedIngredients = Object.keys(props.ingredients)
        .map((key) => {
            return (
                [...Array(props.ingredients[key])]
            ).map((_, index) => {
                return (
                    <BurgerIngredient key={key + index} type={key}/>
                )
            })
        }).reduce((acc, next) => {
            return acc.concat(next)
        }, []);

    if (orderedIngredients.length === 0) {
        orderedIngredients = <p className={classes.fadeInOut}>Please add some ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={"bread-top"}/>
            {orderedIngredients}
            <BurgerIngredient type={"bread-bottom"}/>
        </div>
    );
};

export default burger;