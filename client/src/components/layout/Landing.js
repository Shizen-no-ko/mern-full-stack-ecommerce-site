import React from 'react';
import Navbar from './Navbar';
import Slider from './Slider';
import Categories from './Categories';
import ProductDisplay from './ProductDisplay';
import SubscriptionForm from './SubscriptionForm';
import Footer from './Footer';

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