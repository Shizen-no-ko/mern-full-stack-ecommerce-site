import styled from 'styled-components';
import sliderData from '../../data/data.js';


const Container = styled.div`
display:flex;
height: 100vh;
width: 100%;
`

const Wrapper = styled.div`
${'' /* align-items: center; */}
display:flex;
width: 100%;
`
const Slide = styled.div`
${'' /* align-items: center; */}
display: flex;
height: 100vh;
justify-content: flex-start;
width: 100vw;
`

const DetailsContainer = styled.div`
flex: 1;
padding: 50px;
`

const Details = styled.div`
font-size: 2rem;
`
const ImageContainer = styled.div`
flex: 1;
height: 100%;
`

const Img = styled.img`
height: 80%;
`


const Slider = (props) => {
    return(
       <Container>
       {sliderData.map((product, i) => {
           return(
               <Wrapper key={i}>
               <Slide >
                  <ImageContainer>
                  <Img src={product.img}/>
                  </ImageContainer> 
                  <DetailsContainer>
               <Details>
           <h1>{product.title}</h1>
           <p>{product.description}</p>
           <h4>{product.price}</h4>
       </Details>
               </DetailsContainer>
               </Slide>
               </Wrapper>
       )
       })}
       </Container>
    )
}

export default Slider