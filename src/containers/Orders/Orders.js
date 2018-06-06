import React, {Component} from 'react';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const loadedOrders = [];
                for (let key in res.data) {
                    loadedOrders.push({
                        ...res.data[key],
                        key: key
                    })
                }
                this.setState({orders: loadedOrders, loading: false});
            }).catch(error => {
            this.setState({loading: false})
        })
    }

    render() {

        let order = null;

        if (this.state.loading) {
            order = <Spinner/>
        }

        if (!this.state.loading) {
            order = this.state.orders.map(order => {
                const date = order.date.substring(0, order.date.indexOf('T'));
                const time = order.date.substring(order.date.indexOf('T') + 1, order.date.indexOf('+'));
                return (
                    <Order
                        key={order.key}
                        date={date}
                        time={time}/>
                )
            });
        }

        return (
            <div>
                {order}
            </div>
        );
    }
}

export default withErrorHandler(orders, axios);