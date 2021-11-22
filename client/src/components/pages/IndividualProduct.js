import { useState, useRef } from 'react';
import styled from 'styled-components';
import { mobile } from '../../responsive';

import Navbar from '../layout/Navbar';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';

import { sliderData } from '../../data/data.js';


const Container = styled.div`
display:flex;
height: 80vh;
margin: 20px 0;
max-width: 100%;
overflow: hidden;
width: 100vw;

${mobile({
    height: 'auto'
})};
`

const Wrapper = styled.div`
${'' /* align-items: center; */}
display:flex;
${'' /* transform: translate(${props => props.scrollPos * -100}vw); */}
${'' /* transition: all 1.5s ease; */}
width: 100vw;
`
const Slide = styled.div`
${'' /* align-items: center; */}
display: flex;
height: 100vh;
justify-content: flex-start;
overflow: hidden;
width: 100vw;

${mobile({
    alignItems: 'center',
    flexDirection: 'column',
})};
`

const DetailsContainer = styled.div`
flex: 1;
padding: 20px 80px 20px;

${mobile({
    padding: '15px 40px 15px',
})};
`

const Details = styled.div`
display: flex;
flex-direction: column;
font-size: 1.5rem;
height: 80%;
justify-content: space-around;

${mobile({
    textAlign: 'center'
})};
`
const Title = styled.h1`
font-weight: 400;

${mobile({
    fontSize: '2.5rem',
    marginBottom: '0px'
})};
`

const Description = styled.p`
font-weight: 200;

${mobile({
    fontSize: '1rem'
})};
`

const Price = styled.h4`
font-weight: 200;
font-size: 2rem;

${mobile({
    fontSize: '1.5rem',
    margin: '0px'
})};
`
const Button = styled.button`
all: unset;
background-color: white;
border: 4px solid red;
border-radius: 10px;
color: red;
cursor: pointer;
font-size: 17px;
outline: none;
padding: 10px;


&:hover{
    background-color: red;
    color: white;
    transform: scale(103%);
}

&:active{
    background-color: green;
    border: 3px solid green; 
    transform: scale(97%);
}
${mobile({
    fontSize: '18px',
    padding: '5px 10px'
})};


`

const ImageContainer = styled.div`
flex: 1;
height: 100%;

${mobile({
    maxHeight: '280px',
    maxWidth: '100vw'
})};
`

const Img = styled.img`
height: 80%;
`

const SelectorRow = styled.div`
display: flex;
justify-content: space-between;
margin-left: -20px;
padding: 30px 0;

${mobile({
   alignItems: 'center',
   margin: '0px auto'
})};

`


const SelectorContainer = styled.div`
line-height: 30px;

${mobile({
    display: 'flex',
flexDirection: 'column',
alignItems: 'center',
})};

`



const Label = styled.span`
${'' /* font-family: font-family: 'Lexend', sans-serif; */}
font-size: 20px;
font-weight: 200;
padding: 10px 0 10px 20px;

${mobile({
    paddingLeft: '0'
})};
`

const Selector = styled.select`
border: 1px solid lightgray;
border-radius: ${props => props.pos === 'left' ? '20px 0 0 20px' : props.pos === 'right' ? '0 20px 20px 0' : '0'} ;
font-size: 20px;
font-weight: 500;
${'' /* margin: 0 0px; */}
outline: none;
padding: 5px 15px;

&:focus {
    outline: none;
}
`

const Option = styled.option`
`

const ColorContainer = styled.div`
display: inline-flex;
justify-content: space-between;
position: relative; 
top: 3px;


`

const ColorOption = styled.div`
border: ${props => props.border ? '1px solid' : 'none'};
border-color: ${props => props.border ? props.border : 'none'};
border-radius: 30%;
background-color: ${props => props.color};
${'' /* to accomodate extra width of white color with border */}
height: ${props => props.border ? '18px' : '20px'};
margin: 5px;
width: ${props => props.border ? '18px' : '20px'};

&:hover{
    transform: scale(150%) rotate(45deg);
    transition: ease-in-out 0.05s;
}
`

