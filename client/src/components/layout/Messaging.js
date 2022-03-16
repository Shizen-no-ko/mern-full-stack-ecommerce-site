import { mobile, portraitTablet, landscapeTablet } from '../../responsive';
import { useSelector } from 'react-redux';

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

        ${portraitTablet({
    fontSize: '18px'
})};

        ${landscapeTablet({
    fontSize: '18px'
})};
`

// Rudimentary messaging functionality
const Messaging = () => {

    const { freeDeliveryLevel } = useSelector(state => state.cart);

    return (
        <Container>
            Free Shipping on Orders Over ${freeDeliveryLevel}
        </Container>
    )
}

export default Messaging
