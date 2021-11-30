import { useState } from 'react';

import Navbar from '../layout/Navbar';
import ProductDisplay from '../layout/ProductDisplay';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';
import Filter from '../layout/Filter';



const ProductsFilter = (props) => {
    
    const [displayState, setDisplayState] = useState({category: props.location.state ? props.location.state.category : ''});
    
    const getFilterState = (filterState) => {
        setDisplayState(filterState);
        // console.log(displayState);
    }
    return(
        <div>
            <Navbar/>
            <Filter getFilterState={getFilterState}/>
            <ProductDisplay state={props.location.state} displayState={displayState}/>
            <SubscriptionForm/>
            <Footer/>
        </div>
    )
}

export default ProductsFilter