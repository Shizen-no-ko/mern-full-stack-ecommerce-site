import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { userReq } from '../../axiosRequests';


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

// Display summary of order in Individual Order page, with change status of order button
const OrderSummary = (props) => {

    const history = useHistory();

    const { details, orderId } = props;
    const { subtotal, totalPrice } = details;

    // Handle changing order's status to dispatched with re-direct to stats page
    const handleClick = async () => {
        try {
            await userReq.patch(`orders/${orderId}`);
            history.replace('/statistics');
        }
        catch (err) {
            console.log(err)
        }
    };


    return (
        <Container>
            <Wrapper>
                <Title>Order Summary</Title>
                <Info><Label>Subtotal:</Label><Amount>${subtotal}</Amount></Info>
                <Info><Label>Delivery Charge:</Label><Amount>${(totalPrice - subtotal).toFixed(2)}</Amount></Info>
                <Info type='total'><Label>Total Price:</Label><Amount>${totalPrice}</Amount></Info>
                <Button onClick={handleClick}>Update to "Dispatched"</Button>
            </Wrapper>
        </Container>
    )
}

export default OrderSummary
