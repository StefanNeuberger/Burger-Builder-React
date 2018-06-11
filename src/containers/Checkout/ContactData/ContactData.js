import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-orders';
import classes from './ContactData.css';
import dateFormat from 'dateformat';

import {connect} from 'react-redux';

class contactData extends Component {

    state = {
        orderForm: {
            name:
                this.createFormElement(
                    'input',
                    {type: 'text', placeholder: 'Your Name'},
                    '',
                    {required: true},
                    false,
                    false,
                    'Please enter a valid Name'),
            street:
                this.createFormElement(
                    'input',
                    {type: 'text', placeholder: 'Your Street'},
                    '',
                    {required: true},
                    false,
                    false,
                    'Please enter a valid Street'),
            zipCode:
                this.createFormElement(
                    'input',
                    {type: 'text', placeholder: 'ZIP Code'},
                    '',
                    {required: true, minLength: 5},
                    false,
                    false,
                    'Please enter a valid ZIP Code'),
            country:
                this.createFormElement(
                    'input',
                    {type: 'text', placeholder: 'Country'},
                    '',
                    {required: true},
                    false,
                    false,
                    'Please enter a valid Country'),
            email:
                this.createFormElement(
                    'input',
                    {type: 'email', placeholder: 'example@mail.com'},
                    '',
                    {required: true},
                    false,
                    false,
                    'Please enter a valid E-Mail'),
            deliveryMethod:
                this.createFormElement(
                    'select',
                    {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}]
                    },
                    '',
                    {},
                    true,
                    false,
                    '')
        },
        formIsValid: false,
        loading: false,
        ordered: false
    };

    createFormElement(typeString, configObj, valueString, validationRulesObj, isValid, hasBeenTouched, validationErrorString) {
        return {
            elementType: typeString,
            elementConfig: configObj,
            value: valueString,
            validationRules: validationRulesObj,
            valid: isValid,
            touched: hasBeenTouched,
            validationErrorMessage: validationErrorString
        };
    };

    checkValidity(value, rules) {

        let isValid = true;

        if (rules) {

            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }

            if (rules.minLength) {
                isValid = value.trim().length >= rules.minLength && isValid;
            }

            if (rules.maxLength) {
                isValid = value.trim().length <= rules.maxLength && isValid;
            }
        }

        return isValid;
    };

    inputChangedHandler = (id, event) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[id]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validationRules);
        updatedFormElement.touched = true;
        updatedOrderForm[id] = updatedFormElement;

        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    };

    // event.preventDefault so that page does not get reloaded, which is default behaviour (sending request) of button inside form
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const date = dateFormat(new Date(), 'isoDateTime');

        const orderData = {};
        const formData = this.state.orderForm;
        for (let key in formData) {
            orderData[key] = formData[key].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            date: date,
            orderData: orderData
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

        const formElements = formElementsArray.map(elem => {
            return <Input
                key={elem.id}
                elementType={elem.elementType}
                elementConfig={elem.elementConfig}
                value={elem.value}
                invalid={!elem.valid}
                shouldValidate={elem.validationRules}
                touched={elem.touched}
                validationErrorMessage={elem.validationErrorMessage}
                changed={(event) => this.inputChangedHandler(elem.id, event)}/>
        });

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements}
                <Button btnType={'Success'} disabled={!this.state.formIsValid}>ORDER NOW</Button>
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

export default connect(mapStateToProps)(contactData);