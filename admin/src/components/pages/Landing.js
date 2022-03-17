import styled from 'styled-components';

import Navbar from '../layout/Navbar';
import ProductDisplay from '../layout/ProductDisplay';
import Footer from '../layout/Footer';


const Container = styled.div`
max-width: 100%;
overflow: hidden;
`

const Landing = () => {
    return (
        <Container>
            <Navbar />
            <ProductDisplay filter={{}} category={null} landing={true} />
            <Footer />
        </Container>
    )
}

export default Landing