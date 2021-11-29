import { useRef, useState } from 'react';

import styled from 'styled-components';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';

import Navbar from '../layout/Navbar';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';

const Container = styled.div`
background: linear-gradient(rgba(255,192,203, 0.5), rgba(255,255,255, 1)), url('https://source.unsplash.com/9Qwbfa_RM94/1920x1280'), center;
backgroundSize: 100% 101%;
height: 500px;
margin: -1px -1px;
max-width: 100%;
overflow: hidden;
width: 100vw;

${mobile({
    backgroundSize: '150% 101%',
    height: '400px',
    margin: '-1px -1px'
})};

${portraitTablet({
    backgroundSize: '120% 101%',
    height: '450px',
    margin: '-1px -1px'
})};

${landscapeTablet({
    backgroundSize: '100% 101%',
    height: '500px',
    margin: '-1px -1px'
})};
`

const Wrapper = styled.div`
margin: 50px auto;
width: 40%;

${mobile({
    textAlign: 'center',
    width: '80%'
})};

${portraitTablet({
    textAlign: 'center',
    width: '80%'
})};

${landscapeTablet({
    fontSize: '22px',
    width: '60%'
})};
`
const Title = styled.h1`
color: rgba(255, 0, 0, 0.9);
font-size: 3rem;

${mobile({
    fontSize: '2rem',
    marginBottom: '0'
})};

${portraitTablet({
    fontSize: '2.5rem',
    marginBottom: '0'
})};
`

const Form = styled.form`
${'' /* border: 1px solid white; */}
border-radius: 20px;
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

${mobile({
    fontSize: '15px',
    marginLeft: '0px'
})};


${portraitTablet({
    fontSize: '20px',
    marginLeft: '0px'
})};
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

${mobile({
    fontSize: '15px'
})};

${portraitTablet({
    fontSize: '20px'
})};
`

const ClosedEye = styled.div`
cursor: pointer;
display: none;
font-size: 20px;
margin-left: -45px;
width: 30px;

${mobile({
    fontSize: '15px'
})};

${portraitTablet({
    fontSize: '20px'
})};
`

const Button = styled.button`
all: unset;
background-color: white;
border: 4px solid red;
border-radius: 20px 0;
${'' /* border-radius: 10px; */}
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

${mobile({
    fontSize: '17px',
    width: '80%'
})};

${portraitTablet({
    fontSize: '22px',
    width: '80%'
})};

`

const PasswordForgotten = styled.div`
margin: 20px auto 0;
text-align: center;
width: 75%;

${landscapeTablet({
    fontSize: '18px'
})};

`


const Login = (props) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const eyeRef = useRef(null);
    const closedEyeRef = useRef(null);
    const passwordRef = useRef(null);

    const openEye = (pos) => {
        closedEyeRef.current.style.display = 'unset';
        eyeRef.current.style.display = 'none';
        passwordRef.current.type = 'text';
    }

    const closeEye = (pos) => {
        closedEyeRef.current.style.display = 'none';
        eyeRef.current.style.display = 'unset';
        passwordRef.current.type = 'password';
    }


    return (
        <div>
            <Navbar />

            <Container>
                <Wrapper>
                    <Title>Login To Your Account</Title>
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <Input onChange={e => onChange(e)} required name='email' type='email' value={email} placeholder='Enter Your Email'></Input>
                        <PasswordContainer>
                            <Input onChange={e => onChange(e)} ref={passwordRef} name='password' type='password' value={password} placeholder='Enter Your Password'></Input>
                            <Eye onClick={() => openEye(0)} ref={eyeRef} ><i className="fas fa-eye"></i></Eye>
                            <ClosedEye onClick={() => closeEye(0)} ref={closedEyeRef}><i className="fas fa-eye-slash"></i></ClosedEye>
                        </PasswordContainer>
                        <Button>Let's Go Shopping</Button>
                        <PasswordForgotten>Forgotten Password?</PasswordForgotten>
                    </Form>

                </Wrapper>
            </Container>
            <SubscriptionForm />
            <Footer />
        </div>
    )
}

export default Login