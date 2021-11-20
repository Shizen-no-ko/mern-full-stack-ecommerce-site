import {mobile} from '../../responsive';

import styled from 'styled-components';


const Container = styled.div`
color: white;
background-color: rgba(255, 0, 0, 0.7);
font-size: 20px;
padding: 10px 0;
text-align: center;
width: 100%;

${mobile({
        fontSize: '12px'
        })};

`

const Messaging = () => {
    return (
        <Container>
            Free Shipping on Orders Over $70
        </Container>
    )
}

export default Messaging
