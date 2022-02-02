import {useState, useEffect} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { publicReq } from '../../axiosRequests';

import Navbar from '../layout/Navbar';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';

const KEY = 'pk_test_51J9p5BLXyomGrbFgSKqZ0pKttV0iSgS35GiOUwFkFH3kUsKc1oeNA6vd4pJs7pdKLAQpAenimARG0al8amip2nhn00RA1N6Ur7';



const Pay = () => {

    const [stripeToken, setStripeToken] = useState();
 
const onToken = (token) => {
    console.log(token);
    setStripeToken(token);
};

useEffect(() => {
 const makePayment = async () => {
     try{
        const res = await publicReq.post(
            '/checkout/payment', 
            {
                tokenId:stripeToken.id, 
                amount:2000
            }
            );
            console.log(res.data);
     }
     catch (err) {
         console.log(err)
     }
 };
 stripeToken && makePayment();
}, [stripeToken]);

return (
    <div>
        <Navbar/>
        <StripeCheckout 
        name='Nihon no Mono' 
        image='https://source.unsplash.com/tkxzEhfdxMc/640x425'
        billingAddress
        shippingAddress
        description='The total for your purchases is $20'
        amount={2000}
        token={onToken}
        stripeKey={KEY}
        />
        <SubscriptionForm/>
        <Footer/>
    </div>
)

};

export default Pay;