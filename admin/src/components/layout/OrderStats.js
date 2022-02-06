import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { userReq } from '../../axiosRequests';

import styled from 'styled-components';

const Container = styled.div`
align-items: center;
border: 1px solid lightgray;
display:flex;
flex-direction: column;
height: auto;
margin: 20px 100px;
max-width: 50vw;
padding: 10px 20px 10px;
text-align: left;
width: auto;
`
const UserDiv = styled.div`
border: 1px solid lightgray;
margin: 2px;
padding: 10px;
width: 100%;

&:hover {
    background-color: pink;
    border: 1px solid red;
    box-shadow: 3px 3px 3px lightgray;
    transform: scale(101%);
}
`

const TitleDiv = styled.div`
margin-left: -20px;
padding-bottom: 10px;
text-align: left;
width: 100%;
`



const Title = styled.h3`
margin: 5px 10px;
padding: 0px;
`

const IdLabel = styled.div`
font-size: 1rem;
font-weight: normal;
margin: 5px 10px;
padding: 0px;
`

const OrderId = styled.div`
color: red;
font-size: 1rem;
font-weight: normal;
margin: 5px 10px;
padding: 0px;
`

const Detail = styled.p`
margin: 5px 10px;
`


const OrderStats = () => {
    const orderRef = useRef(null);
    const [currentOrders, setCurrentOrders] = useState([]);

    useEffect(() => {

        const getOrders = async () => {
            try {
                const res = await userReq.get('/orders/active');
                console.log(res.data);
                setCurrentOrders(res.data);
            }
            catch (err) { console.log(err) };

        };
        getOrders();
    }, []);


    // _id
    // :
    // 61fce5292d0eef12f884767c
    // userId
    // :
    // "61810bb75cb7333023bad734"
    // items
    // :
    // Array
    // 0
    // :
    // Object
    // itemId
    // :
    // "61a72dea18550bd39465242b"
    // amount
    // :
    // 1
    // color
    // :
    // "brown"
    // size
    // :
    // null
    // _id
    // :
    // 61fce5292d0eef12f884767d
    // 1
    // :
    // Object
    // 2
    // :
    // Object
    // subTotal
    // :
    // 293
    // deliveryCharge
    // :
    // 4.99
    // totalPrice
    // :
    // 293
    // userAddress
    // :
    // Object
    // address
    // :
    // Object
    // city
    // :
    // "Gläk"
    // country
    // :
    // "Finland"
    // line1
    // :
    // "Chamb Road 79798"
    // line2
    // :
    // null
    // postal_code
    // :
    // "7581"
    // state
    // :
    // null
    // email
    // :
    // null
    // name
    // :
    // "Steve Finally"
    // phone
    // :
    // null
    // status
    // :
    // "Order Received"
    // createdAt
    // :
    // 2022-02-04T08:34:49.342+00:00
    // updatedAt
    // :
    // 2022-02-04T08:34:49.342+00:00
    // __v
    // :
    // 0

    return (
        <div>
            <Container>
            <TitleDiv>
            <Title>Current Active Orders</Title>
            </TitleDiv>
                { currentOrders.map((order) => {
                    const { line1, line2, postal_code, city, state, country} = order.userAddress.address;
                    return <UserDiv key={order._id}>
                    <div>
                    <IdLabel>Order Id: </IdLabel>
                    <OrderId>{order._id}</OrderId>
                    </div>
                    
                    <Detail><strong>Customer Id: </strong>{order.userId}</Detail>
                    <Detail><strong>Address:  </strong></Detail>
                    <Detail>{order.userAddress.name}, {line1}, {line2 && `${line2}, `}{postal_code}, {city}, {state && `${state}, `}{country}</Detail>
                    <Detail><strong>Order Date: </strong>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Detail>
                    </UserDiv>
                }) }
            </Container>

        </div>
    )
}

export default OrderStats