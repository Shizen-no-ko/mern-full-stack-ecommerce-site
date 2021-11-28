import styled from 'styled-components';
import {mobile, portraitTablet, landscapeTablet} from '../../responsive';

const Container = styled.div`
display: flex;
max-width: 100%;
width: 100vw;


${mobile({
        flexDirection: 'column'
        })};

        ${portraitTablet({
        flexDirection: 'column',
        marginTop: '100px'
        })};

        ${landscapeTablet({
        flexDirection: 'column',
        marginTop: '100px'
        })};
`

const Left = styled.div`
display: flex;
flex: 1;
flex-direction: column;
`

const Center = styled.div`
flex: 1;

${mobile({
    marginBottom: '30px',
        width: '100%'
        })};


`

const Right = styled.div`

flex: 1;
justify-self: flex-end;

${mobile({
        width: '100%'
        })};

        ${portraitTablet({
        width: '100%'
        })};

        ${landscapeTablet({
        width: '100%'
        })};

`

const LogoContainer = styled.div`
display: flex;
margin: 0 50px;
width: 100%;

${'' /* margin: '0 42px', */}

${mobile({
        justifyContent: 'center',
        textAlign: 'center',
        margin:'0'
        })};

        ${portraitTablet({
        justifyContent: 'center',
        textAlign: 'center',
        margin:'0'
        })};

        ${landscapeTablet({
        justifyContent: 'center',
        textAlign: 'center',
        margin:'0'
        })};
`

const LogoTextContainer = styled.div`
margin: 0 15px;
text-align: center;

${mobile({
        margin: '0 5px'
        })};
`

const Logo = styled.h1`
color: black;
margin: 0 30px 0 0;

${mobile({
        fontSize: '1.5rem'
        })};

        ${portraitTablet({
        fontSize: '2rem',
        marginRight: '0'
        })};

        ${landscapeTablet({
        fontSize: '2rem',
        marginRight: '0'
        })};
`
const LogoText = styled.h1`
margin: 0 20px;

${mobile({
        fontSize: '1.5rem'
        })};

        ${portraitTablet({
        fontSize: '2rem',
        marginLeft: '0'
        })};

        ${landscapeTablet({
        fontSize: '2rem',
        marginLeft: '0'
        })};
`

const SocialContainer = styled.div`
display: flex;
justify-content: space-around;
margin: 20px 15px;
width: 90%;

${mobile({
    margin: '20px 0',
        width: '100%'
        })};

        ${portraitTablet({
    margin: '20px auto',
        width: '100%'
        })};

        ${landscapeTablet({
    margin: '20px auto',
        width: '100%'
        })};
`
const SocialIcon = styled.h1`
color: red;
font-size: 40px;
margin: 10px;
`

const LinksContainer = styled.div`
display: flex;
justify-content: space-around;
margin: auto;
width: 100%;

${mobile({
        textAlign: 'center'
        })};

        ${portraitTablet({
        textAlign: 'center'
        })};

        ${landscapeTablet({
        textAlign: 'center'
        })};
`
const LinksList = styled.ul`
 list-style-type: none;
  padding: 0;
  margin: 0 40px;
`
const LinkItem = styled.li`
color: rgba(255, 0, 0, 0.75);
flex: 1;
font-size: 17px;
padding: 5px;

&:hover{
    color: red;
}
`

const InfosContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
margin: auto;
width: 80%;

${mobile({
        textAlign: 'center'
        })};

        ${portraitTablet({
                margin: '20px auto',
        textAlign: 'center'
        })};

        ${landscapeTablet({
                margin: '20px auto',
        textAlign: 'center'
        })};


`
const InfoItem = styled.div`
margin: 5px 0;
`

const Payment = styled.div`
display: flex;

${mobile({
        justifyContent: 'center',
        marginTop: '20px'
        })};

        ${portraitTablet({
        justifyContent: 'center',
        marginTop: '20px'
        })};

        ${landscapeTablet({
        justifyContent: 'center',
        marginTop: '20px'
        })};
`

const PaymentItem = styled.h1`
color: red;
font-size: 40px;
${'' /* font-size: 30px; */}
margin: 0 5px;

${mobile({
        fontSize: '30px'
        })};
`


const Footer = () => {
    return(
       <Container>
       <Left>
       <LogoContainer>
       
                    <LogoTextContainer>
                        <LogoText>
                            Nihon no Mono
                        </LogoText>
                    </LogoTextContainer>
                    <Logo> <i className="fas fa-torii-gate"></i></Logo>
       </LogoContainer>
                    <SocialContainer>
                        <SocialIcon><i className="fab fa-facebook-square"></i></SocialIcon>
                        <SocialIcon><i className="fab fa-instagram"></i></SocialIcon>
                        <SocialIcon><i className="fab fa-twitter-square"></i></SocialIcon>
                    </SocialContainer>
       </Left>
       <Center>
           <LinksContainer>
           <LinksList>
           <LinkItem>Home</LinkItem>
           <LinkItem>Clothing</LinkItem>
           <LinkItem>Homeware</LinkItem>
           <LinkItem>Iro-Iro</LinkItem>
           </LinksList>
           <LinksList>
           <LinkItem>Cart</LinkItem>
           <LinkItem>My Account</LinkItem>
           <LinkItem>Wishlist</LinkItem>
           </LinksList>

           </LinksContainer>
       </Center>
       <Right>
       <InfosContainer>
       <InfoItem><i className="fas fa-map-marker-alt" style={{marginRight: '10px'}}></i>23456 Test Street, Test Town 555-555, Testland</InfoItem>
       <InfoItem><i className="fas fa-phone" style={{marginRight: '10px'}}></i>+1 789 654 123</InfoItem>
       <InfoItem><i className="fas fa-envelope" style={{marginRight: '10px'}}></i>contact@nihon-no-mono.com</InfoItem>
       {/* <InfoItem> */}
       <Payment>
       <PaymentItem><i className="fab fa-cc-visa"></i></PaymentItem> 
       <PaymentItem><i className="fab fa-apple-pay"></i></PaymentItem> 
       <PaymentItem><i className="fab fa-cc-mastercard"></i></PaymentItem>
       <PaymentItem><i className="fab fa-paypal"></i></PaymentItem> 
       <PaymentItem><i className="fab fa-cc-jcb"></i></PaymentItem>
       <PaymentItem><i className="fab fa-btc"></i></PaymentItem>
       <PaymentItem><i className="fab fa-alipay"></i></PaymentItem>
       <PaymentItem></PaymentItem>
       </Payment>
       </InfosContainer>
       </Right>
       </Container>
    )
}

export default Footer