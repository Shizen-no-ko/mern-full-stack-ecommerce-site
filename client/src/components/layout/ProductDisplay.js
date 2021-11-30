import styled from 'styled-components';
// import {mobile} from '../../responsive';
import {useLocation} from 'react-router-dom';

import ProductElement from './ProductElement.js';

import {productData} from '../../data/data.js';

const Container = styled.div`
display:flex;
flex-wrap: wrap;
justify-content: space-evenly;
${'' /* height: 50vh; */}
margin: auto;
width: 97vw;


`



const ProductDisplay = () => {
    const locationArray = useLocation().pathname.split('/');

    const category = locationArray[locationArray.length - 1];
    return(
       <Container>
       {
        productData.map((product, i) => { 
            if(product.category.includes(category)){
                return(
                <ProductElement key={i} element={product}/>   
                )
            } else {
                return null
            }
            
       })
       }
       </Container>
    )
}

export default ProductDisplay