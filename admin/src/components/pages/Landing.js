import React from 'react';
import Navbar from '../layout/Navbar';
import ProductDisplay from '../layout/ProductDisplay';
import Footer from '../layout/Footer';

import styled from 'styled-components';

const Container = styled.div`
max-width: 100%;
overflow: hidden;

`

const Landing = (props) => {
    return(
        <Container>
            <Navbar/>
            {/* <Slider/>
            <Categories/> */}
            <ProductDisplay filter={{}} category={null} landing={true} />
            {/* <SubscriptionForm/> */}
            <Footer/>
        </Container>
    )
}

export default Landing