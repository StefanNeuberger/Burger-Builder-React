import React, {Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import classes from './components/Burger/BurgerIngredients/BurgerIngredient.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BurgerBuilder/>
        </Layout>
        <div className={classes.BreadBottom}>sdf</div>
      </div>
    );
  }
}

export default App;
