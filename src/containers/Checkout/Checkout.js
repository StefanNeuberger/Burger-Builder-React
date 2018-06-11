import React, {Component} from 'react';
import {withRouter, Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

import {connect} from 'react-redux';

class checkout extends Component {

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
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.purchaseCancelledHandler}
                    checkoutContinued={this.purchaseContinuedHandler}/>
                <Route
                    path={this.props.match.url + '/contact-data'}
                    component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      ingredients: state.ingredients,
      totalPrice: state.totalPrice
  }
};

export default connect(mapStateToProps)(withRouter(checkout));