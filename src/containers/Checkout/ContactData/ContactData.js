import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-orders';
import classes from './ContactData.css';
import dateFormat from 'dateformat';

class contactData extends Component {

    state = {
        orderForm: {
            name: this.createFormElement('input', {type: 'text', placeholder: 'Your Name'}, ''),
            street: this.createFormElement('input', {type: 'text', placeholder: 'Your Street'}, ''),
            zipCode: this.createFormElement('input', {type: 'text', placeholder: 'ZIP Code'}, ''),
            country: this.createFormElement('input', {type: 'text', placeholder: 'Country'}, ''),
            email: this.createFormElement('input', {type: 'email', placeholder: 'example@mail.com'}, ''),
            deliveryMethod: this.createFormElement('select', {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}]
            }, '')
        },
        loading: false,
        ordered: false
    };

    createFormElement(typeString, configObj, valueString) {
        return {
            elementType: typeString,
            elementConfig: configObj,
            value: valueString
        };
    }

    // event.preventDefault so that page does not get reloaded, which is default behaviour (sending request) of button inside form
    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);

        this.setState({loading: true});
        const date = dateFormat(new Date(), 'isoDateTime');
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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

        const formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                ...this.state.orderForm[key]
            });
        }

        console.log(formElementsArray)

        const formElements = formElementsArray.map(elem => {
            return <Input key={elem.id} elementType={elem.elementType} elementConfig={elem.elementConfig} value={elem.value}/>
        });

        let form = (
            <form action="">
                {formElements}
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