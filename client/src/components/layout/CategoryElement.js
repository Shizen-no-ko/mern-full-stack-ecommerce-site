import styled from 'styled-components';
import {mobile, landscapeTablet} from '../../responsive';
import { Link } from 'react-router-dom';

const Container = styled.div`
cursor: pointer;
flex: 1;
margin: 10px 20px;
position: relative;

&:hover{
    transform: scale(101%);
    transition: ease 0.05s;
}

&:active{
    transform: scale(99%);
    transition: ease 0.05s;
}
`

const Img = styled.img`
border-radius: 50% 0;
object-fit: cover;
height: 100%;
width: 100%;
`

const Title = styled.h1`
background-color: rgba(255, 255, 255, 0.5);
color: rgba(255, 0, 0, 1);
font-size: 3rem;
font-weight: 400;
opacity: 100%;
right: 20px;
padding: 0 10px;
position: absolute;
top: 30%;
z-index: 2;

${mobile({
    fontSize: '2.5rem'        
        })};

        ${landscapeTablet({
            fontSize: '1.75rem',
            right: '10px'
        })};
`

// Category elements for display on landing page
const CategoryElement = ({element}) => {
    return(
       <Container>
       <Link to={`products/${element.title.toLowerCase()}`}>
           <Img src={element.img}/>
           <Title>{element.title}</Title>
          </Link>
       </Container>
    )
}

export default CategoryElement