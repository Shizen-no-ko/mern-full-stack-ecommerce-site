
import {useState} from 'react';
import styled from 'styled-components';
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
transform: translate(${props => props.scrollPos * -100}vw);
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

const Scroller = styled.div`
background-color: red;
border-radius: 25%;
color: white;
font-size: 40px;
${'' /* left: 20px; */}
left: ${props => props.pos === "left" ? "20px": "none"};
opacity: 50%;
right: ${props => props.pos === "right" ? "20px": "none"};
position: absolute;
text-align: center;
top: 50%;
width: 50px;
z-index: 2;

&:hover{
    opacity: 60%;
}

&:active{
    transform: scale(103%);
    transition: ease-in-out 0.075s;
}
`

const Slider = (props) => {
const [scrollPos, setScrollPos] = useState(0);

const clickHandler = (direction) => {
    if(direction === "left"){
        setScrollPos(scrollPos > 0 ? scrollPos - 1 : 2)
    }
    else{
        setScrollPos(scrollPos < 2 ? scrollPos + 1 : 0)
    };
}

    return(
       <Container>
       <Scroller onClick={() =>  clickHandler('left')} pos="left" ><i className="fas fa-chevron-left"></i></Scroller>
       <Scroller onClick={() =>  clickHandler('right')} pos="right"><i className="fas fa-chevron-right"></i></Scroller>
       {sliderData.map((product, i) => {
           return(
               <Wrapper scrollPos={scrollPos} key={i}>
               <Slide >
                  <ImageContainer>
                  <Img src={product.img}/>
                  </ImageContainer> 
                  <DetailsContainer>
               <Details>
           <Title>{product.title}</Title>
           <Description>{product.description}</Description>
           <Price>{product.price}</Price>
           <Button>GO TO PRODUCT</Button>
       </Details>
               </DetailsContainer>
               </Slide>
               </Wrapper>
       )
       })}
       </Container>
    )
}

export default Slider