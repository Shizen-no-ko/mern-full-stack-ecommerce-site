import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Landing from './components/pages/Landing';
import ProductsFilter from './components/pages/ProductsFilter';
import IndividualProduct from './components/pages/IndividualProduct';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ShoppingCart from './components/pages/ShoppingCart';

function App() {
  return (
    <Router>
 <Fragment>
   <Route exact path="/" component={Landing} />
   <Switch>
   <Route exact path="/login" component={Login} />
   <Route exact path="/register" component={Register} />
   <Route exact path="/cart" component={ShoppingCart} />
   <Route exact path="/product" component={IndividualProduct} />
   <Route exact path="/products" component={ProductsFilter} />
   </Switch>
    </Fragment>
    </Router>
   
  );
}

export default App;
