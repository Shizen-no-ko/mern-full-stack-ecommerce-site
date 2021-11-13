import React from 'react';
import Navbar from './Navbar';
import Slider from './Slider';
import Categories from './Categories';
import ProductDisplay from './ProductDisplay';

const Landing = () => {
    return(
        <div>
            <Navbar/>
            <Slider/>
            <Categories/>
            <ProductDisplay/>
        </div>
    )
}

export default Landing