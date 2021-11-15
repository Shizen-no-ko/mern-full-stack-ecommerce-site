import styled from 'styled-components';

import Navbar from '../layout/Navbar';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';

import {sliderData} from '../../data/data.js';


const Container = styled.div`
display:flex;
height: 80vh;
margin: 20px 0;
overflow: hidden;
width: 100%;
`

const Wrapper = styled.div`
${'' /* align-items: center; */}
display:flex;
${'' /* transform: translate(${props => props.scrollPos * -100}vw); */}
transition: all 1.5s ease;
width: 100vw;
`
const Slide = styled.div`
${'' /* align-items: center; */}
display: flex;
height: 100vh;
justify-content: flex-start;
overflow: hidden;
width: 100vw;
`

const DetailsContainer = styled.div`
flex: 1;
padding: 50px 80px 50px;
`

const Details = styled.div`
font-size: 2rem;
`
const Title = styled.h1`

`

const Description = styled.p`
letter-spacing: 5px;
`

const Price = styled.h4`
opacity: 80%;
`
const Button = styled.button`
all: unset;
background-color: red;
border-radius: 10px;
color: white;
font-size: 17px;
outline: none;
padding: 10px;
cursor: pointer;

&:hover{
    transform: scale(103%);
}

&:active{
    transform: scale(97%);
}

`

const ImageContainer = styled.div`
flex: 1;
height: 100%;
`

const Img = styled.img`
height: 80%;
`

const SelectorRow = styled.div`
display: flex;
justify-content: space-between;
margin-left: -10px;
${'' /* padding: 20px 40px; */}
`


const SelectorContainer = styled.div`
line-height: 30px;
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
`






const product = sliderData[0];

const IndividualProduct = () => {
    return(
        <div>
<Navbar/>
<Container>
            {/* <Wrapper scrollPos={scrollPos} key={i}> */}
            <Wrapper>
               <Slide >
                  <ImageContainer>
                  <Img src={product.img}/>
                  </ImageContainer> 
                  <DetailsContainer>
               <Details>
           <Title>{product.title}</Title>
           <Description>{product.description}</Description>
           <Price>{product.price}</Price>
           <SelectorRow>
           <SelectorContainer>
       <Label>Amount: </Label>
       <Selector name='amount' pos='right'>
           <Option>1</Option>
           <Option>2</Option>
           <Option>3</Option>
           <Option>4</Option>
           <Option>5</Option>
           <Option>6</Option>
           <Option>7</Option>
           <Option>8</Option>
           <Option>9</Option>
           <Option>10</Option>
       </Selector>
       </SelectorContainer>
       <Button>ADD TO CART <i className="fas fa-shopping-cart" style={{'paddingLeft': '10px'}}></i></Button>
       
           </SelectorRow>
      </Details>
               </DetailsContainer>
               </Slide>
               </Wrapper>
            </Container>

<SubscriptionForm/>
            <Footer/>
        </div>
            
    )
}

export default IndividualProduct