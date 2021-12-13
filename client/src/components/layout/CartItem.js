import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';
import { decreaseItemAmount, increaseItemAmount, deleteItem } from '../../redux/shoppingCartRedux';

const Container = styled.div`

`

const Wrapper = styled.div`
display: flex;
width: 100%;

${mobile({
    alignItems: 'center',
    flexDirection: 'column'
})};

${portraitTablet({
    alignItems: 'center',
    flexWrap: 'wrap'
})};

${landscapeTablet({
    alignItems: 'center',
    flexWrap: 'wrap'
})};
`

const ItemImage = styled.img`
border-radius: 20px 0;
margin: 20px;
width: 250px;

${mobile({
    
    height: 'auto',
    margin: '20px 0 0 0',
    maxWidth: '150px'
})};

${portraitTablet({
    
    height: 'auto',
    margin: '20px 0 0 40px',
    maxWidth: '200px'
})};

${landscapeTablet({
    height: '150px',
    margin: '20px 0 0 40px',
    maxWidth: '200px',
    width: 'auto'
})};
`

const ItemDetails = styled.div`
flex: 2;
margin: 30px 20px 10px;
text-align: left;

${mobile({
    margin: '10px 10px 5px',
    textAlign: 'center',
    width: '80%'
})};

${portraitTablet({
    margin: '10px 10px 5px 30px',
    width: '80%'
})};

${landscapeTablet({
    margin: '50px 10px 0px 30px',
    width: '80%'
})};
`

const Rule = styled.div`

border-top: 1px solid rgba(255, 0, 0, 0.5);
margin: 0 auto;
width: 95%;
`

const PriceAndAmount = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;

${mobile({
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '20px',
    width: '80%'
})};

${portraitTablet({
    alignItems: 'center',
    flexDirection: 'row',
    margin: '10px 40px 10px 40px',
    width: '90%'
})};

${landscapeTablet({
    alignItems: 'center',
    flexDirection: 'row',
    margin: '-20px 40px 10px',
    width: '90%'
})};
`
const Detail = styled.h3`
margin: 0 0 20px 0;
font-weight: 400;

${mobile({
    margin: '5px 0'
})};

${portraitTablet({
    margin: '10px 0'
})};
`
const Color = styled.div`
border-radius: 25%;
background-color: ${props => props.color};
height: 25px;
margin: 0 0 20px 0;
width: 25px;

${mobile({
    height: '15px',
    margin: '5px auto',
    width: '15px'
})};

${portraitTablet({
    height: '20px',
    margin: '10px 0',
    width: '20px'
})};
`
const PlusMinusContainer = styled.div`
align-items: center;
display: flex;
font-size: 30px;
margin: 30px 40px 0;

${mobile({
    fontSize: '20px',
    margin: '0'
})};

${portraitTablet({
    fontSize: '25px',
    margin: '10px 0 0 0'
})};

${landscapeTablet({
    fontSize: '25px',
    margin: '10px 0 0 0'
})};
`

const PlusMinusStyles = styled.div`
color: rgba(255, 0, 0, 0.6);
font-size: 30px;
margin: 5px;

&:active {
    color: red;
}
`

const AmountDisplay = styled.div`
border: 4px solid rgba(255, 0, 0, 0.6);
border-radius: 15px;
color: rgba(0, 0, 0, 0.8);
font-size: 25px;
height: 35px;
text-align: center;
transition: all ease-in-out 0.5s;
width: 35px;

${mobile({
    borderRadius: '10px', 
    fontSize: '20px',
    height: '25px',
    width: '25px'
})};

${portraitTablet({
    borderRadius: '12px', 
    fontSize: '23px',
    height: '30px',
    width: '30px'
})};

${landscapeTablet({
    borderRadius: '12px', 
    fontSize: '23px',
    height: '30px',
    width: '30px'
})};
`
const Price = styled.div`
color: rgba(0 , 0, 0, 0.7);
font-size: 3rem;
font-weight: 200;
margin: 0 30px 20px;

