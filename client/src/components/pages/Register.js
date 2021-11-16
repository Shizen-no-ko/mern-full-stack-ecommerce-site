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
width: 90%;
`
const PasswordContainer = styled.div`
align-items: center;
display: flex;
width: 100%;
`
const Eye = styled.div`
font-size: 20px;
width: 30px;
`

const ClosedEye = styled.div`
display: none;
font-size: 20px;
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

const eyeRef = useRef(null);
const closedEyeRef = useRef(null);
const passwordRef1 = useRef(null);
const passwordRef2 = useRef(null);

const openEye = () => {
    closedEyeRef.current.style.display = 'unset';
    eyeRef.current.style.display = 'none';
    passwordRef1.current.type = 'text';
}

const closeEye = () => {
    closedEyeRef.current.style.display = 'none';
    eyeRef.current.style.display = 'unset';
    passwordRef1.current.type = 'password';
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
                        <Eye onClick={openEye} ref={eyeRef}><i class="fas fa-eye"></i></Eye>
                        <ClosedEye onClick={closeEye} ref={closedEyeRef}><i class="fas fa-eye-slash"></i></ClosedEye>
                        </PasswordContainer>
                        <Input ref={passwordRef2} name='password-confirmation' type='password' placeholder='Re-enter Password'></Input>
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