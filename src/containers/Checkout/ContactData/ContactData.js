import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';

class contactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    };

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form action="">
                    <input className={classes.Input} type="text" name={'name'} placeholder={'Your Name'}/>
                    <input className={classes.Input} type="email" name={'email'} placeholder={'example@mail.com'}/>
                    <input className={classes.Input} type="text" name={'street'} placeholder={'Your Street'}/>
                    <input className={classes.Input} type="text" name={'postalcode'} placeholder={'Your Postal Code'}/>
                </form>
                <Button btnType={'Success'}>ORDER NOW</Button>
            </div>
        )

    }
}

export default contactData;