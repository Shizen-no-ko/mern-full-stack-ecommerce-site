import {useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from '../../redux/store';

import styled from 'styled-components';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';
import { register } from '../../redux/apiCalls';
// import { clearErrors } from '../../redux/userRedux';

import Navbar from '../layout/Navbar';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';

const Container = styled.div`
background: linear-gradient(rgba(255,192,203, 0.5), rgba(255,255,255, 1)), url('https://source.unsplash.com/9Qwbfa_RM94/1920x1280'), center;
height: 700px,
max-width: 100%;
overflow: hidden;
width: 100vw;

${mobile({
    backgroundSize: '200% 101%',
    height: '550px',
    margin: '-1px -1px'
})};

${portraitTablet({
    backgroundSize: '150% 101%',
    height: '600px',
    margin: '-1px -1px'
})};

${landscapeTablet({
    backgroundSize: '102% 100%',
    height: '700px',
    margin: '-1px -1px'
})};
`

const Wrapper = styled.div`
margin: 50px auto;
width: 50%;

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
${'' /* box-shadow: 5px 5px 15px rgb(255,192,203); */}
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
const PrivacyPolicy = styled.div`
margin: 20px auto 0;
text-align: center;
width: 75%;

${mobile({
    fontSize: '0.75rem',
})};

${portraitTablet({
    fontSize: '1rem',
})};

${landscapeTablet({
    fontSize: '1rem'
})};
`

const ErrorMessage = styled.span`
color: red;
font-weight: bold;
font-size: 1.5rem;
margin: 10px;
text-align: center;
`

const Register = (props) => {

const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm:''
});

const { username, email, password, passwordConfirm } = formData;

const dispatch = useDispatch();
// dispatch(clearErrors());
const { isFetching, error, errorMessage } = useSelector(state => state.user);

const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm){
        console.log("Passwords Do Not Match")
    }else{
        console.log(formData)
    }
};

const handleClick = (e) => {
    e.preventDefault();
    persistor.purge();
    register(dispatch, { username, email, password, passwordConfirm })
};

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
};

const closeEye = (pos) => {
    refsArray[pos][1].current.style.display = 'none';
    refsArray[pos][0].current.style.display = 'unset';
    refsArray[pos][2].current.type = 'password';
};

console.log(`ERROR IS ${JSON.stringify(errorMessage)} `);

    return (
        <div>
            <Navbar />

            <Container>
            <Wrapper>
            <Title>Create Your Account</Title>
                    <Form onSubmit={e => onSubmit(e)}>
                    <Input onChange={e => onChange(e)} required name='username' type='text' value={username} placeholder='Your Name'></Input>
                        <Input onChange={e => onChange(e)} required name='email' type='email' value={email} placeholder='Your Email'></Input>
                        <PasswordContainer>
                        <Input onChange={e => onChange(e)} ref={passwordRef1} name='password' type='password' value={password} placeholder='Choose a Password'></Input>
                        <Eye onClick={() => openEye(0)} ref={eyeRef1} ><i className="fas fa-eye"></i></Eye>
                        <ClosedEye onClick={() => closeEye(0)} ref={closedEyeRef1}><i className="fas fa-eye-slash"></i></ClosedEye>
                        </PasswordContainer>
                        <PasswordContainer>
                        <Input onChange={e => onChange(e)} ref={passwordRef2} name='passwordConfirm' type='password' value={passwordConfirm} placeholder='Re-enter Password'></Input>
                        <Eye onClick={() => openEye(1)} ref={eyeRef2}><i className="fas fa-eye"></i></Eye>
                        <ClosedEye onClick={() => closeEye(1)} ref={closedEyeRef2}><i className="fas fa-eye-slash"></i></ClosedEye>
                        </PasswordContainer>
                        <PrivacyPolicy>By creating this account, I consent to the processing of my personal data in accordance with the <b>Privacy Policy</b></PrivacyPolicy>
                        <Button onClick={handleClick}>Sign Me Up</Button>
                        {error && <ErrorMessage>{errorMessage && errorMessage[0].msg}</ErrorMessage>}
                    </Form>
                </Wrapper>
            </Container>
            <SubscriptionForm />
            <Footer />
        </div>
    )
}

export default Register