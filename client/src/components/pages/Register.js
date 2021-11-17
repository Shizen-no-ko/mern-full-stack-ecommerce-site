import {useRef} from 'react';

import styled from 'styled-components';
import Navbar from '../layout/Navbar';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';

const Container = styled.div`
height: 100vh;
Width: 97vw;
`

const Wrapper = styled.div`
margin: 50px auto;
width: 50%;
`
const Title = styled.h1`
font-size: 3rem;
`

const Form = styled.form`
border: 1px solid lightgray;
border-radius: 20px;
box-shadow: 5px 5px 15px lightgray;
display: flex;
flex-direction: column;
padding: 20px 15px;
`



const Input = styled.input`
border-radius: 10px;
font-size: 20px;
margin: 10px;
outline: none;
padding: 10px;
width: 94%;
`
const PasswordContainer = styled.div`
align-items: center;
display: flex;
width: 100%;
`
const Eye = styled.div`
cursor: pointer;
font-size: 20px;
margin-left: -45px;
width: 30px;
`

const ClosedEye = styled.div`
cursor: pointer;
display: none;
font-size: 20px;
margin-left: -45px;
width: 30px;
`

const Button = styled.button`
all: unset;
background-color: white;
border: 4px solid red;
border-radius: 10px;
color: red;
cursor: pointer;
font-size: 20px;
font-weight: bold;
margin: 30px auto 10px;
outline: none;
padding: 10px;
text-align: center;
width: 50%;



&:hover{
    background-color: red;
    color: white;
    transform: scale(103%);
}

&:active{
    background-color: green;
    border: 3px solid green; 
    transform: scale(97%);
}

`
const PrivacyPolicy = styled.div`
margin: 20px auto 0;
text-align: center;
width: 75%;
`

const Register = (props) => {

const eyeRef1 = useRef(null);
const closedEyeRef1 = useRef(null);
const eyeRef2 = useRef(null);
const closedEyeRef2 = useRef(null);
const passwordRef1 = useRef(null);
const passwordRef2 = useRef(null);

const refsArray = [[eyeRef1, closedEyeRef1, passwordRef1], [eyeRef2, closedEyeRef2, passwordRef2]]

const openEye = (pos) => {
    refsArray[pos][1].current.style.display = 'unset';
    refsArray[pos][0].current.style.display = 'none';
    refsArray[pos][2].current.type = 'text';
}

const closeEye = (pos) => {
    refsArray[pos][1].current.style.display = 'none';
    refsArray[pos][0].current.style.display = 'unset';
    refsArray[pos][2].current.type = 'password';
}

    return (
        <div>
            <Navbar />

            <Container>
            <Wrapper>
            <Title>Create Your Account</Title>
                    <Form>
                    <Input name='name' type='text' placeholder='Your Name'></Input>
                        <Input name='email' type='email' placeholder='Your Email'></Input>
                        <PasswordContainer>
                        <Input ref={passwordRef1} name='password' type='password' placeholder='Choose a Password'></Input>
                        <Eye onClick={() => openEye(0)} ref={eyeRef1} ><i class="fas fa-eye"></i></Eye>
                        <ClosedEye onClick={() => closeEye(0)} ref={closedEyeRef1}><i class="fas fa-eye-slash"></i></ClosedEye>
                        </PasswordContainer>
                        <PasswordContainer>
                        <Input ref={passwordRef2} name='password-confirmation' type='password' placeholder='Re-enter Password'></Input>
                        <Eye onClick={() => openEye(1)} ref={eyeRef2}><i class="fas fa-eye"></i></Eye>
                        <ClosedEye onClick={() => closeEye(1)} ref={closedEyeRef2}><i class="fas fa-eye-slash"></i></ClosedEye>
                        </PasswordContainer>
                        <PrivacyPolicy>By creating this account, I consent to the processing of my personal data in accordance with the <b>Privacy Policy</b></PrivacyPolicy>
                        <Button>Sign Me Up</Button>
                    </Form>
                </Wrapper>
            </Container>
            <SubscriptionForm />
            <Footer />
        </div>
    )
}

export default Register