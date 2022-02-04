import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';

import { mobile, portraitTablet, landscapeTablet } from '../../responsive';

import Navbar from '../layout/Navbar';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';




const Container = styled.div`
background: linear-gradient(rgba(255,192,203, 0.5), rgba(255,255,255, 1)), url('https://source.unsplash.com/9Qwbfa_RM94/1920x1280'), center;
backgroundSize: 100% 101%;
height: 500px;
margin: -1px -1px;
max-width: 100%;
overflow: hidden;
width: 100vw;

${mobile({
    backgroundSize: '150% 101%',
    height: '400px',
    margin: '-1px -1px'
})};

${portraitTablet({
    backgroundSize: '120% 101%',
    height: '450px',
    margin: '-1px -1px'
})};

${landscapeTablet({
    backgroundSize: '100% 101%',
    height: '500px',
    margin: '-1px -1px'
})};
`

const Wrapper = styled.div`
margin: 50px auto;
width: 40%;

${mobile({
    textAlign: 'center',
    width: '80%'
})};

${portraitTablet({
    textAlign: 'center',
    width: '80%'
})};

${landscapeTablet({
    fontSize: '22px',
    width: '60%'
})};
`

const Form = styled.div`
${'' /* border: 1px solid white; */}
border-radius: 20px;
padding: 20px 15px;
text-align: center;
`
const Title = styled.h1`
color: rgba(255, 0, 0, 0.9);
font-size: 2rem;

${mobile({
    fontSize: '2rem',
    marginBottom: '0'
})};

${portraitTablet({
    fontSize: '2.5rem',
    marginBottom: '0'
})};
`

const Button = styled.button`
all: unset;
background-color: white;
border: 4px solid red;
border-radius: 20px 0;
${'' /* border-radius: 10px; */}
color: red;
cursor: pointer;
font-size: 20px;
font-weight: bold;
margin: 30px auto 10px;
outline: none;
padding: 10px;
text-align: center;
width: 50%;



&:hover{
    background-color: red;
    color: white;
    transform: scale(103%);
}

&:active{
    background-color: green;
    border: 3px solid green; 
    transform: scale(97%);
}

&:disabled{
    background-color: rgba(100, 0, 0, 0.5);
    border: 3px solid rgb(200, 0, 0);
    color: rgba(200, 0, 0, 0.5);
    cursor: not-allowed;

}

${mobile({
    fontSize: '17px',
    width: '80%'
})};

${portraitTablet({
    fontSize: '22px',
    width: '80%'
})};

`

const Logo = styled.div`
background-color: white;
border: 4px solid black;
border-radius: 50%;
color: red;
font-size: 40px;
max-height: 45px;
margin: 0 auto;
padding: 10px 15px 15px;
text-align: center;
max-width: 45px;
`

const Text = styled.p`
color: red;
font-size: 1.5rem;
`

const Success = () => {

const location = useLocation();
const data = location.state.data;
const user = location.state.user;
const cart = location.state.cart;
console.log('DATA IS:')
console.log(data);
console.log('USER IS: ')
console.log(user);
console.log('CART IS: ')
console.log(cart);

const history = useHistory();

const handleClick = (e) => {
    e.preventDefault();
    history.replace('/');
}
 
// user.user.username
// user.user._id
// user.user.email

// cart.deliveryCharge
// cart.itemCount
// cart.products (array). _id, color, size, price, title 
// cart.totalPrice
// cart.subtotal

// data.billing_details.city: "Lalala Town"
// country: "United States"
// line1: "Lalalal 344"
// line2: null
// postal_code: "1234"
// state: "NY"
// data.balance_transaction: 
// data.name 
// data.currency 
// data.amount
// data.amount_captured
// data.paid(bool)
// data.status

// const OrderSchema = new mongoose.Schema(
//     {
//         userId: {
//             type: String,
//             required: true,
//         },
//         items: [
//             {
//                 itemId: {
//                     type: String,
//                 },
//                 amount: {
//                     type: Number,
//                     default: 1
//                 }, 
//                 color: {
//                     type:String
//                 },
//                 size: {
//                     type:String
//                 }
//             }
//         ],
//         subTotal: {
//             type: Number,
//             required: true
//         },
//         deliveryCharge: {
//             type: Number,
//             required: true
//         },
//         totalPrice: {
//             type: Number,
//             required: true
//         },
//         userAddress : {
//             type: Object,
//             required: true
//         },
//         status: {
//             type: String,
//             default: "Order Received"
//         }
//     },
//     { timestamps: true }
// );



return (
    <div>
        <Navbar/>
        <Container>
            <Wrapper>
                <Form>
                <Logo>
                <i className="fas fa-torii-gate"></i>
                </Logo>
                <p>{user.user.username}</p>
                    <Title>Payment was successful.</Title>
                    <Text>We have received your order.</Text>
                    <Text>Thank you for your custom.</Text>
                    <Button onClick={handleClick}>Continue Shopping</Button>
                </Form>
            </Wrapper>
        </Container>
        <SubscriptionForm/>
        <Footer/>
    </div>
)

};

export default Success;