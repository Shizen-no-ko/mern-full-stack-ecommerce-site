import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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





    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const history = useHistory();
    
    






    console.log("Filter is:")
    console.log(filter);

    // useEffect(() => {
      
    // }, [history]);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                if(category === 'deleted'){
                    const res = await publicReq.get('/products/deleted');
                     return setProducts(res.data);
                
                } 
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

    return (
        <Container>
        {
            filtered.length ?
                filtered.map((product, i) => {
                    return (
                        <ProductElement key={i} element={product} deleted={category === 'deleted' ? true: false} />
                    )
                })
            : <h1>SORRY. NO PRODUCTS MATCH YOUR SELECTION</h1>
               
            }
        </Container>
    )
}

export default ProductDisplay