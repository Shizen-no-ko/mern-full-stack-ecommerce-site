import styled from 'styled-components';
import { mobile } from '../../responsive';


const BadgeContainer = styled.div`
position: relative;
`

const BadgeElement = styled.div`
color: white;
border-radius: 50%;
font-size: 12px;
left: 10px; 
opacity: 90%;
position: absolute;
text-align: center;
top: -7px;
width: 75%;

${mobile({
    fontSize: '9px',
    top: '-3px'
})};
`

// Variable count badge, only displays if one or more items are in cart
const Badge = (props) => {
    return (
        <BadgeContainer>
            <BadgeElement style={{ backgroundColor: props.color }}>
                {props.cartItems > 0 ? props.cartItems : ""}
            </BadgeElement>
        </BadgeContainer>
    )
}

export default Badge