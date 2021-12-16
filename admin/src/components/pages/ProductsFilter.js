import { useState } from 'react';
import {useLocation} from 'react-router-dom';

import Navbar from '../layout/Navbar';
import ProductDisplay from '../layout/ProductDisplay';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';
import Filter from '../layout/Filter';



const ProductsFilter = (props) => {
    const path = useLocation().pathname.split('/');
    const category = path[2] ? path[2].toLowerCase() : null;
    const [filterState, setFilterState] = useState(category ? {category:  category} : {});
    const [sortState, setSortState] = useState(category ? {category:  category} : {});
    const [availableColorsSizes, setAvailableColorsSizes] = useState({});
   
  
   

    const getFilterState = (filterState) => {
        const lowerCaseFilterState = {};
      Object.entries(filterState).forEach((entry) => {
          lowerCaseFilterState[entry[0]] = entry[1].toLowerCase();
        })
        setFilterState(lowerCaseFilterState);
    }

    const getSortState = (sortState) => {
        setSortState(sortState);
    };

    const getAvailableColorsSizes = (availableColorsSizes) => {
        setAvailableColorsSizes(availableColorsSizes);
    };




// useEffect(() => {
// console.log("rerender")
// }, [filterState])


    return(
        <div>
            <Navbar/>
            <Filter getFilterState={getFilterState} getSortState={getSortState} category={category} availableColorsSizes={availableColorsSizes}/>
            <ProductDisplay filter={filterState} sort={sortState} category={category} getAvailableColorsSizes={getAvailableColorsSizes}/>
            <SubscriptionForm/>
            <Footer/>
        </div>
    )
}

export default ProductsFilter