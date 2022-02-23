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
height: auto;
left: 50%;
margin-left: -150px;
margin-top: -175px;
position: absolute;
text-align: center;
top: 50%;
width: auto;
z-index: 40;
`

const Form = styled.form`
margin: 10px 10px 20px;
`

const Title = styled.h2`
color: red;
margin: 20px;
`

const Image = styled.img`
margin: 10px;
max-height: 200px;
max-width: 200px;
`

const Select = styled.select`
border: 2px solid red;
font-size: 20px;
margin: 10px;
padding: 5px;
`

const Label = styled.label`
font-size: 20px;
font-weight: bold;
`

const Option = styled.option`

`

const Modal = ({showModal, getModalClick, modalContent}) => {

const [display, setDisplay] = useState(false);
console.log('modal content size is');
console.log(modalContent.size);


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
            <ProductBox onClick={handleBoxClick}>
                <Title>{modalContent.title}</Title>
                <Image src={modalContent.image}/>
                <Form>
                {modalContent !=={} && modalContent.color.length ? 
                <div>
                <Label>Color</Label>
        <Select>
            {modalContent.color && modalContent.color.map(color => <Option key={color} value={color}>{color[0].toUpperCase() + color.slice(1)}</Option>)}
        </Select>
                </div>
                :
                null
                }
        {modalContent !=={} && modalContent.size.length ?
            <div>
        <Label>Size</Label>
        <Select>
            {modalContent.size && modalContent.size.map(size => <Option key={size} value={size}>{size[0].toUpperCase() + size.slice(1)}</Option>)}
        </Select>
        </div> 
        :
        null
        }
        
        
        
                </Form>
            </ProductBox>
        </Container>
    )
}

export default Modal