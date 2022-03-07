import { useState, useCallback } from 'react';
import {useLocation} from 'react-router-dom';

import Navbar from '../layout/Navbar';
import ProductDisplay from '../layout/ProductDisplay';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';
import Filter from '../layout/Filter';



const ProductsFilter = (props) => {
    // Get category from path, if there is one
    const path = useLocation().pathname.split('/');
    const category = path[2] ? path[2].toLowerCase() : null;
   

    const [filterState, setFilterState] = useState(category ? {category:  category} : {});
    const [sortState, setSortState] = useState(category ? {category:  category} : {});
    const [availableColorsSizes, setAvailableColorsSizes] = useState({});
    var searchField, searchValue;

    // If category from path is 'search', obtain field and value key-value pairs from url
    if(category === 'search'){
        const params = (new URL(document.location)).searchParams;
        searchField = params.get('field');
        searchValue = params.get('value');
    }
   

    // const getFilterState = (filterState) => {
    //     const lowerCaseFilterState = {};
    //   Object.entries(filterState).forEach((entry) => {
    //       lowerCaseFilterState[entry[0]] = entry[1].toLowerCase();
    //     })
    //     setFilterState(lowerCaseFilterState);
    // };

    // const getFilterState = useCallback((filterState) => {
    //     setFilterState(filterState);
    // }, [filterState]);

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
            <Filter setParentFilterState={setFilterState} setParentSortState={setSortState} category={category} availableColorsSizes={availableColorsSizes} searchField={searchField} searchValue={searchValue}/>
            <ProductDisplay searchField={searchField} searchValue={searchValue} filter={filterState} sort={sortState} category={category} getAvailableColorsSizes={getAvailableColorsSizes}/>
            <SubscriptionForm/>
            <Footer/>
        </div>
    )
}

export default ProductsFilter