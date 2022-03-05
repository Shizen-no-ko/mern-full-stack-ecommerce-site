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
justify-content: space-evenly;
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


const Button = styled.button`
all: unset;
background-color: ${props => props.look === 'light' ? 'white' : 'red'};
border: 4px solid red;
border-radius: 20px 0;
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
    padding: '5px 7px'

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

// Hides previous items for mobile and portrait tablet to prevent them appearing before the order summary
const PreviousDiv1 = styled.div`
${mobile({
    display: 'none'
})};

${portraitTablet({
    display: 'none'
})};
`

// Shows previous items for mobile and portrait tablet to make them appear after the order summary
const PreviousDiv2 = styled.div`
display: none;

${mobile({
    display: 'unset'
})};

${portraitTablet({
    display: 'unset'
})};
`

const ShoppingCart = () => {

    const cart = useSelector(state => state.cart);

    return (
        <div>
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>Your Shopping Cart</Title>
                    <ButtonDiv>
                        <StyledLink to='/products'><Button look='light'>Continue Shopping</Button></StyledLink>
                    </ButtonDiv>
                    <DetailsDiv>
                        <CartItems>
                            {/* Map through and display products in CartItem component */}
                            {/* If cart.products empty, display message */}
                            {cart.products.length ?
                                cart.products.map((item, index) => <CartItem key={index} index={index} />) :
                                <h1>YOUR SHOPPING CART IS EMPTY</h1>}
                            <PreviousDiv1>
                                {cart.previousCartItems.length ? <Title>Previous Items From Your Cart</Title> : null}
                                <div>{cart.previousCartItems.map((item, index) => <StyledLink key={index} to={`product/${item._id}`}><PreviousImage src={item.image} /></StyledLink>)}</div>
                            </PreviousDiv1>
                        </CartItems>
                        {/* OrderSummary containing totals, delivery charge and checkout button */}
                        <OrderSummary />
                        <PreviousDiv2>
                            {cart.previousCartItems.length ? <Title>Previous Items From Your Cart</Title> : null}
                            <div>{cart.previousCartItems.map((item, index) => <StyledLink key={index} to={`product/${item._id}`}><PreviousImage src={item.image} /></StyledLink>)}</div>
                        </PreviousDiv2>
                    </DetailsDiv>
                </Wrapper>
            </Container>
            <SubscriptionForm />
            <Footer />
        </div>
    )
}

export default ShoppingCart