transition: all ease 0.5s;

${mobile({
    fontSize: '2rem',
    margin: '0'
})};

${portraitTablet({
    fontSize: '2.25rem',
    margin: '0'
})};

${landscapeTablet({
    fontSize: '2.25rem',
    margin: '0'
})};
`

const CartItem = (props) => {

    // const [amount, setAmount] = useState(props.amount);
    const boxRef = useRef(null);
    const priceRef = useRef(null);
    const dispatch = useDispatch();

    // const itemAmount = useSelector(state=>state.cart.products[props.index].amount);


    const { image, title, _id, size, color, amount, price } = useSelector(state=>state.cart.products[props.index]);


    const boxAnimation = (minus) => {
        boxRef.current.style.borderColor = 'red';
        boxRef.current.style.transform = minus ? 'scale(120%) rotate(-25deg)' : 'scale(120%) rotate(25deg)' ;
        boxRef.current.style.color = 'white';
        boxRef.current.style.backgroundColor = 'red';
        priceChange();
        setTimeout(() => {
            boxRef.current.style.borderColor = 'rgba(255, 0, 0, 0.6)';
            boxRef.current.style.transform = 'scale(100%) rotate(0deg)';
            boxRef.current.style.color = 'rgba(0, 0, 0, 0.8)';
            boxRef.current.style.backgroundColor = 'white';
    }, 250)
    };
    
    const handleMinus = () => {
        // dispatch(decreaseItemAmount({id: props.productId}));
        dispatch(decreaseItemAmount({id: _id}));
        // if(amount > 0){setAmount(amount - 1)};
        boxAnimation(true)
    };
    
    const handlePlus = () => {
        // dispatch(increaseItemAmount({id: props.productId}));
        dispatch(increaseItemAmount({id: _id}));
        // setAmount(amount + 1);
        boxAnimation(false);
    };

    const handleDelete = () => {
        dispatch(deleteItem({id: _id}));
    }

  
    
    const priceChange = () => {
        priceRef.current.style.transform = 'scale(115%)';
        priceRef.current.style.color = 'red';
        setTimeout(() => {
            priceRef.current.style.transform = 'scale(100%)';
            priceRef.current.style.color = 'rgba(0 , 0, 0, 0.7)';
        }, 500);
    }

    return (
        <Container>
        <Wrapper>
        <ItemImage src={image}/>
        <ItemDetails>
        {/* <Detail><strong>Product:</strong> {props.productName} </Detail> */}
        <Detail><strong>Product:</strong> {title} </Detail>
        {/* <Detail><strong>ID:</strong> {props.productId} </Detail> */}
        <Detail><strong>ID:</strong> {_id} </Detail>
        {/* <Color color={props.color}/> */}
        <Color color={color} style={{'border': color === 'white' ? '3px solid black': 'none' }}/>
        {/* {props.size ? <Detail><strong>Size:</strong> {props.size} </Detail> : null} */}
        {size ? <Detail><strong>Size:</strong> {size} </Detail> : null}
        </ItemDetails>
        <PriceAndAmount>
        <PlusMinusContainer>
        {amount > 1 ? 
        <PlusMinusStyles onClick={handleMinus}><i className="fas fa-minus"></i></PlusMinusStyles> :
        <PlusMinusStyles onClick={handleDelete}><i class="fas fa-trash-alt"></i></PlusMinusStyles>
        }
           <AmountDisplay ref={boxRef}>{amount}</AmountDisplay>
           <PlusMinusStyles onClick={handlePlus}><i className="fas fa-plus"></i></PlusMinusStyles>
       </PlusMinusContainer>
       
       {/* <Price ref={priceRef}>${itemAmount * props.price}</Price> */}
       <Price ref={priceRef}>${amount * price}</Price>
        </PriceAndAmount>
        
        </Wrapper>
        <Rule/>   
        </Container>
    )
}

export default CartItem
