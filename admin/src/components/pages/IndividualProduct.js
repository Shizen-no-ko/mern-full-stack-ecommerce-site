import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { publicReq, userReq } from '../../axiosRequests';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';

import Navbar from '../layout/Navbar';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';

// import { sliderData } from '../../data/data.js';
// import { addProduct } from '../../redux/shoppingCartRedux';


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
    height: 'auto',
    overflow: 'visible'
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
    height: 'auto',
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
// const Title = styled.h1`
// font-weight: 400;
// margin-top: 0;

// ${mobile({
//     fontSize: '2.5rem',
//     marginBottom: '0px'
// })};

// ${portraitTablet({
//     fontSize: '3rem',
//     margin: '20px auto 10px'
// })};

// ${landscapeTablet({
//     fontSize: '2rem',
//     margin: '10px 0 10px'
// })};
// `

// const Description = styled.p`
// font-weight: 200;

// ${mobile({
//     fontSize: '1rem'
// })};

// ${portraitTablet({
//     fontSize: '1.25rem'
// })};

// ${landscapeTablet({
//     marginTop: '0'
// })};
// `

// const Price = styled.h4`
// font-weight: 200;
// font-size: 2rem;

// ${mobile({
//     fontSize: '1.5rem',
//     margin: '0px'
// })};

// ${portraitTablet({
//     fontSize: '1.75rem',
//     margin: '0px'
// })};

// ${landscapeTablet({
//     fontSize: '1.5rem',
//     margin: '0px'
// })};
// `
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
margin-top: 40px;
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


// const SelectorContainer = styled.div`
// line-height: 30px;

// ${mobile({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
// })};

// ${portraitTablet({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
// })};
// `

// const SelectorGroup = styled.div`

// `

const Label = styled.span`
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


const ErrorMessage = styled.span`
background-color: red;
color: white;
font-weight: bold;
font-size: 1.5rem;
margin: 10px;
padding: 5px;
text-align: center;
`

const Form = styled.form`
display: flex;
flex-direction: column;
padding: 0px 15px;
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

const CheckBox = styled.input`
margin: 0 0 0 10px;
transform: scale(1.5);
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


const IndividualProduct = () => {
    const history = useHistory();
    console.log(history);
    const path = useLocation().pathname.split('/');
    const id = path[path.length -1];
   
  
   
    const [formData, setFormData] = useState({
        _id: '',
        title: '',
        description:'',
        image: '',
        category: [],
        size: [],
        color: [],
        price: '',
        inStock: false
       
        
    });

    // const dispatch = useDispatch();

    const { _id, title, description, image, category, size, color, price, inStock } = formData;

    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        let isMounted = true;
        try {
            const getProduct = async () => {
                const res = await publicReq.get(`products/find/${id}`);
                // setDisplayProduct(res.data);
                // setSelectedColor(res.data.color[0]);
                if(res){  
                    setFormData(res.data);
                    setErrorMessage('');
                } else {
                    setErrorMessage('No Document with this ID');
                }
              
                
            }
            getProduct()
        }
        catch (err) { console.log(err) }
        return () => { isMounted = false };
    }, [id])

    const handleUpdate = async () => {
        // set token for headers here as in axiosRequests it seems to be set at startup and doesn't update
        const CURRENT_USER = localStorage.length > 0 ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser : null;
        const TOKEN =  CURRENT_USER ? CURRENT_USER.token : null;
            try {
                const headers = {
                    token: localStorage.length > 0 ? `Bearer ${TOKEN}` : null
                 }
                 // if these fields have been altered - set to lowercase, split and trim, ready for putting to DB, otherwise leave as is
                 const tidyData = {...formData, 
                    color: typeof color === 'string' ? color.toLowerCase().split(',').map(item => item.trim()): color,
                    size: typeof size === 'string' ? size.toLowerCase().split(',').map(item => item.trim()): size,
                    category: typeof category === 'string' ? category.toLowerCase().split(',').map(item => item.trim()): category
                }
                const res = await userReq.put(`products/${id}`, tidyData, { headers: headers} );
                // update form - force re-render with tidied updates
                setFormData(tidyData);
                console.log(`response is ${res.data}`);
        }
        catch (err) { 
            setErrorMessage(err.response.data.errors[0].msg)
            // console.log(err.response.data.errors[0].msg) 
        }  
    };

    const handleDelete = async () => {
         // set token for headers here as in axiosRequests it seems to be set at startup and doesn't update
         const CURRENT_USER = localStorage.length > 0 ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser : null;
         const TOKEN =  CURRENT_USER ? CURRENT_USER.token : null;
         try {
            const headers = {
                token: localStorage.length > 0 ? `Bearer ${TOKEN}` : null
             }
            const res = await userReq.delete(`products/${id}`,{ headers: headers} );
            console.log(`response is ${res.data}`);
            setErrorMessage('Product has been moved to deleted products collection');
            // replace history so that user can't back arrow to products page with deleted id
            history.replace('/');
            
    }
    catch (err) { 
        setErrorMessage(err.response.data.errors[0].msg)
        // console.log(err.response.data.errors[0].msg) 
    }
       
    }

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    const setStock = (value) => setFormData({...formData, inStock: value });

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
                            <Title>Edit Product</Title>
                            <Form onSubmit={e => onSubmit(e)}>
                            <Label>Title</Label>
                    <Input onChange={e => onChange(e)} required name='title' type='text' value={title}></Input>
                    <Label>Product Id: <strong>{_id}</strong></Label>
                    <Label>Image Url</Label>
                        <Input onChange={e => onChange(e)} required name='image' type='text' value={image}></Input>
                        <Label>Price</Label>
                        <Input onChange={e => onChange(e)} required name='price' type='number' value={price} ></Input>
                        <Label>Description</Label>
                        <Input onChange={e => onChange(e)} required name='description' type='text' value={description} ></Input>
                        <Label>Categories (Separated by commas)</Label>
                        <Input onChange={e => onChange(e)} required name='category' type='text' value={category} ></Input>
                        <Label>Colors (Separated by commas)</Label>
                        <Input onChange={e => onChange(e)}  name='color' type='text' value={color} ></Input>
                        <Label>Sizes (Separated by commas)</Label>
                        <Input onChange={e => onChange(e)}  name='size' type='text' value={size} ></Input>
                        <Label>In Stock                         <CheckBox type='checkBox' label="In Stock" checked={inStock} value={inStock} onChange={() => setStock(!inStock)}  /></Label>
                        {/* onClick={() => setStock(!inStock)} */}
                    </Form>
                   {errorMessage !== '' ? <ErrorMessage>{errorMessage}</ErrorMessage>: null} 
                                <SelectorRow>
                                  
                                    <Button onClick={handleUpdate}><i className="fas fa-edit"></i> UPDATE PRODUCT</Button>
                                    <Button onClick={handleDelete}><i className="fas fa-trash-alt"></i> DELETE PRODUCT</Button>
                                </SelectorRow>
                             
                            </Details>
                        </DetailsContainer>
                    </Slide>
                </Wrapper>
            </Container>

            {/* <SubscriptionForm /> */}
            <Footer />
        </div>

    )
}

export default IndividualProduct