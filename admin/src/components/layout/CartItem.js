import { useState, useEffect } from 'react';

import styled from 'styled-components';

import { userReq } from '../../axiosRequests';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';

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
height: 150px;


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

const CartItem = (props) => {

    const [errorMessage, setErrorMessage] = useState('');

   const { itemData } = props;

    const [ itemState, setItemState ] = useState({
        image: '',
        title: '',
        _id: '',
        size: itemData.size,
        color: itemData.color,
        amount: itemData.amount,
        price: 0,
        itemId: itemData.itemId
    });


    useEffect(() => {
                try {
                    const getProduct = async () => {
                        console.log('PROPS ID IS');
                        console.log(itemData.itemId);
                        const res = await userReq.get(`products/find/${itemData.itemId}`);
                        if (res) {
                            setItemState({...itemState, image: res.data.image, title: res.data.title, price: res.data.price});
                            setErrorMessage('');
                        } else {
                            console.log('no res');
                            setErrorMessage('No Product with this ID');
                        }
                    }
                    getProduct();
                }
                catch (err) { console.log(err) };
            }, []);

            useEffect(()=> {
                console.log('ItemSTATE is: ');
                console.log(itemState);
            }, [itemState]);
    
    const { image, title, size, color, amount, price, itemId } = itemState;


    return (
        <Container>
        <Wrapper>
        <ItemImage src={image}/>
        <ItemDetails>
        <Detail><strong>Product:</strong> {title} </Detail>
        <Detail><strong>ID:</strong> {itemId} </Detail>
        <Detail><strong>Color: </strong>{color.charAt(0).toUpperCase() + color.slice(1)}</Detail> 
        {size ? <Detail><strong>Size:</strong> {size.charAt(0).toUpperCase() + size.slice(1)} </Detail> : null}
        <Detail><strong>Amount Ordered: </strong>{amount}</Detail> 
        <Detail><strong>Price Per Item: </strong>{price}</Detail>
        <Detail><strong>Total For Item: </strong>{price * amount}</Detail>  
        </ItemDetails>
        <PriceAndAmount>
        <PlusMinusContainer>
       </PlusMinusContainer>
        </PriceAndAmount>  
        </Wrapper>
        <Rule/>   
        </Container>
    )
}

export default CartItem
