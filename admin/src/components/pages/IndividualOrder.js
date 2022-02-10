import { useState, useEffect, useReq } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { userReq } from '../../axiosRequests';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';

import Navbar from '../layout/Navbar';
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
display: flex;
margin: 20px auto;
padding: 20px;
text-align: left;
width: 50%;
`

const InfoSubDiv = styled.div`
margin: 20px;
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


    const [userData, setUserData] = useState({
        username: '',
        email: ''
    });


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

        if (orderData.userId) {

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


    const { createdAt, items, status, subTotal, totalPrice, userAddress, userId, _id } = orderData;
    const { line1, line2, city, state, postal_code, country, name } = userAddress;
    const { username, email } = userData;
    const summaryDetails = {
        subtotal: subTotal,
        totalPrice: totalPrice
    };

  

    return (
        <div>
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>Order Number: {_id}</Title>
                    <Title>Order Status: {status}</Title>
                    <InfoDiv>
                        <InfoSubDiv>
                            <OrderInfo><strong>Order Received On: </strong>{createdAt}</OrderInfo>
                            <OrderInfo><strong>User Id: </strong>{userId}</OrderInfo>
                            <OrderInfo><strong>Account Holder Name: </strong>{username}</OrderInfo>
                            <OrderInfo><strong>email: </strong>{email}</OrderInfo>
                        </InfoSubDiv>
                        <InfoSubDiv>
                            <OrderInfo><strong>Address: </strong>{name}</OrderInfo>
                            <AddressDiv>
                                <OrderInfo>{line1}</OrderInfo>
                                {line2 && <OrderInfo>{line2}</OrderInfo>}
                                <OrderInfo>{city}</OrderInfo>
                                {state && <OrderInfo>{state}</OrderInfo>}
                                <OrderInfo>{postal_code}</OrderInfo>
                                <OrderInfo>{country}</OrderInfo>
                            </AddressDiv>
                        </InfoSubDiv>

                    </InfoDiv>

                    <DetailsDiv>
                        <CartItems>
                            {items.map((item, index) => {
                                const itemData = {
                                    size: item.size,
                                    color: item.color,
                                    amount: item.amount,
                                    itemId: item.itemId
                                };
                                return <CartItem key={index} itemData={itemData}/>
                                })}
                        </CartItems>
                        <OrderSummary details={summaryDetails} orderId={id} />
                    </DetailsDiv>
                </Wrapper>
            </Container>
            <Footer />
        </div>
    )
}

export default IndividualOrder