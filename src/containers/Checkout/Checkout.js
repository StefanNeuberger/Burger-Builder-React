import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import dateFormat from "dateformat";
import axios from "../../axios-orders";

class checkout extends Component {

    state = {
        ingredients: {
            cheese: 1,
            bacon: 1,
            salad: 1,
            meat: 1
        },
        loading: false
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

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}/>
            </div>
        )
    }
}

export default checkout;