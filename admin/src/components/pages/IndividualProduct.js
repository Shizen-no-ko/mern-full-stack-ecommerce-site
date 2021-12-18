import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { publicReq } from '../../axiosRequests';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';

import Navbar from '../layout/Navbar';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';

// import { sliderData } from '../../data/data.js';
import { addProduct } from '../../redux/shoppingCartRedux';


const Container = styled.div`
display:flex;
height: auto;
margin: 20px 0;
max-width: 100%;
overflow: hidden;
width: 100vw;

${'' /* ${mobile({
    height: 'auto'
})};


${portraitTablet({
    height: 'auto'
})}; */}

${landscapeTablet({
    height: '300px',
})};  
`

const Wrapper = styled.div`
${'' /* align-items: center; */}
display:flex;
${'' /* transform: translate(${props => props.scrollPos * -100}vw); */}
${'' /* transition: all 1.5s ease; */}
width: 100vw;


`
const Slide = styled.div`
${'' /* align-items: center; */}
display: flex;
height: auto;
justify-content: flex-start;
overflow: hidden;
width: 100vw;

${mobile({
    alignItems: 'center',
    flexDirection: 'column',
})};

${portraitTablet({
    alignItems: 'center',
    flexDirection: 'column',
})};

${landscapeTablet({
    height: '300px',
})};
`

const DetailsContainer = styled.div`
flex: 1;
padding: 20px 80px 20px;

${mobile({
    padding: '15px 40px 15px',
})};

${portraitTablet({
    padding: '15px 40px 15px',
})};

${landscapeTablet({
    padding: '0px 20px 15px',
})};


`

const Details = styled.div`
display: flex;
flex-direction: column;
font-size: 1.5rem;
height: 50%;
justify-content: space-between;
margin-top: 0;

${mobile({
    textAlign: 'center'
})};

${portraitTablet({
    textAlign: 'center'
})};

${landscapeTablet({
    fontSize: '1rem',
    justifyContent: 'space-between'
})};
`
const Title = styled.h1`
font-weight: 400;
margin-top: 0;

${mobile({
    fontSize: '2.5rem',
    marginBottom: '0px'
})};

${portraitTablet({
    fontSize: '3rem',
    margin: '20px auto 10px'
})};

${landscapeTablet({
    fontSize: '2rem',
    margin: '10px 0 10px'
})};
`

const Description = styled.p`
font-weight: 200;

${mobile({
    fontSize: '1rem'
})};

${portraitTablet({
    fontSize: '1.25rem'
})};

${landscapeTablet({
    marginTop: '0'
})};
`

const Price = styled.h4`
font-weight: 200;
font-size: 2rem;

${mobile({
    fontSize: '1.5rem',
    margin: '0px'
})};

${portraitTablet({
    fontSize: '1.75rem',
    margin: '0px'
})};

${landscapeTablet({
    fontSize: '1.5rem',
    margin: '0px'
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
font-size: 17px;
outline: none;
padding: 10px;


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
    fontSize: '18px',
    padding: '5px 10px'
})};

${portraitTablet({
    fontSize: '20px',
    padding: '5px 10px'
})};

${landscapeTablet({
    fontSize: '18px',
    padding: '5px 10px'
})};



`

const ImageContainer = styled.div`
flex: 1;
height: 100%;

${mobile({
    maxHeight: '280px',
    maxWidth: '100vw'
})};

${portraitTablet({
    maxHeight: '350px',
    maxWidth: '100vw'
})};
`

const Img = styled.img`
max-height: 80%;
max-width: 100%;
object-fit: cover;

${mobile({
    marginTop: '20px'
})};

${portraitTablet({
    height: '100%',
    marginTop: '20px',
    maxHeight: '100%',
})};

${landscapeTablet({
    maxHeight: '100%'
})};

`

const SelectorRow = styled.div`
display: flex;
justify-content: space-between;
margin-left: -20px;
padding: 30px 0;

${mobile({
    alignItems: 'center',
    margin: '0px auto'
})};

${portraitTablet({
    alignItems: 'center',
    margin: '0px auto',
    paddingTop: '10px'
})};

${landscapeTablet({
    margin: '0px',
    padding: '0px',
    flexWrap: 'wrap',
})};



`


const SelectorContainer = styled.div`
line-height: 30px;

${mobile({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
})};

${portraitTablet({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
})};
`

const SelectorGroup = styled.div`

`

const Label = styled.span`
${'' /* font-family: font-family: 'Lexend', sans-serif; */}
font-size: 20px;
font-weight: 200;
padding: 10px 0 10px 20px;

${mobile({
    paddingLeft: '0'
})};

${portraitTablet({
    paddingLeft: '0'
})};

${landscapeTablet({
    fontSize: '15px',
    paddingLeft: '0'
})};
`

const Selector = styled.select`
border: 1px solid lightgray;
border-radius: ${props => props.pos === 'left' ? '20px 0 0 20px' : props.pos === 'right' ? '0 20px 20px 0' : '0'} ;
font-size: 20px;
font-weight: 500;
${'' /* margin: 0 0px; */}
outline: none;
padding: 5px 15px;

&:focus {
    outline: none;
}

${landscapeTablet({
    fontSize: '15px',
    marginRight: 'auto'
})};


`

const Option = styled.option`
`

const ColorContainer = styled.div`
display: inline-flex;
justify-content: space-between;
position: relative; 
top: 3px;


`

const ColorOption = styled.div`
border: ${props => props.border ? '1px solid' : 'none'};
border-color: ${props => props.border ? props.border : 'none'};
border-radius: 30%;
background-color: ${props => props.color};
${'' /* to accomodate extra width of white color with border */}
height: ${props => props.border ? '18px' : '20px'};
margin: 5px;
transition: ease-in-out 0.05s;
width: ${props => props.border ? '18px' : '20px'};

&:hover{
   transform: rotate(45deg);
}
`

