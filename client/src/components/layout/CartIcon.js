import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { mobile } from '../../responsive';

import Badge from './Badge';

const CartContainer = styled.div`
font-size:20px;
padding-top: 5px;

${mobile({
    fontSize: '13px'
})};
`

// Displays cart icon with item count badge passing itemCount state from Redux into badge
const CartIcon = () => {
    const itemCount = useSelector(state => state.cart.itemCount);
    return (
        <CartContainer>
            <Badge cartItems={itemCount} color={"red"} />
            <i className="fas fa-shopping-cart"></i>
        </CartContainer>
    )
}

export default CartIcon