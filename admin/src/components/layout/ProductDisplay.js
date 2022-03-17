import { useState, useEffect } from 'react';
import { publicReq } from '../../axiosRequests.js';
import styled from 'styled-components';

import ProductElement from './ProductElement.js';


const Container = styled.div`
display:flex;
flex-wrap: wrap;
justify-content: space-evenly;
margin: auto;
width: 97vw;
`


const ProductDisplay = ({ category, filter, sort, landing, getAvailableColorsSizes, searchField, searchValue }) => {


    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);


    useEffect(() => {
        const getAllProducts = async () => {
            try {
                if (category === 'search') {
                    const res = await publicReq.get(`/products/all?${searchField}=${searchValue}`
                    );
                    setProducts(res.data);
                }
                else if (category === 'deleted') {
                    const res = await publicReq.get('/products/deleted');
                    return setProducts(res.data);

                }
                else {
                    const res = await publicReq.get(category !== null && category !== ""
                        ? `/products/all?category=${category}`
                        : '/products/all'
                    );
                    setProducts(res.data);
                }

            }

            catch (err) { console.log(err) }
        };
        getAllProducts();
    }, [category, searchField, searchValue])



    useEffect(() => {
        // Filter through retrieved products and set filterResult to 
        // items which match settings in Filter.js
        const filterResult = products.filter((item) => {
            return Object.entries(filter).every(([key, value]) => {
                return item[key].includes(value);
            }
            )
        }
        )
        setFiltered(filterResult);
        var filteredColors = [];
        var filteredSizes = [];
        products.forEach(product => {
            filteredColors.push(...product.color);
            filteredSizes.push(...product.size);
        });
        // Make colors and sizes arrays of unique values
        filteredColors = filteredColors.filter((element, index, array) => array.indexOf(element) === index);
        filteredSizes = filteredSizes.filter((element, index, array) => array.indexOf(element) === index);
        // If not landing page, set colors and values for selectors in Filter.js
        if (!landing) getAvailableColorsSizes({ colors: ['All Colors', ...filteredColors], sizes: ['All Sizes', ...filteredSizes] });
    }, [products, filter, category, landing, getAvailableColorsSizes])



    useEffect(() => {
        if (sort === 'Most Recent') {
            setFiltered(prev => [...prev].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
        } else {
            setFiltered(prev => [...prev].sort((a, b) => sort === 'Price Ascending' ? a.price - b.price : b.price - a.price));
        }
    }, [sort])

    return (
        <Container>
            {
                filtered.length ?
                    filtered.map((product, i) => {
                        return (
                            <ProductElement key={i} element={product} deleted={category === 'deleted' ? true : false} />
                        )
                    })
                    : <h1>SORRY. NO PRODUCTS MATCH YOUR SELECTION</h1>

            }
        </Container>
    )
}

export default ProductDisplay