const PlusMinusContainer = styled.div`
display: flex;
font-size: 28px;
margin-left: 20px;

${mobile({
    alignItems: 'center',
    fontSize: '18px',
    margin: '0 20px 0 -20px'
})};

${portraitTablet({
    alignItems: 'center',
    fontSize: '22px',
    margin: '0 20px 0 -20px'
})};

${landscapeTablet({
    alignItems: 'center',
    fontSize: '22px',
    marginLeft: '0'
})};

`

const PlusMinusStyles = styled.div`
color: rgba(255, 0, 0, 0.6);
margin: 5px;

&:active {
    color: red;
}
`

const AmountDisplay = styled.div`
border: 4px solid rgba(255, 0, 0, 0.6);
border-radius: 15px;
color: rgba(0, 0, 0, 0.8);
height: 35px;
text-align: center;
transition: all ease-in-out 0.5s;
width: 35px;

${mobile({
    borderRadius: '10px',
    height: '25px',
    width: '25px'
})};

${portraitTablet({
    borderRadius: '12px',
    height: '30px',
    width: '30px'
})};

${landscapeTablet({
    borderRadius: '12px',
    height: '30px',
    width: '30px'
})};
`

const ErrorMessage = styled.span`
color: red;
font-weight: bold;
font-size: 1.5rem;
margin: 10px;
text-align: center;
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

// const Label = styled.label`
// font-size: 20px;
// margin: 10px;
// `

// const product = sliderData[0];



const IndividualProduct = () => {

    const path = useLocation().pathname.split('/');
    // console.log(path);
    const id = path[path.length -1];
    // console.log(id);
   
   
    const [displayProduct, setDisplayProduct] = useState({ title: '', image: '', price: '', description: '', color: null, size: null });
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        price: '',
        description:'',
        color: [],
        size: []
    });
    const [amount, setAmount] = useState(1);
    const [selectedColor, setSelectedColor] = useState();
    const [selectedSize, setSelectedSize] = useState();
    const boxRef = useRef(null);
    const dispatch = useDispatch();

    // const { title, image, price, description, color, size } = displayProduct;
    const { title, image, price, description, color, size } = formData;

    const boxAnimation = (minus) => {
        boxRef.current.style.borderColor = 'red';
        boxRef.current.style.transform = minus ? 'scale(120%) rotate(-25deg)' : 'scale(120%) rotate(25deg)';
        boxRef.current.style.color = 'white';
        boxRef.current.style.backgroundColor = 'red';
        setTimeout(() => {
            boxRef.current.style.borderColor = 'rgba(255, 0, 0, 0.6)';
            boxRef.current.style.transform = 'scale(100%) rotate(0deg)';
            boxRef.current.style.color = 'rgba(0, 0, 0, 0.8)';
            boxRef.current.style.backgroundColor = 'white';
        }, 250)
    };

    const handleMinus = () => {
        if (amount > 0) { setAmount(amount - 1) };
        boxAnimation(true)
    }

    const handlePlus = () => {
        setAmount(amount + 1);
        boxAnimation(false);
    }

    const sizeChange = (e) => {
        setSelectedSize(e.target.value);
    }

    const colorClick = (e) => {
        setSelectedColor(e.target.getAttribute('color'))
    }

    useEffect(() => {
        let isMounted = true;
        try {
            const getProduct = async () => {
                const res = await publicReq.get(`products/find/${id}`);
                // setDisplayProduct(res.data);
                // setSelectedColor(res.data.color[0]);
                setFormData(res.data);
            }
            getProduct()
        }
        catch (err) { console.log(err) }
        return () => { isMounted = false };
    }, [id])

    const handleClick = () => {
        dispatch(addProduct({ ...displayProduct, amount, color: selectedColor, size: selectedSize }));
    }

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

const onSubmit = (e) => {
    e.preventDefault();
  
};

    return (
        <div>
            <Navbar />
            <Container>
                {/* <Wrapper scrollPos={scrollPos} key={i}> */}
                <Wrapper>
                    <Slide >
                        <ImageContainer>
                            <Img src={image} />
                        </ImageContainer>
                        <DetailsContainer>
                            <Details>
                            <Form onSubmit={e => onSubmit(e)}>
                            <Label>Title</Label>
                    <Input onChange={e => onChange(e)} required name='title' type='text' value={title}></Input>
                    <Label>Image Url</Label>
                        <Input onChange={e => onChange(e)} required name='image' type='text' value={image}></Input>
                        <Label>Price</Label>
                        <Input onChange={e => onChange(e)}  name='price' type='number' value={price} ></Input>
                        <Label>Description</Label>
                        <Input onChange={e => onChange(e)}  name='description' type='text' value={description} ></Input>
                        <Label>Colors</Label>
                        <Input onChange={e => onChange(e)}  name='color' type='text' value={color} ></Input>
                        <Label>Sizes</Label>
                        <Input onChange={e => onChange(e)}  name='size' type='text' value={sizeChange} ></Input>

                    </Form>
                                <SelectorRow>
                                  
                                    <Button onClick={handleClick}><i class="fas fa-edit"></i> UPDATE PRODUCT</Button>
                                    <Button onClick={handleClick}><i class="fas fa-trash-alt"></i> DELETE PRODUCT</Button>
                                </SelectorRow>
                            </Details>
                        </DetailsContainer>
                    </Slide>
                </Wrapper>
            </Container>

            <SubscriptionForm />
            <Footer />
        </div>

    )
}

export default IndividualProduct