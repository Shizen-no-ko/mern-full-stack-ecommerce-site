import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '../layout/Navbar';
import ProductDisplay from '../layout/ProductDisplay';
import Footer from '../layout/Footer';
import Filter from '../layout/Filter';



const ProductsFilter = () => {
    // Get category from path, if there is one
    const path = useLocation().pathname.split('/');
    const category = path[2] ? path[2].toLowerCase() : null;


    const [filterState, setFilterState] = useState(category ? { category: category } : {});
    const [sortState, setSortState] = useState(category ? { category: category } : {});
    const [availableColorsSizes, setAvailableColorsSizes] = useState({});
    var searchField, searchValue;

    // If category from path is 'search', obtain field and value key-value pairs from url
    if (category === 'search') {
        const params = (new URL(document.location)).searchParams;
        searchField = params.get('field');
        searchValue = params.get('value');
    }


    return (
        <div>
            <Navbar />
            <Filter setParentFilterState={setFilterState} setParentSortState={setSortState} category={category} availableColorsSizes={availableColorsSizes} searchField={searchField} searchValue={searchValue} />
            <ProductDisplay searchField={searchField} searchValue={searchValue} filter={filterState} sort={sortState} category={category} getAvailableColorsSizes={setAvailableColorsSizes} />
            <Footer />
        </div>
    )
}

export default ProductsFilter