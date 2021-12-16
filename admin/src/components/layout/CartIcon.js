import { useSelector } from 'react-redux';

import styled from 'styled-components';
import Badge from './Badge';

import {mobile} from '../../responsive';

const CartContainer = styled.div`
font-size:20px;
padding-top: 5px;

${mobile({
        fontSize: '13px'
        })};

`


const CartIcon = (props) => {
    const itemCount = useSelector(state=>state.cart.itemCount);
    return(
       <CartContainer>
        <Badge cartItems={itemCount} color={"red"}/>
           <i className="fas fa-shopping-cart"></i>
       </CartContainer>
    )
}

export default CartIcon