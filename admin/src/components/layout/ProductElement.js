import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';


const Container = styled.div`

${'' /* flex: 1; */}
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


const Icon = styled.div`
background-color: rgba(0, 0, 0, 0.5);
cursor: pointer;
border: none;
bottom: 4px;
color: white;
font-size: 20px;
padding: 3px;
position:absolute;
right: 0px;
text-align: center;
width: 200px;

&:hover{
    background-color: white;
    color: red;
    opacity: 100%;
}

&:active{
    border-radius: ${props => props.topbottom === 'top' ? '0 0 10px 0' : props.leftright === 'right' ? '10px 0 0 0' : '60px'};
    opacity: ${props => props.topbottom === 'bottom' && props.leftright === 'left' ? '0%' : '100%'};
    transform: ${props => props.topbottom === 'bottom' && props.leftright === 'left' ? 'translate(1000%, -750%) scale(0%)' : 'scale(120%)'};
    transition: ${props => props.topbottom === 'bottom' && props.leftright === 'left' ? 'linear 0.5s' : ''};
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

const ProductElement = ({ element, deleted }) => {
    return (
        <Container>
            <Img src={element.image} />
            <IconContainer>
            {deleted ? 
            <Link to={`../product/${element._id}`}><Icon topbottom={'bottom'} leftright={'right'}>REINSTATE PRODUCT</Icon></Link> 
            :
            <Link to={`../product/${element._id}`}><Icon topbottom={'bottom'} leftright={'right'}>EDIT PRODUCT</Icon></Link>
            }
            </IconContainer>
        </Container>
    )
}

export default ProductElement