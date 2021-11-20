import styled from 'styled-components';
import {mobile} from '../../responsive';

import CategoryElement from './CategoryElement';
import {categoriesData} from '../../data/data.js';

const Container = styled.div`
${'' /* background-color: red; */}
display:flex;
justify-content: space-between;
height: 60vh;
margin: 40px auto;
width: 97vw;

${mobile({
        flexDirection: 'column',
        height: 'auto'
        })};

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