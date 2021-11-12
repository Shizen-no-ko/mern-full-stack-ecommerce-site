import styled from 'styled-components';

import CategoryElement from './CategoryElement';
import {categoriesData} from '../../data/data.js';

const Container = styled.div`
display:flex;
justify-content: space-between;
height: 50vh;
margin: auto;
width: 98vw;

`

const Categories = () => {
    return(
       <Container>
       {
        categoriesData.map((category, i) => { 
            return(
                <CategoryElement key={i} element={category}/>   
                )
        
       })
       }
       
       </Container>
    )
}

export default Categories