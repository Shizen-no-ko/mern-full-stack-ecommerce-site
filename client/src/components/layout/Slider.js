import { useState } from 'react';
import styled from 'styled-components';
import { sliderData } from '../../data/data.js';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';


const Container = styled.div`
display:flex;
height: 80vh;
margin: 20px 0;
overflow: hidden;
width: 100%;

${mobile({
    display: 'none'
})};

        ${portraitTablet({
    display: 'none'
})};

        
        ${landscapeTablet({
    height: '300px',
})};    
`

const Wrapper = styled.div`
display:flex;
transform: translate(${props => props.scrollPos * -100}vw);
transition: all 1.5s ease;
width: 100vw;

${landscapeTablet({
    height: '300px',
})};
`

const Slide = styled.div`
display: flex;
height: 100vh;
justify-content: flex-start;
overflow: hidden;
width: 100vw;

${landscapeTablet({
    height: '300px',
})};
`

const DetailsContainer = styled.div`
flex: 1;
padding: 50px 80px 50px;

${landscapeTablet({
    height: '300px',
    padding: '0px 60px 30px'
})};
`

const Details = styled.div`
font-size: 2rem;

${landscapeTablet({
    fontSize: '1rem'
})};   
`
const Title = styled.h1`
`

const Description = styled.p`
letter-spacing: 5px;

${landscapeTablet({
    letterSpacing: '3px'
})};
`

const Price = styled.h4`
opacity: 80%;
`

const Button = styled.button`
all: unset;
background-color: red;
border-radius: 20px 0;
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

${landscapeTablet({
    fontSize: '15px'
})};
`

const ImageContainer = styled.div`
flex: 2;
height: 100%;
max-width: 100%;

${landscapeTablet({
    height: '300px',
})};
`

const Img = styled.img`
height: 80%;
max-width: 100%;
object-fit: cover;

${landscapeTablet({
    height: 'auto',
    width: '50vw'
})};
`

const Scroller = styled.div`
background-color: red;
border-radius: 25%;
color: white;
font-size: 40px;
left: ${props => props.pos === "left" ? "20px" : "none"};
opacity: 50%;
right: ${props => props.pos === "right" ? "20px" : "none"};
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

${landscapeTablet({
    fontSize: '30px',
    height: '40px',
    top: '240px',
    width: '40px'
})};
`

// Animated slider for landing page with hard-wired images/text
// Go to product button not yet functioning
const Slider = () => {
    // State for handling which slide currently on display
    const [scrollPos, setScrollPos] = useState(0);

    // Handle direction of slide according to where clicked
    const clickHandler = (direction) => {
        if (direction === "left") {
            setScrollPos(scrollPos > 0 ? scrollPos - 1 : 2)
        }
        else {
            setScrollPos(scrollPos < 2 ? scrollPos + 1 : 0)
        };
    }

    return (
        <Container>
            <Scroller onClick={() => clickHandler('left')} pos="left" ><i className="fas fa-chevron-left"></i></Scroller>
            <Scroller onClick={() => clickHandler('right')} pos="right"><i className="fas fa-chevron-right"></i></Scroller>
            {sliderData.map((product, i) => {
                return (
                    <Wrapper scrollPos={scrollPos} key={i}>
                        <Slide >
                            <ImageContainer>
                                <Img src={product.img} />
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