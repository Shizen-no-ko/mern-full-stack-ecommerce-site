import { Link, useHistory } from 'react-router-dom';

import styled from 'styled-components';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';
import { userReq } from '../../axiosRequests';

const Container = styled.div`

${'' /* flex: 1; */}
flex-basis: 24%;
margin: 5px;
position: relative;

${mobile({
    flexBasis: '55%',
})};

        ${portraitTablet({
    flexBasis: '33%',
})};
`

const Img = styled.img`
border-radius: 0 50px 0 0;
object-fit: cover;
width: 100%;
`
const IconContainer = styled.div`
height: 100%;
left: 0;
width: 100%;
opacity: 0;
position: absolute;
top: 0;
transition: ease 0.5s;

&:hover {
    opacity: 100%;
}

`


const Icon = styled.div`
background-color: rgba(0, 0, 0, 0.5);
cursor: pointer;
border: none;
bottom: 4px;
color: white;
font-size: 20px;
padding: 3px;
position:absolute;
right: 0px;
text-align: center;
width: 200px;

&:hover{
    background-color: white;
    color: red;
    opacity: 100%;
}

&:active{
    border-radius: ${props => props.topbottom === 'top' ? '0 0 10px 0' : props.leftright === 'right' ? '10px 0 0 0' : '60px'};
    opacity: ${props => props.topbottom === 'bottom' && props.leftright === 'left' ? '0%' : '100%'};
    transform: ${props => props.topbottom === 'bottom' && props.leftright === 'left' ? 'translate(1000%, -750%) scale(0%)' : 'scale(120%)'};
    transition: ${props => props.topbottom === 'bottom' && props.leftright === 'left' ? 'linear 0.5s' : ''};
}

${mobile({
    fontSize: '15px',
    height: '18px',
    width: '20px'
})};

${portraitTablet({
    fontSize: '20px',
    height: '22px',
    width: '25px'
})};

${landscapeTablet({
    fontSize: '20px',
    height: '22px',
    width: '25px'
})};
`




const ProductElement = ({ element, deleted }) => {
    const history = useHistory();

    const handleClick = async (id) => {

        // set token for headers here as in axiosRequests it seems to be set at startup and doesn't update
        const CURRENT_USER = localStorage.length > 0 ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser : null;
        const TOKEN = CURRENT_USER ? CURRENT_USER.token : null;
        try {
            const headers = {
                token: localStorage.length > 0 ? `Bearer ${TOKEN}` : null
            }
            const res = await userReq.post(`products/reinstate/${id}`, {}, { headers: headers });
            //to activate link
            // return true;
            history.replace('/');

        }
        catch (err) {
            console.log(err.response.data.errors[0].msg);
        }
    }

    return (
        <Container>
            <Img src={element.image} />
            <IconContainer>
                {/* // FIGURE OUT HOW TO FORCE REFRESH AFTER LINK */}
                {/* <Link onClick={() => handleClick(element._id)}  to={'/'} ><Icon topbottom={'bottom'} leftright={'right'}>REINSTATE PRODUCT</Icon></Link>  */}

                {deleted ?
                    <Icon onClick={() => handleClick(element._id)} topbottom={'bottom'} leftright={'right'}>REINSTATE PRODUCT</Icon>
                    :
                    <Link to={`../product/${element._id}`}><Icon topbottom={'bottom'} leftright={'right'}>EDIT PRODUCT</Icon></Link>
                }
            </IconContainer>
        </Container>
    )
}

export default ProductElement