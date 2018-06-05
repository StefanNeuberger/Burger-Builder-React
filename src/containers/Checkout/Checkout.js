import React, {Component} from 'react';
import {withRouter, Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class checkout extends Component {

    state = {
        ingredients: {}
    };

    componentDidMount() {
        console.log(this.props)
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
                <Route path={this.props.match.url + '/contact-data'} component={ContactData}/>
            </div>
        )
    }
}

export default withRouter(checkout);