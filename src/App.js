import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <div className="App">
                <Layout>
                    <Switch>
                        <Route path={'/checkout'} component={Checkout}/>
                        <Route path={'/orders'} component={Orders}/>
                        <Route path={'/'} exact component={BurgerBuilder}/>
                    </Switch>
                    {/*<BurgerBuilder/>*/}
                    {/*<Checkout/>*/}
                </Layout>
            </div>
        );
    }
}

export default App;
