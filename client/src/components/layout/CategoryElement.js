import styled from 'styled-components';

const Container = styled.div`
cursor: pointer;
flex: 1;
margin: 10px;
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
object-fit: cover;
width: 100%;
`

const Title = styled.h1`
background-color: rgba(255, 255, 255, 0.5);
${'' /* border-radius: 10px;
border: 0.25px solid rgba(255, 255, 255, 0.5); */}
color: rgba(255, 0, 0, 1);
font-size: 3rem;
font-weight: 400;
opacity: 100%;
right: 20px;
padding: 0 10px;
position: absolute;
${'' /* text-shadow: -1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF; */}
}
top: 30%;
z-index: 2;
`


const CategoryElement = ({element}) => {
    return(
       <Container>
           <Img src={element.img}/>
           <Title>{element.title}</Title>
          
       </Container>
    )
}

export default CategoryElement