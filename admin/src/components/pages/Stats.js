import { useState } from 'react';
import { publicReq, userReq } from '../../axiosRequests';

import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import SalesChart from '../layout/SalesChart';
import TopSellersChart from '../layout/TopSellersChart';
import TopEarnersChart from '../layout/TopEarnersChart';
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

const ChartsContainer = styled.div`
display:flex;
flex-direction: row;
flex-wrap: wrap;
height: auto;
justify-content: space-evenly;
margin: 20px 20px;
max-width: 100%;
overflow: hidden;
width: 100vw;`

const Title = styled.h1`
color: rgba(255, 0, 0, 0.9);
font-size: 3rem;
font-weight: 400;
margin-bottom: 0;

${mobile({
    fontSize: '2rem'
})};

${portraitTablet({
    fontSize: '2.75rem'
})};
`

const Stats = () => {

    return (
        <div>
            <Navbar />
            <Container>
            <Title>Statistics</Title>
            <ChartsContainer>
            <SalesChart/>
            <TopSellersChart/>
            <TopEarnersChart/>
            </ChartsContainer>
            <ChartsContainer>
            <UserStats/>
            <OrderStats/>
            </ChartsContainer>
            
            </Container>
           
            <Footer />
        </div>
    )
}

export default Stats