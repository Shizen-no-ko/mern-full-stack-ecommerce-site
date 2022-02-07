import React from 'react';
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
const OrderDiv = styled.div`
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



const Title = styled.h4`
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

const OrderIdDiv = styled.div`
display: flex;
flex-direction: row;
`

const DetailsDiv = styled.div`
font-size: 0px;
height: 0px;
transition: all 0.3s ease-in-out;
visibility: hidden;
`

const Detail = styled.p`
margin: 5px 10px;
`


const OrderStats = () => {
    const detailsRef = useRef([]);
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

    useEffect(() => {
        // Set Refs array
        detailsRef.current = detailsRef.current.slice(0, currentOrders.length);
        // Intialize styles
        detailsRef.current.forEach((element) => {
            element.style.fontSize = '0px';
            element.style.visibility = 'hidden';
            element.style.height = '0px';

        })
    }, [currentOrders]);

    const toggle = (style) => {
        style.fontSize = style.fontSize === '0px' ? '1rem' : '0px';
        style.visibility = style.visibility === 'hidden' ? 'visible' : 'hidden';
        style.height = style.height === '0px' ? '200px' : '0px';
    }


    const handleClick = (index) => {
        const style = detailsRef.current[index].style;
        toggle(style);
    }


    return (
        <div>
            <Container>
                <TitleDiv>
                    <Title>Current Active Orders - Click To Expand</Title>
                </TitleDiv>
                {currentOrders.map((order, index) => {
                    const { line1, line2, postal_code, city, state, country } = order.userAddress.address;
                    return <OrderDiv onClick={() => handleClick(index)} key={index}>
                        <OrderIdDiv>
                            <IdLabel>Order Id: </IdLabel>
                            <OrderId>{order._id}</OrderId>
                        </OrderIdDiv>
                        <DetailsDiv ref={el => detailsRef.current[index] = el}>
                        <Detail><strong>Customer Id: </strong>{order.userId}</Detail>
                            <Detail><strong>Address:  </strong></Detail>
                            <Detail>{order.userAddress.name}, {line1}, {line2 && `${line2}, `}{postal_code}, {city}, {state && `${state}, `}{country}</Detail>
                            <Detail><strong>Order Date: </strong>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Detail>
                        </DetailsDiv>
                    </OrderDiv>
                })}
            </Container>

        </div>
    )
}

export default OrderStats