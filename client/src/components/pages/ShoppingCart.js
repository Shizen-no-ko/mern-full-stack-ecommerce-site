import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { mobile, portraitTablet, landscapeTablet } from '../../responsive';

import Navbar from '../layout/Navbar';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';
import CartItem from '../layout/CartItem';
import OrderSummary from '../layout/OrderSummary';




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

${mobile({
    fontSize: '2rem'
})};

${portraitTablet({
    fontSize: '2.75rem'
})};
`

const ButtonDiv = styled.div`
display: flex;
justify-content: space-between;
width: 100%;


`

const DetailsDiv = styled.div`
display: flex;
margin: 50px 0;

${mobile({
    flexDirection: 'column'
})};

${portraitTablet({
    flexDirection: 'column'
})};


`

const CartItems = styled.div`
flex: 3;
`


// const SummaryDiv = styled.div`
// flex: 1;
// `

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

${mobile({
    fontSize: '15px',
    padding:'5px 7px'
    
})};
`

const StyledLink = styled(Link)`
color: black;
text-decoration: none;

&:active{
    color: red;
}

`
const PreviousImage = styled.img`
border-radius: 20px 0;
margin: 20px;
width: 200px;

${mobile({
    
    height: 'auto',
    margin: '20px 0 0 0',
    maxWidth: '125px'
})};

${portraitTablet({
    
    height: 'auto',
    margin: '20px 0 0 40px',
    maxWidth: '175px'
})};

${landscapeTablet({
    height: '150px',
    margin: '20px 0 0 40px',
    maxWidth: '175px',
    width: 'auto'
})};

`


const ShoppingCart = () => {

const cart = useSelector(state=>state.cart);

    return (
        <div>
            <Navbar/>
            <Container>
<Wrapper>
<Title>Your Shopping Cart</Title>
<ButtonDiv>
<StyledLink to='/products'><Button look='light'>Continue Shopping</Button></StyledLink>
<Button>Checkout Now</Button>
</ButtonDiv>
<DetailsDiv>
    <CartItems>
    {cart.products.length ? 
    cart.products.map((item, index)=> <CartItem key={index} index={index} />) :
    <h1>YOUR SHOPPING CART IS EMPTY</h1>}
    {/* {cart.products.map((item, index)=> <CartItem key={index} index={index} image={item.image} productName={item.title} productId={item._id} size={item.size} color={item.color} amount={item.amount} price={item.price} />)} */}
        {/* <CartItem productName='Product Name' productId='Product ID' size='M' color='green' price='250'/>
        <CartItem productName='Product Name' productId='Product ID' size='M' color='green' price='250'/>
        <CartItem productName='Product Name' productId='Product ID' size='M' color='green' price='250'/> */}
    {cart.previousCartItems.length ? <Title>Previous Items From Your Cart</Title> : null}
    <div>{cart.previousCartItems.map((item) => <StyledLink to={`product/${item._id}`}><PreviousImage src={item.image}/></StyledLink>)}</div>
    </CartItems>
    <OrderSummary/>
</DetailsDiv>
</Wrapper>
            </Container>
            <SubscriptionForm/>
            <Footer/>
        </div>
    )
}

export default ShoppingCart

