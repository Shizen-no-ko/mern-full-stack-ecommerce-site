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
const InfoDiv = styled.div`
border: 1px solid lightgray;
margin: 20px auto;
padding: 20px;
text-align: left;
width: 50%;
`

const AddressDiv = styled.div`
margin-left: 75px;
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


const IndividualOrder = () => {

    const path = useLocation().pathname.split('/');
    const id = path[path.length - 1];
    // const cart = useSelector(state=>state.cart);

    const [orderData, setOrderData] = useState({
        items: [],
        userAddress: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            postal_code: '',
            country: '',
            name: ''
        }
    });


    const [ userData, setUserData ] = useState({
        username: '',
        email: ''
    });

    const [ orderItems, setOrderItems] = useState([]);
    

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let isMounted = true;
        try {
            const getOrder = async () => {
                const res = await userReq.get(`orders/find/${id}`);
                if (res) {
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
        catch (err) { console.log(err) };
        return () => { isMounted = false };
    }, [])

    useEffect(() => {
        
        if(orderData.userId){
            try {
                const getUser = async () => {
                    const res = await userReq.get(`users/find/${orderData.userId}`);
                    if (res) {
                        console.log(res.data);
                        console.log(res);
                        setUserData(res.data);
                        setErrorMessage('');
                    } else {
                        console.log('no res');
                        setErrorMessage('No User with this ID');
                    }
                }
                getUser();
            }
            catch (err) { console.log(err) }; 
        } 
         

    }, [orderData]);


    useEffect(() => {
        var tempData = orderData;
        console.log('INITIAL TEMP DATA IS:');
        console.log(tempData);
        if(orderData.items !== []){
            orderData.items.forEach((item, index) => {
                try {
                    const getProduct = async () => {
                        console.log(item.itemId);
                        const res = await userReq.get(`products/find/${item.itemId}`);
                        if (res) {
                            console.log(res.data);
                            console.log(res);
                            tempData.items[index]['image'] = res.data.image;
                            tempData.items[index]['title'] = res.data.title;
                            tempData.items[index]['price'] = res.data.price;
                            console.log('TEMPDATA IS: ');
                            console.log(tempData);
                            setOrderData(tempData);
                            setErrorMessage('');
                        } else {
                            console.log('no res');
                            setErrorMessage('No Product with this ID');
                        }
                    }
                    getProduct();
                }
                catch (err) { console.log(err) };
            })
        }
    }, [orderData]);

    
    // const { image, title, _id, size, color, amount, price }

    const { createdAt, items, status, subTotal, totalPrice, userAddress, userId, _id } = orderData;
    const { line1, line2, city, state, postal_code, country, name } = userAddress;
    const { username, email } = userData;
    const summaryDetails = {
        status: status,
        subtotal: subTotal,
        totalPrice: totalPrice
    };

    // console.log(items);

    return (
        <div>
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>Order Number: {_id}</Title>
                    <InfoDiv>
                        <OrderInfo><strong>Order Received On: </strong>{createdAt}</OrderInfo>
                        <OrderInfo><strong>User Id: </strong>{userId}</OrderInfo>
                        <OrderInfo><strong>Account Holder Name: </strong>{username}</OrderInfo>
                        <OrderInfo><strong>email: </strong>{email}</OrderInfo>
                        <OrderInfo><strong>Address: </strong>{name}</OrderInfo>
                        <AddressDiv>
                            <OrderInfo>{line1}</OrderInfo>
                            {line2 && <OrderInfo>{line2}</OrderInfo>}
                            <OrderInfo>{city}</OrderInfo>
                            {state && <OrderInfo>{state}</OrderInfo>}
                            <OrderInfo>{postal_code}</OrderInfo>
                            <OrderInfo>{country}</OrderInfo>
                        </AddressDiv>
                        <OrderInfo><strong>Items: </strong></OrderInfo>
                        <AddressDiv>
                            {items.map((item, index) => {
                                const { itemId, amount, color, size, _id, image } = item;
                                return (
                                    <div key={index}>
                                    <OrderInfo><strong><u>#{index + 1}</u></strong></OrderInfo>
                                <OrderInfo><strong>Id Number: </strong>{itemId}</OrderInfo>
                                <OrderInfo><strong>Color: </strong>{color}</OrderInfo>
                                <OrderInfo><strong>Size: </strong>{size}</OrderInfo>
                                <OrderInfo><strong>Amount Ordered: </strong>{amount}</OrderInfo>
                                <OrderInfo><strong>Image: </strong>{image}</OrderInfo>
                                </div>
                                )
                                
                                
                            })}
                        </AddressDiv>


                    </InfoDiv>



                    {/* <ButtonDiv>
<StyledLink to='/products'><Button look='light'>Continue Shopping</Button></StyledLink>
{cart.subtotal > 0 ? <Button>Checkout Now</Button> : null}
</ButtonDiv> */}
                    <DetailsDiv>
                        <CartItems>
    {items.map((item, index)=>  <CartItem key={index} item={item} />)}
   </CartItems>


    {/* <CartItems>
    {cart.products.length ? 
    cart.products.map((item, index)=> <CartItem key={index} index={index} />) :
    <h1>YOUR SHOPPING CART IS EMPTY</h1>}
    {cart.previousCartItems.length ? <Title>Previous Items From Your Cart</Title> : null}
    <div>{cart.previousCartItems.map((item) => <StyledLink to={`product/${item._id}`}><PreviousImage src={item.image}/></StyledLink>)}</div>
    </CartItems> */}


                        <OrderSummary details={summaryDetails} />
                    </DetailsDiv>
                </Wrapper>
            </Container>
            <Footer />
        </div>
    )
}

export default IndividualOrder