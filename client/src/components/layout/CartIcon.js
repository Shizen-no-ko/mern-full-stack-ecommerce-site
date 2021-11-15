import styled from 'styled-components';
import Badge from './Badge';

const CartContainer = styled.div`
font-size:20px;
padding-top: 5px;
`


const CartIcon = (props) => {
    return(
       <CartContainer>
        <Badge cartItems={10} color={"red"}/>
           <i className="fas fa-shopping-cart"></i>
       </CartContainer>
    )
}

export default CartIcon