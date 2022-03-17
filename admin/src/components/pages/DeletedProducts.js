import React from 'react';
import Navbar from '../layout/Navbar';
import ProductDisplay from '../layout/ProductDisplay';
import Footer from '../layout/Footer';

import styled from 'styled-components';

const Container = styled.div`
max-width: 100%;
overflow: hidden;
`

// Display deleted products
const DeletedProducts = () => {
    return (
        <Container>
            <Navbar />
            <ProductDisplay filter={{}} category={'deleted'} landing={true} />
            <Footer />
        </Container>
    )
}

export default DeletedProducts