import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import styled from 'styled-components';

import { userReq } from '../../axiosRequests';

const KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const Container = styled.div`
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
margin: 0 60px 0 20px;
text-align: left;
width: 100%;
`

const Title = styled.h1`
color: rgba(0, 0, 0, 0.9);
font-size: 2.5rem;
font-weight: 200;
margin: 20px 0 10px;
`

const Info = styled.div`
display: flex;
font-size: ${props => props.type === 'total' ? '25px' : '20px'};
font-weight: ${props => props.type === 'total' ? '400' : '200'};;
justify-content: space-between;
margin: 5px 40px 5px 0;
`

const Label = styled.div`
`

const Amount = styled.div`
`

const Button = styled.button`
align-self: center;
all: unset;
background-color: red;
border: 4px solid red;
border-radius: 20px 0;
color: white;
cursor: pointer;
font-size: 20px;
font-weight: 400;
margin: 10px 40px 10px 0;
outline: none;
padding: 10px;
text-align: center;

&:hover{
    background-color: white;
    border: 4px solid red;
    color: red;
    transform: scale(103%);
}

&:active{
    background-color: green;
    border: 4px solid green;
    color: white; 
    transform: scale(97%);
}
`

const CheckoutButtonDiv = styled.div`
text-align: center;
`

// Order Summary component with stripe payment integration
const OrderSummary = () => {

    const user = useSelector(state => state.user.currentUser);
    const userDetails = user.user;

    const [stripeToken, setStripeToken] = useState();
    const history = useHistory();

    const onToken = (token) => {
        setStripeToken(token);
    };

    const cart = useSelector(state => state.cart);

    const { subtotal, totalPrice, freeDeliveryLevel, deliveryCharge } = cart;


    useEffect(() => {
        const makePayment = async () => {
            try {
                const res = await userReq.post(
                    '/checkout/payment',
                    {
                        tokenId: stripeToken.id,
                        amount: totalPrice * 100
                    }
                );
                history.replace('/success', { data: res.data, cart: cart, user: user });
            }
            catch (err) {
                console.log(err)
            }
        };
        stripeToken && makePayment();
    }, [stripeToken, cart, totalPrice, user, history]);



    // disables checkout button if no user logged in or cart is empty
    return (
        <Container>
            <Wrapper>
                <Title>Order Summary</Title>
                <Info><Label>Subtotal:</Label><Amount>${subtotal}</Amount></Info>
                {subtotal > 0 ? <Info><Label>Delivery Charge:</Label><Amount>${deliveryCharge}</Amount></Info> : null}
                {subtotal > freeDeliveryLevel ? <Info><Label>Delivery Discount:</Label><Amount>-${deliveryCharge}</Amount></Info> : null}
                <Info type='total'><Label>Total Price:</Label><Amount>${totalPrice}</Amount></Info>
                {user && subtotal > 0 ?
                    stripeToken ? <span>Processing. Please wait...</span> :
                        <CheckoutButtonDiv>
                            <StripeCheckout
                                name='Nihon no Mono'
                                image='https://source.unsplash.com/tkxzEhfdxMc/640x425'
                                ComponentClass='div'
                                billingAddress
                                email={userDetails.email}
                                shippingAddress
                                description={`The total for your purchases is $${totalPrice}`}
                                amount={totalPrice * 100}
                                token={onToken}
                                stripeKey={KEY}
                            >
                                <Button>Pay With Card</Button>
                            </StripeCheckout>
                        </CheckoutButtonDiv>
                    :
                    <Button style={!user || subtotal <= 0 ? { 'pointerEvents': 'none', 'opacity': '0.65' } : null}>
                        {subtotal <= 0 ? 'Please add items to your cart' : 'Please login to checkout'}
                    </Button>}
            </Wrapper>
        </Container>
    )
}

export default OrderSummary
