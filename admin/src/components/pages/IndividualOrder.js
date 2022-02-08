import { useState, useEffect, useReq } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { publicReq, userReq } from '../../axiosRequests';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';

import Navbar from '../layout/Navbar';
// import SubscriptionForm from '../layout/SubscriptionForm';
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
font-size: 2rem;
font-weight: 400;
margin-bottom: 0;

${mobile({
    fontSize: '1rem'
})};

${portraitTablet({
    fontSize: '1.75rem'
})};
`

const OrderInfo = styled.h2`
font-size: 1rem;
font-weight: 400;
margin-bottom: 0;

${mobile({
    fontSize: '0.75rem'
})};

${portraitTablet({
    fontSize: '0.75rem'
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


const IndividualOrder = () => {

    const path = useLocation().pathname.split('/');
    const id = path[path.length -1];
// const cart = useSelector(state=>state.cart);

const [ orderData, setOrderData ] = useState({});
const [errorMessage, setErrorMessage] = useState('');

useEffect(() => {
    let isMounted = true;
    try {
        const getOrder = async () => {
            const res = await userReq.get(`orders/find/${id}`);
            if(res){  
                console.log(res.data);
                console.log(res);
                setOrderData(res.data);
                setErrorMessage('');
            } else {
                console.log('no res');
                setErrorMessage('No Order with this ID');
            }    
        } 
        getOrder(); 
    }
    catch (err) { console.log(err) }
    return () => { isMounted = false };
}, [])

useEffect(() => {
    console.log(orderData);
}, [orderData]);


const { createdAt, items, status, subtotal, totalPrice, userAddress, userId, _id } = orderData;
// const { address } = userAddress;
// const {  line1, line2, city, state, postal_code, country } =  address;


// const { itemId, amount, color, size, _id } = item;



    return (
        <div>
            <Navbar/>
            <Container>
<Wrapper>
<Title>Order Number: {_id}</Title>
{/* <OrderInfo>Order Received On: {createdAt}</OrderInfo>
<OrderInfo>User Id: {userId}</OrderInfo>
<OrderInfo>Address:</OrderInfo>
<OrderInfo>{line1}</OrderInfo>
{line2 && <OrderInfo>{line2}</OrderInfo>}
<OrderInfo>{city}</OrderInfo>
{state && <OrderInfo>{state}</OrderInfo>}
<OrderInfo>{postal_code}</OrderInfo>
<OrderInfo>{country}</OrderInfo> */}


{/* <ButtonDiv>
<StyledLink to='/products'><Button look='light'>Continue Shopping</Button></StyledLink>
{cart.subtotal > 0 ? <Button>Checkout Now</Button> : null}
</ButtonDiv> */}
<DetailsDiv>
    {/* <CartItems>
    {cart.products.length ? 
    cart.products.map((item, index)=> <CartItem key={index} index={index} />) :
    <h1>YOUR SHOPPING CART IS EMPTY</h1>}
    {cart.previousCartItems.length ? <Title>Previous Items From Your Cart</Title> : null}
    <div>{cart.previousCartItems.map((item) => <StyledLink to={`product/${item._id}`}><PreviousImage src={item.image}/></StyledLink>)}</div>
    </CartItems> */}
    <OrderSummary/>
</DetailsDiv>
</Wrapper>
            </Container>
            <Footer/>
        </div>
    )
}

export default IndividualOrder