const PlusMinusContainer = styled.div`
display: flex;
font-size: 28px;
margin-left: 20px;

${mobile({
    alignItems: 'center',
    fontSize: '18px',
    margin: '0 20px 0 -20px'
})};

`

const PlusMinusStyles = styled.div`
color: rgba(255, 0, 0, 0.6);
margin: 5px;

&:active {
    color: red;
}
`

const AmountDisplay = styled.div`
border: 4px solid rgba(255, 0, 0, 0.6);
border-radius: 15px;
color: rgba(0, 0, 0, 0.8);
height: 35px;
text-align: center;
transition: all ease-in-out 0.5s;
width: 35px;

${mobile({
    borderRadius: '10px',
    height: '25px',
    width: '25px'
})};
`

const product = sliderData[0];



const IndividualProduct = () => {

    const [amount, setAmount] = useState(1);
    const boxRef = useRef(null);

    const boxAnimation = (minus) => {
        boxRef.current.style.borderColor = 'red';
        boxRef.current.style.transform = minus ? 'scale(120%) rotate(-25deg)' : 'scale(120%) rotate(25deg)';
        boxRef.current.style.color = 'white';
        boxRef.current.style.backgroundColor = 'red';
        setTimeout(() => {
            boxRef.current.style.borderColor = 'rgba(255, 0, 0, 0.6)';
            boxRef.current.style.transform = 'scale(100%) rotate(0deg)';
            boxRef.current.style.color = 'rgba(0, 0, 0, 0.8)';
            boxRef.current.style.backgroundColor = 'white';
        }, 250)
    };

    const handleMinus = () => {
        if (amount > 0) { setAmount(amount - 1) };
        boxAnimation(true)
    }

    const handlePlus = () => {
        setAmount(amount + 1);
        boxAnimation(false);
    }

    return (
        <div>
            <Navbar />
            <Container>
                {/* <Wrapper scrollPos={scrollPos} key={i}> */}
                <Wrapper>
                    <Slide >
                        <ImageContainer>
                            <Img src={product.img} />
                        </ImageContainer>
                        <DetailsContainer>
                            <Details>
                                <Title>{product.title}</Title>
                                <Description>{product.description}</Description>
                                <Price>{product.price}</Price>
                                <SelectorRow>
                                    <SelectorContainer>
                                        <Label>Size: </Label>
                                        <Selector name='size' pos='right' defaultValue='M' placeholder='M'>
                                            <Option>XS</Option>
                                            <Option>S</Option>
                                            <Option>M</Option>
                                            <Option>L</Option>
                                            <Option>XL</Option>
                                            <Option>XXL</Option>
                                        </Selector>
                                        <Label>Color: </Label>
                                        <ColorContainer>
                                            <ColorOption color="red" />
                                            <ColorOption color="black" />
                                            <ColorOption color="yellow" />
                                            <ColorOption color="pink" />
                                            <ColorOption color="green" />
                                            <ColorOption color="orange" />
                                            <ColorOption color="purple" />
                                            <ColorOption color="blue" />
                                            <ColorOption color="white" border='black' />
                                        </ColorContainer>
                                    </SelectorContainer>
                                </SelectorRow>
                                <SelectorRow>
                                    <PlusMinusContainer>
                                        <PlusMinusStyles onClick={handleMinus}><i className="fas fa-minus"></i></PlusMinusStyles>
                                        <AmountDisplay ref={boxRef}>{amount}</AmountDisplay>
                                        <PlusMinusStyles onClick={handlePlus}><i className="fas fa-plus"></i></PlusMinusStyles>
                                    </PlusMinusContainer>
                                    <Button>ADD TO CART <i className="fas fa-shopping-cart" style={{ 'paddingLeft': '10px' }}></i></Button>
                                </SelectorRow>
                            </Details>
                        </DetailsContainer>
                    </Slide>
                </Wrapper>
            </Container>

            <SubscriptionForm />
            <Footer />
        </div>

    )
}

export default IndividualProduct