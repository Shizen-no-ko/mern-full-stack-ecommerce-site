import React from 'react';
import Navbar from '../layout/Navbar';
import Slider from '../layout/Slider';
import Categories from '../layout/Categories';
import ProductDisplay from '../layout/ProductDisplay';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';

import styled from 'styled-components';

const Container = styled.div`
max-width: 100%;
overflow: hidden;

`

const Landing = () => {
    return(
        <Container>
            <Navbar/>
            {/* <Slider/>
            <Categories/> */}
            <ProductDisplay filter={{}} category={null} landing={true}/>
            {/* <SubscriptionForm/> */}
            <Footer/>
        </Container>
    )
}

export default Landing