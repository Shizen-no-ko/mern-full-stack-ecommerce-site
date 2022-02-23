import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import { mobile } from '../../responsive';
import { addProduct } from '../../redux/shoppingCartRedux';



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
min-width: 350px;
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

const Button = styled.button`
all: unset;
background-color: ${props => props.look === 'light' ? 'white' : 'red'};
border: 4px solid red;
border-radius: 20px 0;
${'' /* box-sizing: border-box; */}
color: ${props => props.look === 'light' ? 'red' : 'white'};
cursor: pointer;
font-size: 20px;
font-weight: 400;
margin: 30px 20px 10px;
outline: none;
padding: 10px;
text-align: center;




&:hover{
    background-color: ${props => props.look === 'light' ? 'red' : 'white'};
    border: 4px solid red;
    color: ${props => props.look === 'light' ? 'white' : 'red'};
    transform: scale(103%);
}

&:active{
    background-color: green;
    border: 4px solid green;
    color: white; 
    transform: scale(97%);
}

${mobile({
    fontSize: '15px',
    padding:'5px 7px'
    
})};
`


const Modal = ({showModal, getModalClick, modalContent}) => {

const [display, setDisplay] = useState(false);
const [selectedColor, setSelectedColor] = useState('');
const [selectedSize, setSelectedSize] = useState('');

const dispatch = useDispatch();


useEffect(() => {
    setDisplay(showModal);
}, [showModal]);

useEffect(() => {
    setSelectedColor(modalContent.color[0]);
    setSelectedSize(modalContent.size[0]);
}, [modalContent]);

const handleClick = () => {
    getModalClick();   
}

const handleBoxClick = (e) => {
    e.stopPropagation();
}

const handleChange = (e) => {
    e.target.name === 'color' && setSelectedColor(e.target.value);
    e.target.name === 'size' && setSelectedSize(e.target.value);
}

const addToCartClick = (e) => {
    e.preventDefault();
    const amount = 1;
    dispatch(addProduct({ ...modalContent, amount, color: selectedColor, size: selectedSize }));
    // makes modal disappear
    getModalClick();
}

    return (
        <Container style={{display: display ? 'unset': 'none'}} onClick={handleClick}>
            <ProductBox onClick={handleBoxClick}>
                <Title>{modalContent.title}</Title>
                <Image src={modalContent.image}/>
                <Form>
                {modalContent.color.length ? 
                <div>
                <Label>Color</Label>
        <Select name='color' onChange={handleChange}>
            {modalContent.color && modalContent.color.map(color => <Option key={color} value={color}>{color[0].toUpperCase() + color.slice(1)}</Option>)}
        </Select>
                </div>
                :
                null
                }
        {modalContent.size.length ?
            <div>
        <Label>Size</Label>
        <Select name='size' onChange={handleChange}>
            {modalContent.size && modalContent.size.map(size => <Option key={size} value={size}>{size[0].toUpperCase() + size.slice(1)}</Option>)}
        </Select>
        </div> 
        :
        null
        }
        <Title>${modalContent.price}</Title>
        <Button onClick={addToCartClick}>ADD TO CART <i className="fas fa-shopping-cart" style={{ 'paddingLeft': '10px' }}></i></Button>
                </Form>
            </ProductBox>
        </Container>
    )
}

export default Modal