import styled from 'styled-components';

import ProductElement from './ProductElement.js';

import {productData} from '../../data/data.js';

const Container = styled.div`
display:flex;
flex-wrap: wrap;
justify-content: space-evenly;
height: 50vh;
margin: auto;
width: 98vw;
`

const ProductDisplay = () => {
    return(
       <Container>
       {
        productData.map((product, i) => { 
            return(
                <ProductElement key={i} element={product}/>   
                )
       })
       }
       </Container>
    )
}

export default ProductDisplay