import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// import {mobile} from '../../responsive';


import ProductElement from './ProductElement.js';

import { productData } from '../../data/data.js';
import ProductsFilter from '../pages/ProductsFilter.js';

const Container = styled.div`
display:flex;
flex-wrap: wrap;
justify-content: space-evenly;
${'' /* height: 50vh; */}
margin: auto;
width: 97vw;


`



const ProductDisplay = ({ category, filter }) => {

    //   console.log("Category is");
    //   console.log(category)



    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);



    // getAllProducts();


    console.log("Filter is:")
    console.log(filter);





    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await axios.get(category !== null && category !== ""
                    ? `http://localhost:5000/api/products/all?category=${category}`
                    : 'http://localhost:5000/api/products/all'
                );
                setProducts(res.data);
            }
            catch (err) { console.log(err) }
        };
        getAllProducts();
    }, [category])

    // useEffect(() => {
    //     const updateCategory = async () => {
    //         try{
    //                 const res = await axios.get(filter.category
    //                     ? `http://localhost:5000/api/products/all?category=${filter.category}`
    //                     : 'http://localhost:5000/api/products/all' 
    //                 );
    //                setProducts(res.data);
    //         }
    //         catch (err) { console.log(err)}
    //     };
    //     updateCategory();
    // }, [filter])

    // console.log(`key is: ${key} Product[key] is: ${product[key]}, Value is; ${value} `)
    // console.log(product[key].includes(value));
    //   return product[key].includes(value)

    useEffect(() => {
        const filterResult = products.filter((item) => {
            return Object.entries(filter).every(([key, value]) => {
                return item[key].includes(value);
            }
            )
        }
        )
        setFiltered(filterResult);
    }, [products, filter, category])

    useEffect(() => {
        console.log("FILTERED CHANGED");
        console.log("Filtered is:")
        console.log(filtered);
        console.log("Products is")
        console.log(products)
    }, [filtered]);

    return (
        <Container>
            {
                filtered.map((product, i) => {
                    return (
                        <ProductElement key={i} element={product} />
                    )
                })
            }
        </Container>
    )
}

export default ProductDisplay