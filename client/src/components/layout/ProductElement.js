import styled from 'styled-components';


const Container = styled.div`

${'' /* flex: 1; */}
flex-basis: 24%;
margin: 5px;
position: relative;

${'' /* &:hover{
    transform: scale(101%);
    transition: ease 0.05s;
}

&:active{
    transform: scale(99%);
    transition: ease 0.05s;
} */}
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
${'' /* background-color: white; */}
${'' /* border: 3px solid white; */}
${'' /* border-radius: 5px; */}
border: none;
bottom: ${props => props.topbottom === 'bottom' ? '5px' : null};
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
    border-radius: ${props => props.topbottom === 'top' ? '0 0 10px 0' : props.leftright === 'right' ? '10px 0 0 0' : '60px'};
    opacity: ${props => props.topbottom === 'bottom' && props.leftright === 'left' ? '0%' : '100%'};
    transform: ${props => props.topbottom === 'bottom' && props.leftright === 'left' ? 'translate(1000%, -750%) scale(0%)' : 'scale(120%)'};
    transition: ${props => props.topbottom === 'bottom' && props.leftright === 'left' ? 'linear 0.5s': ''};
}
`

const ProductElement = ({element}) => {
    return(
       <Container>
       <Img src={element.img}/>
       <IconContainer>
       <Icon topbottom={'top'} leftright={'left'}><i className="fas fa-cart-plus"></i></Icon>
       <Icon topbottom={'bottom'} leftright={'right'}><i className="far fa-eye"></i></Icon>
       <Icon topbottom={'bottom'} leftright={'left'}><i className="far fa-grin-hearts"></i></Icon>
       </IconContainer>
      
       </Container>
    )
}

export default ProductElement