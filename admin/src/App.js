import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

import ScrollToTop from './utilities/ScrollToTop';

import Landing from './components/pages/Landing';
import ProductsFilter from './components/pages/ProductsFilter';
import IndividualProduct from './components/pages/IndividualProduct';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ShoppingCart from './components/pages/ShoppingCart';

function App() {
  const user = useSelector(state => state.user.currentUser);
  
  return (
    <Router>
 <Fragment>
 <ScrollToTop/>
   <Route exact path="/" component={Landing} />
   <Switch>
   <Route exact path="/login">{user ? <Redirect to='/'/> : <Login/>}</Route>
   <Route exact path="/register">{user ? <Redirect to='/'/> : <Register/>}</Route>
   <Route exact path="/cart" component={ShoppingCart} />
   <Route exact path="/product/:id" component={IndividualProduct} />
   <Route exact path="/products/:category" component={ProductsFilter} />
   <Route exact path="/products" component={ProductsFilter} />
   {/* :category */}
   </Switch>
    </Fragment>
    </Router>
   
  );
}

export default App;
