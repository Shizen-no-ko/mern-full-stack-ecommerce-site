import styled from 'styled-components';
import Navbar from '../layout/Navbar';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';

const Container = styled.div`
height: 100vh;
max-width: 100%;
overflow: hidden;
width: 100vw;
`

const Wrapper = styled.div`
text-align: center;
margin: auto;
width: 100%;
`

const Title = styled.h1`
color: rgba(255, 0, 0, 0.9);
font-size: 3rem;
font-weight: 400;
`

const ButtonDiv = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
`

const DetailsDiv = styled.div`
display: flex;
margin: 20px 0;
`

const CartItems = styled.div`
flex: 3;
`

const CartItem = styled.div`
display: flex;
`
const ItemImage = styled.img`
margin: 20px;
width: 250px;
`

const ItemDetails = styled.div`
margin: 20px;
text-align: left;
`

const Rule = styled.div`

border-top: 1px solid red;
width: 100%;
`

const PriceAndAmount = styled.div`

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


const Summary = styled.div`
flex: 1;
`

const Button = styled.button`
all: unset;
background-color: ${props => props.look === 'light' ? 'white' : 'red'};
border: 4px solid red;
border-radius: 10px;
box-sizing: border-box;
color: ${props => props.look === 'light' ? 'red' : 'white'};
cursor: pointer;
font-size: 20px;
font-weight: bold;
margin: 30px auto 10px;
outline: none;
padding: 10px;
text-align: center;




&:hover{
    background-color: ${props => props.look === 'light' ? 'red' : 'white'};
    border: 4px solid red;
    color: ${props => props.look === 'light' ? 'white' : 'red'};
    transform: scale(103%);
}

&:active{
    background-color: green;
    border: 3px solid green; 
    transform: scale(97%);
}
`

const ShoppingCart = () => {
    return (
        <div>
            <Navbar/>
            <Container>
<Wrapper>
<Title>Your Shopping Cart</Title>
<ButtonDiv>
<Button look='light'>Continue Shopping</Button>
<Button>Checkout Now</Button>
</ButtonDiv>
<DetailsDiv>
    <CartItems>
        <CartItem>
        <ItemImage src='https://source.unsplash.com/rplPKfKjC_c/1920x1280'/>
        <ItemDetails>
        <Detail><strong>Product:</strong> Product Name </Detail>
        <Detail><strong>ID:</strong> Product ID </Detail>
        <Color color='green'/>
        <Detail><strong>Size:</strong> Product Size </Detail>
        <Rule/>
        </ItemDetails>
       
        </CartItem>
    </CartItems>
    
    <Summary>Summary</Summary>
</DetailsDiv>
</Wrapper>
            </Container>
            <SubscriptionForm/>
            <Footer/>
        </div>
    )
}

export default ShoppingCart

