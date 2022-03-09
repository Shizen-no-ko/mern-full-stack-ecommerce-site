import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';


const Container = styled.div`
flex-basis: 24%;
margin: 5px;
position: relative;

${mobile({
    flexBasis: '55%',
})};

        ${portraitTablet({
    flexBasis: '33%',
})};
`

const Img = styled.img`
border-radius: 0 50px 0 0;
object-fit: cover;
width: 100%;
`

const IconContainer = styled.div`
height: 100%;
left: 0;
width: 100%;
opacity: 0;
position: absolute;
top: 0;
transition: ease 0.5s;

&:hover {
    opacity: 100%;
}
`

const LikeContainer = styled.div`
height: 25px;
left: 0;
width: 40px;
opacity: 100%;
position: absolute;
bottom: 0;
z-index: 20;
`

// Like, view product, and add to cart icons
// with conditional setting of styling values
const Icon = styled.div`
background-color: ${props => props.liked ? 'red' : 'rgba(0, 0, 0, 0.5)'};
cursor: pointer;
border: none;
bottom: ${props => props.topbottom === 'bottom' ? '4px' : null};
color: white;
font-size: 25px;
left: ${props => props.leftright === 'left' ? '0px' : null};
padding: 3px;
position:absolute;
right: ${props => props.leftright === 'right' ? '0px' : null};
text-align: center;
top: ${props => props.topbottom === 'top' ? '0px' : null};
width: 40px;

&:hover{
    background-color: white;
    color: red;
    opacity: 100%;
}

&:active{
    border-radius: ${props => props.topbottom === 'top' ? '0 0 10px 0' : props.leftright === 'right' ? '10px 0 0 0' : '0px'};
    transform: ${props => props.topbottom === 'bottom' && props.leftright === 'left' ? 'scale(80%)' : 'scale(120%)'};
 }

${mobile({
    fontSize: '15px',
    height: '18px',
    width: '20px'
})};

${portraitTablet({
    fontSize: '20px',
    height: '22px',
    width: '25px'
})};

${landscapeTablet({
    fontSize: '20px',
    height: '22px',
    width: '25px'
})};
`

// Takes props for handling like and cart clicks, product data (element) for rendering, 
// and whether product is liked or not by user 
const ProductElement = ({ element, getLikeClick, getCartClick, liked }) => {

    return (
        <Container>
            <Img src={element.image} />
            <IconContainer>
                <Icon onClick={() => getCartClick(element)} topbottom={'top'} leftright={'left'}><i className="fas fa-cart-plus"></i></Icon>
                <Link to={`../product/${element._id}`}><Icon topbottom={'bottom'} leftright={'right'}><i className="far fa-eye"></i></Icon></Link>
                <Icon liked={liked} onClick={() => getLikeClick(element._id)} topbottom={'bottom'} leftright={'left'}><i className="far fa-grin-hearts"></i></Icon>
            </IconContainer>
            {liked ?
                <LikeContainer style={{ opacity: '100%' }}>
                    <Icon style={{ opacity: '100%' }} liked={liked} onClick={() => getLikeClick(element._id)} topbottom={'bottom'} leftright={'left'}><i className="far fa-grin-hearts"></i></Icon>
                </LikeContainer>
                : null}
        </Container>
    )
}

export default ProductElement