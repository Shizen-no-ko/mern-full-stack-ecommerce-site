import styled from 'styled-components';
import Navbar from '../layout/Navbar';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';
import CartItem from '../layout/CartItem';

const Container = styled.div`
${'' /* height: 100vh; */}
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
margin-bottom: 0;
`

const ButtonDiv = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
`

const DetailsDiv = styled.div`
display: flex;
margin: 50px 0;
`

const CartItems = styled.div`
flex: 3;
`


const SummaryDiv = styled.div`
flex: 1;
`

const Button = styled.button`
all: unset;
background-color: ${props => props.look === 'light' ? 'white' : 'red'};
border: 4px solid red;
border-radius: 20px 0;
${'' /* box-sizing: border-box; */}
color: ${props => props.look === 'light' ? 'red' : 'white'};
cursor: pointer;
font-size: 20px;
font-weight: 400;
margin: 30px 20px 10px;
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
    border: 4px solid green;
    color: white; 
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
        <CartItem productName='Product Name' productId='Product ID' size='M' color='green' price='250'/>
        <CartItem productName='Product Name' productId='Product ID' size='M' color='green' price='250'/>
        <CartItem productName='Product Name' productId='Product ID' size='M' color='green' price='250'/>
    </CartItems>
    
    <SummaryDiv>Summary</SummaryDiv>
</DetailsDiv>
</Wrapper>
            </Container>
            <SubscriptionForm/>
            <Footer/>
        </div>
    )
}

export default ShoppingCart

