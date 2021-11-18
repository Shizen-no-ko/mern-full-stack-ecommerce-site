import {useState, useRef} from 'react';

import styled from 'styled-components';

const Container = styled.div`

`

const Wrapper = styled.div`
display: flex;
width: 100%;
`

const ItemImage = styled.img`
border-radius: 20px 0;
margin: 20px;
width: 250px;
`

const ItemDetails = styled.div`
flex: 2;
margin: 30px 20px 10px;
text-align: left;
`

const Rule = styled.div`

border-top: 1px solid rgba(255, 0, 0, 0.5);
margin: 0 auto;
width: 95%;
`

const PriceAndAmount = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
`
const Detail = styled.h3`
margin: 0 0 20px 0;
font-weight: 400;
`
const Color = styled.div`
border-radius: 25%;
background-color: ${props => props.color};
height: 25px;
margin: 0 0 20px 0;
width: 25px;
`
const PlusMinusContainer = styled.div`
align-items: center;
display: flex;
font-weight: 30px;
margin: 30px 40px 0;

`

const PlusMinusStyles = styled.div`
color: rgba(255, 0, 0, 0.6);
font-size: 30px;
margin: 5px;

&:active {
    color: red;
}
`

const AmountDisplay = styled.div`
border: 4px solid rgba(255, 0, 0, 0.6);
border-radius: 15px;
color: rgba(0, 0, 0, 0.8);
font-size: 25px;
height: 35px;
text-align: center;
transition: all ease-in-out 0.5s;
width: 35px;
`
const Price = styled.div`
color: rgba(0 , 0, 0, 0.7);
font-size: 3rem;
font-weight: 200;
margin: 0 30px 20px;

transition: all ease 0.5s;
`

const CartItem = (props) => {

    const [amount, setAmount] = useState(1);
    const boxRef = useRef(null);
    const priceRef = useRef(null);
    
    const boxAnimation = (minus) => {
        boxRef.current.style.borderColor = 'red';
        boxRef.current.style.transform = minus ? 'scale(120%) rotate(-25deg)' : 'scale(120%) rotate(25deg)' ;
        boxRef.current.style.color = 'white';
        boxRef.current.style.backgroundColor = 'red';
        priceChange();
        setTimeout(() => {
            boxRef.current.style.borderColor = 'rgba(255, 0, 0, 0.6)';
            boxRef.current.style.transform = 'scale(100%) rotate(0deg)';
            boxRef.current.style.color = 'rgba(0, 0, 0, 0.8)';
            boxRef.current.style.backgroundColor = 'white';
    }, 250)
    };
    
    const handleMinus = () => {
        if(amount > 0){setAmount(amount - 1)};
        boxAnimation(true)
    }
    
    const handlePlus = () => {
        setAmount(amount + 1);
        boxAnimation(false);
    }
    
    const priceChange = () => {
        priceRef.current.style.transform = 'scale(115%)';
        priceRef.current.style.color = 'red';
        setTimeout(() => {
            priceRef.current.style.transform = 'scale(100%)';
            priceRef.current.style.color = 'rgba(0 , 0, 0, 0.7)';
        }, 500);
    }

    return (
        <Container>
        <Wrapper>
        <ItemImage src='https://source.unsplash.com/rplPKfKjC_c/1920x1280'/>
        <ItemDetails>
        <Detail><strong>Product:</strong> {props.productName} </Detail>
        <Detail><strong>ID:</strong> {props.productId} </Detail>
        <Color color={props.color}/>
        <Detail><strong>Size:</strong> {props.size} </Detail>
        </ItemDetails>
        <PriceAndAmount>
        <PlusMinusContainer>
       <PlusMinusStyles onClick={handleMinus}><i className="fas fa-minus"></i></PlusMinusStyles>
           <AmountDisplay ref={boxRef}>{amount}</AmountDisplay>
           <PlusMinusStyles onClick={handlePlus}><i className="fas fa-plus"></i></PlusMinusStyles>
       </PlusMinusContainer>
       <Price ref={priceRef}>${props.price * amount}</Price>
        </PriceAndAmount>
        
        </Wrapper>
        <Rule/>   
        </Container>
    )
}

export default CartItem
