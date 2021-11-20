import React, { useState } from 'react';
import {mobile} from '../../responsive';


import styled from 'styled-components';


const Container = styled.div`
margin: 60px 0;
width: 97vw;
`

const SubscriptionContainer = styled.div`
display:flex;
flex-direction: column;
justify-content: space-between;
margin: auto;
text-align: center;
width: 40%;

${mobile({
        width: '80%'
        })};

`
const Heading = styled.h1`
font-size: 3rem;
margin: 0;


${mobile({
        fontSize: '2rem'
        })};
`
const Message = styled.h3`
${'' /* padding: 0; */}
margin: 0 0 20px;

${mobile({
        fontSize: '1rem'
        })};
`

const InputContainer = styled.div`
border: 1px solid lightgray;
border-radius: 10px;
display: flex;
width: 100%;

${mobile({
    borderRadius: '7px',
    height: '20px'
        
        })};

`
const InputBox = styled.input`
border: none;
flex: 7;
font-size: 20px;
line-height:28px;
padding: 5px;
${'' /* height: 100%; */}

&:focus{
    outline: none;
}

${mobile({
        fontSize: '12px',
        lineHeight: '12px'
        })};

`
const SendButton = styled.button`
all: unset;
background-color: red;
border-radius: 0 10px 10px 0;
color: white;
flex: 1;
transform: scale(103%);

&:hover{
    border: 1px solid red;
    color: red;
    background-color: white;
    transform: scale(106%);
}

&:active{
    border: 1px solid green;
    color: white;
    background-color: green;
    transform: scale(104%);
}

${mobile({
    borderRadius: '0 7px 7px 0',        
        })};

`

const SubscriptionForm = () => {

    const [formState, setFormState] = useState("Your email here...");

    const handleChange = (e) => {
        setFormState(e.target.value);
    }

    const handleFocus = () => {
        setFormState('');
    }

    return (
        <Container>
            <SubscriptionContainer>
                <Heading>Nihon no Mono News</Heading>
                <Message>Sign-up to receive up-to-date infos from our store</Message>
                <InputContainer>
                    <InputBox
                        type="text"
                        value={formState}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                    <SendButton><i className="fas fa-paper-plane"></i></SendButton>
                </InputContainer>
            </SubscriptionContainer>
        </Container>
    )
}
export default SubscriptionForm