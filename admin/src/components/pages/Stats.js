import { useState } from 'react';
import { publicReq, userReq } from '../../axiosRequests';

import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import SalesChart from '../layout/SalesChart';
import UserStats from '../layout/UserStats';
import OrderStats from '../layout/OrderStats';

import styled from 'styled-components';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';

const Container = styled.div`
display:flex;
flex-wrap: wrap;
height: auto;
justify-content: space-evenly;
margin: 20px 0;
max-width: 100%;
overflow: hidden;
width: 100vw;

${'' /* ${mobile({
    height: 'auto'
})};


${portraitTablet({
    height: 'auto'
})}; */}

${landscapeTablet({
    height: 'auto',
    overflow: 'visible'
})};  
`


const Stats = () => {

    return (
        <div>
            <Navbar />
            <Container>
            <SalesChart/>
            <UserStats/>
            <OrderStats/>
            </Container>
           
            <Footer />
        </div>
    )
}

export default Stats