import styled from 'styled-components';
import {mobile, portraitTablet, landscapeTablet} from '../../responsive';

const Container = styled.div`
height: 200px;
margin: 40px auto;
width: 97vw;
`

const Title = styled.h1`
color: rgba(255, 0, 0, 0.8);
font-size: 3rem;
margin: 20px 30px;

${mobile({
        fontSize: '2.5rem',
        textAlign: 'center'
        })};

        ${portraitTablet({
        textAlign: 'center'
        })};

`
const SelectorRow = styled.div`
display: flex;
justify-content: space-between;
padding: 20px 40px;

${mobile({
    flexWrap: 'wrap',
        padding: '10px 10px',
        textAlign: 'center'
        })};

        ${portraitTablet({
    flexWrap: 'wrap',
        padding: '10px 10px',
        textAlign: 'center'
        })};

        ${landscapeTablet({
    flexWrap: 'wrap',
    marginLeft: '40px',
        padding: '10px 10px',
        textAlign: 'center'
        })};
`

const SelectorContainer = styled.div`
line-height: 60px;

${mobile({
    flex: '100%',
        })};

        ${portraitTablet({
    flex: '100%',
        })};


`



const Label = styled.span`
${'' /* font-family: font-family: 'Lexend', sans-serif; */}
font-size: 20px;
padding: 10px;

${mobile({
     fontSize: '12px',  
    display: 'none'
        })};

        ${portraitTablet({ 
    display: 'none'
        })};
`

const Selector = styled.select`
border: 1px solid lightgray;
border-radius: ${props => props.pos === 'left'? '20px 0 0 20px' : props.pos === 'right'? '0 20px 20px 0' : '0' } ;
font-size: 18px;
font-weight: 500;
margin: 0 5px;
outline: none;
padding: 5px 15px;

&:focus {
    outline: none;
}

${mobile({
    fontSize: '12px',
        })};

        ${portraitTablet({
    fontSize: '15px',
        })};
`

const Option = styled.option`
font-weight: ${props => props.bold === true ? 'bold' : 'normal'};

`

const Filter = () => {
    return(
       <Container>
       <Title>PRODUCTS</Title>
       <SelectorRow>
       <SelectorContainer>
       <Label>Filter Products</Label>
       <Selector name='category' pos='left'>
       <Option bold={true} value='' disabled selected>Category</Option>
           <Option>Clothing</Option>
           <Option>Homewares</Option>
           <Option>Iro-Iro</Option>
       </Selector>
       <Selector pos='center'>
       <Option name='color' bold={true} value='' disabled selected>Color</Option>
           <Option>Red</Option>
           <Option>Black</Option>
           <Option>Yellow</Option>
           <Option>Pink</Option>
           <Option>Green</Option>
           <Option>Orange</Option>
           <Option>Purple</Option>
           <Option>Blue</Option>
           <Option>White</Option>
       </Selector>
       <Selector name='size' pos='right' >
       <Option bold={true} value='' disabled selected>Size</Option>
       <Option>XS</Option>
           <Option>S</Option>
           <Option>M</Option>
           <Option>L</Option>
           <Option>XL</Option>
           <Option>XXL</Option>
       </Selector>
       </SelectorContainer>
       <SelectorContainer>
       <Label>Sort Results</Label>
           <Selector name='sort' pos='right' >
           <Option>Most Recent</Option>
           <Option>Price Ascending</Option>
           <Option>Price Descending</Option>
       </Selector>
       </SelectorContainer>
       </SelectorRow>
       
       
       </Container>
    )
}

export default Filter