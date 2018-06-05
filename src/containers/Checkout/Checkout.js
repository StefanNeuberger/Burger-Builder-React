import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {withRouter} from 'react-router-dom';

class checkout extends Component {

    state = {
        ingredients: {}
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    };

    purchaseCancelledHandler = () => {
        this.props.history.goBack();
    };

    purchaseContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.purchaseCancelledHandler}
                    checkoutContinued={this.purchaseContinuedHandler}/>
            </div>
        )
    }
}

export default withRouter(checkout);