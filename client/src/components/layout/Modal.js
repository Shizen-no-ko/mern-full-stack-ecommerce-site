import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';


const Container = styled.div`
background-color: rgba(0, 0, 0, 0.75);
height: 100vh;
left: 0;
position: fixed;
top: 0;
width: 100vw;
z-index: 30;
`

const ProductBox = styled.div`
background-color: white;
border: 5px solid red;
border-radius: 10% 0 10% 0;
height: 350px;
left: 50%;
margin-left: -150px;
margin-top: -175px;
position: absolute;
top: 50%;
width: 300px;
z-index: 40;
`

const Modal = ({showModal, getModalClick}) => {
console.log('SHOW MODAL IS');
console.log(showModal);
const [display, setDisplay] = useState(false);
console.log('DISPLAY IS');
console.log(display);
useEffect(() => {
    setDisplay(showModal);
}, [showModal]);

const handleClick = () => {
    getModalClick();   
}

const handleBoxClick = (e) => {
    e.stopPropagation();
}

    return (
        <Container style={{display: display ? 'unset': 'none'}} onClick={handleClick}>
            <ProductBox onClick={handleBoxClick}/>
        </Container>
    )
}

export default Modal