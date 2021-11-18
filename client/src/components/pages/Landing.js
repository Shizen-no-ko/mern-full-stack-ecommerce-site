import React from 'react';
import Navbar from '../layout/Navbar';
import Slider from '../layout/Slider';
import Categories from '../layout/Categories';
import ProductDisplay from '../layout/ProductDisplay';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';


const Landing = () => {
    return(
        <div>
            <Navbar/>
            <Slider/>
            <Categories/>
            <ProductDisplay/>
            <SubscriptionForm/>
            <Footer/>
        </div>
    )
}

export default Landing