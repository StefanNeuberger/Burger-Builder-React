import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-orders';
import classes from './ContactData.css';
import dateFormat from 'dateformat';

class contactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
        ordered: false
    };

    // event.preventDefault so that page does not get reloaded, which is default behaviour (sending request) of button inside form
    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);

        this.setState({loading: true});
        const date = dateFormat(new Date(), 'isoDateTime');
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
            date: date,
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, ordered: true});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false})
            });
    };

    render() {

        let form = (
            <form action="">
                <Input inputtype="input" type="text" name={'name'} placeholder={'Your Name'}/>
                <Input inputtype="input" type="email" name={'email'} placeholder={'example@mail.com'}/>
                <Input inputtype="input" type="text" name={'street'} placeholder={'Your Street'}/>
                <Input inputtype="input" type="text" name={'postalcode'} placeholder={'Your Postal Code'}/>
                <Button btnType={'Success'} clicked={this.orderHandler}>ORDER NOW</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>

        )

    }
}

export default contactData;