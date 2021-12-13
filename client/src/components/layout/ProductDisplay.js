import { useState, useEffect } from 'react';
// import axios from 'axios';
import { publicReq } from '../../axiosRequests.js';
import styled from 'styled-components';
// import {mobile} from '../../responsive';


import ProductElement from './ProductElement.js';

// import { productData } from '../../data/data.js';
// import ProductsFilter from '../pages/ProductsFilter.js';

const Container = styled.div`
display:flex;
flex-wrap: wrap;
justify-content: space-evenly;
${'' /* height: 50vh; */}
margin: auto;
width: 97vw;


`



const ProductDisplay = ({ category, filter, sort, landing, getAvailableColorsSizes }) => {

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
                // publicReq.interceptors.request.use(function (config) {
                //     // Do something before request is sent
                //     console.log(config)
                //     return config;
                //   }, function (error) {
                //     // Do something with request error
                //     return Promise.reject(error);
                //   });
                // const res = await axios.get(category !== null && category !== ""
                //     ? `http://localhost:5000/api/products/all?category=${category}`
                //     : 'http://localhost:5000/api/products/all'
                // );
                const res = await publicReq.get(category !== null && category !== ""
                    ? `/products/all?category=${category}`
                    : '/products/all'
                );
                setProducts(res.data);
            }
            catch (err) { console.log(err) }
        };
        getAllProducts();
       

    }, [category])

    // useEffect(() => {
    //     console.log("FilterCategory changed")
    //     const updateCategory = async () => {
    //         try{
    //                 const res = await axios.get(filter.category && filter.category !== category
    //                     ? `http://localhost:5000/api/products/all?category=${filter.category}`
    //                     : 'http://localhost:5000/api/products/all' 
    //                 );
    //                setProducts(res.data);
    //         }
    //         catch (err) { console.log(err)}
    //     };
    //     updateCategory();
    // }, [filter.category])

   

    useEffect(() => {
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
        filteredColors = filteredColors.filter((element, index, array) => array.indexOf(element) === index);
        filteredSizes = filteredSizes.filter((element, index, array) => array.indexOf(element) === index);
        if(!landing) getAvailableColorsSizes({colors: filteredColors, sizes:filteredSizes});

    }, [products, filter, category ])

    useEffect(() => {
        if(sort === 'Most Recent'){
           setFiltered(prev => [...prev].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
        } else {
            setFiltered(prev => [...prev].sort((a, b) => sort ==='Price Ascending' ? a.price - b.price : b.price - a.price ));
        }
    }, [sort])

    // useEffect(() => {
    //     console.log("FILTERED CHANGED");
    //     console.log("Filtered is:")
    //     console.log(filtered);
    //     console.log("Products is")
    //     console.log(products)
    // }, [filtered]);

    return (
        <Container>
        {
            !landing ?
            filtered.length ?
                filtered.map((product, i) => {
                    return (
                        <ProductElement key={i} element={product} />
                    )
                })
            : <h1>SORRY. NO PRODUCTS MATCH YOUR SELECTION</h1>
                : 
                products.sort((a, b) =>new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 8).map((product, i) => {
                    return (
                        <ProductElement key={i} element={product} />
                    )
                })  
            }
        </Container>
    )
}

export default ProductDisplay