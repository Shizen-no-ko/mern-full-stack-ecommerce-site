import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

import ScrollToTop from './utilities/ScrollToTop';

import Landing from './components/pages/Landing';
import ProductsFilter from './components/pages/ProductsFilter';
import DeletedProducts from './components/pages/DeletedProducts';
import IndividualProduct from './components/pages/IndividualProduct';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ShoppingCart from './components/pages/ShoppingCart';

function App() {
  const user = useSelector(state => state.user.currentUser);
  // Protect all routes
  return (
    <Router>
 <Fragment>
 <ScrollToTop/>
   <Route exact path="/">{user ? <Landing/> : <Login/>}</Route>
   <Switch>
   <Route exact path="/login">{user ? <Redirect to='/'/> : <Login/>}</Route>
   <Route exact path="/product/:id">{user ? <IndividualProduct/> : <Login/>}</Route> 
   <Route exact path="/products/:category">{user ? <ProductsFilter/> : <Login/>}</Route> 
   <Route exact path="/products">{user ? <ProductsFilter/> : <Login/>}</Route>
   <Route exact path="/deleted">{user ? <DeletedProducts/> : <Login/>}</Route>
   <Route exact path="/add">{user ? <IndividualProduct add='true' /> : <Login/>}</Route>
   {/* component={() => (<IndividualProduct add='true' />)}/>  */}
   {/* :category */}
   </Switch>
    </Fragment>
    </Router>
   
  );
}

export default App;
