import styled from 'styled-components';

const Container = styled.div`
height: 200px;
margin: 40px auto;
width: 97vw;
`

const Title = styled.h1`
font-size: 3rem;
margin: 20px 30px;
`
const SelectorRow = styled.div`
display: flex;
justify-content: space-between;
padding: 20px 40px;
`

const SelectorContainer = styled.div`
line-height: 60px;
`



const Label = styled.span`
${'' /* font-family: font-family: 'Lexend', sans-serif; */}
font-size: 20px;
padding: 10px;
`

const Selector = styled.select`
border: 1px solid lightgray;
border-radius: ${props => props.pos === 'left'? '20px 0 0 20px' : props.pos === 'right'? '0 20px 20px 0' : '0' } ;
font-size: 20px;
font-weight: 500;
margin: 0 5px;
outline: none;
padding: 5px 15px;

&:focus {
    outline: none;
}
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
       <Selector pos='left'>
       <Option bold={true} value='' disabled selected>Category</Option>
           <Option>Clothing</Option>
           <Option>Homewares</Option>
           <Option>Iro-Iro</Option>
       </Selector>
       <Selector pos='center'>
       <Option bold={true} value='' disabled selected>Color</Option>
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
       <Selector pos='right'>
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
           <Selector pos='right'>
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